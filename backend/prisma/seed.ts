import { PrismaClient, Prisma } from "@prisma/client";
import fs from 'fs';
import parse from 'csv-parse';
import * as _ from 'lodash';
import { DateTime } from "luxon";

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})


const processFile = async () => {
  // name|course_id|credit_hours|crn|college|major|levels|reg_start|reg_end|term|year|campus|section|course_type|time|days|where|course_start|course_end|sched_type|instructors|instr_email|info_url|options
  var records = []
  const parser = fs
    .createReadStream(`/server/school/cms/backend/src/core/db/masterlist_fall_v1.1.csv`)
    .pipe(parse({
      quote: '`',
      delimiter: '|',
      columns: true
    }));
  for await (const record of parser) {
    // Work with each record
    records.push(record)
  }
  return records
}


async function main() {
  const records = await processFile();
  let collegeFilteredView: any[] = [];
  let courseFilteredView: any[] = [];
  let profileInstructorDepartmentFV: any[] = [];
  for (let row of records) {
    if (row['college'] === '') {
      console.log(row);
    }
    collegeFilteredView.push({
      college: row['college'],
      major: row['major'],
    })
    courseFilteredView.push({
      college: row['college'],
      major: row['major'],
      course: row['name'],
      credit_hours: Number.parseInt(row['credit_hours']),
      reg_start: DateTime.fromFormat(row['reg_start'], "LLL dd, yyyy").toJSDate(),
      reg_end: DateTime.fromFormat(row['reg_end'], "LLL dd, yyyy").toJSDate(),
      year: Number.parseInt(row['year']),
      term: (row['term']).toString().toLowerCase()
    })
    if (row['instructors'] !== 'TBA' && row['instr_email'] !== '') {
      profileInstructorDepartmentFV.push({
        name: row['instructors'],
        email: row['instr_email'],
        college: row['college']
      })
    }
  }

  // Load colleges and majors
  let colleges = _.compact(_.uniqWith(collegeFilteredView, _.isEqual));
  for (let c of colleges) {
    await prisma.major.create({
      data: {
        name: c['major'],
        college: {
          connectOrCreate: {
            where: {
              name: c['college']
            },
            create: {
              name: c['college']
            }
          }
        }
      }
    })
  }

  // Load courses and majors
  let courses = _.compact(_.uniqWith(courseFilteredView, _.isEqual));
  for (let c of courses) {
    let college = await prisma.college.findUnique({ where: { name: c['college'] }, select: {id: true} });
    if (college === null) {
      continue;
    }
    await prisma.course.create({
      data: {
        name: c['course'],
        credit_hours: c['credit_hours'],
        major: {
          connect: {
            uniqueMajor: {
              name: c['major'],
              college_id: college.id
            }
          }
        },
        availability: {
          create: {
            term: c['term'],
            academic_year: c['year'],
            registration_start: c['reg_start'],
            registration_end: c['reg_end'],
          }
        }
      }
    })
  }

  // Load profiles, instructors, and departments
  let instructors = _.compact(_.uniqWith(profileInstructorDepartmentFV, _.isEqual));
  for (let c of instructors) {
    let college = await prisma.college.findUnique({ where: { name: c['college'] }, select: { id: true } });
    if (college === null) {
      continue;
    }

    await prisma.instructor.create({
      data: {
        department: {
          create: {
            college_id: college.id
          }
        },
        profile: {
          connectOrCreate: {
            where: {
              email: c['email']
            },
            create: {
              name: c['name'],
              email: c['email'],
              university: 'Auburn University'
            }
          }
        }
      }
    })
  }


}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
