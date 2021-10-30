import { PrismaClient, Prisma } from "@prisma/client";
import fs from 'fs';
import parse from 'csv-parse';
import * as _ from 'lodash';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})


const processFile = async () => {
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
      credit_hours: Number.parseInt(row['credit_hours'])
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
