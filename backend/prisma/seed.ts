import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import fs from 'fs';
import parse from 'csv-parse';
import * as _ from 'lodash';
import { DateTime } from "luxon";

const prisma = new PrismaClient({
  log: ['info', 'warn', 'error'],
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
  let buildingFilteredView: any[] = [];
  for (let row of records) {
    if (row['college'] === '') {
      console.log(row);
    }
    collegeFilteredView.push({
      college: row['college'],
      major: row['major'],
    })

    // Process building first
    let buildingRoom = row['where'];
    if (buildingRoom !== 'TBA' && buildingRoom !== '') {
      let building = buildingRoom.split(" ");
      let room = Number.parseInt(building.pop());
      building = building.join(" ");

      buildingFilteredView.push({
        college: row['college'],
        building: building
      })
    }

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
  console.log('Loading colleges and majors...')
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
              name: c['college'],
            }
          }
        }
      }
    })
  }

  // Load buildings
  console.log('Loading buildings...')
  let buildings = _.compact(_.uniqWith(buildingFilteredView, _.isEqual));
  for (let c of buildings) {
    let college = await prisma.college.findUnique({ where: { name: c['college'] }, select: { id: true } });
    if (college === null) {
      continue;
    }

    try {
      await prisma.building.create({
        data: {
          name: c['building'],
          college_id: college.id
        }
      })
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          console.log('Failed on unique constraint with ' + c['building']);
        }
      }
    }

  }

  // Load courses, majors, and availability
  console.log('Loading courses, majors, and availability...');
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
  console.log('Loading profiles, instructors, and departments...')
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

  // Write sections (all records)
  console.log('Loading sections...')
  for (let c of records) {
    let coll = await prisma.college.findUnique({ where: { name: c['college'] } });
    if (coll === null) {
      continue;
    }
    let maj = await prisma.major.findUnique({
      where: {
        uniqueMajor: {
          name: c['major'], college_id: coll.id
        }
      }
    });
    if (maj === null) {
      continue;
    }
    let inst = await prisma.instructor.findFirst({
      where: {
        profile: {
          name: c['instructors'],
          email: c['instr_email'],
        }
      },
    });
    if (inst === null) {
      continue;
    }
    let crse = await prisma.course.findFirst({
      where: {
        major_id: maj.id,
        name: c['name'],
        credit_hours: c['cred'],
      },
      select: {
        availability: true,
      }
    });
    if (crse === null) {
      continue;
    }
    let online = false;
    if ((c['options'] as string).includes('Asynchronous') || (c['options'] as string).includes('Synchronous')) {
      online = true;
    }

    let builf = undefined;
    let room = undefined;
    if (c['where'] !== 'TBA' && c['where'] !== '') {
      let building = c['where'].split(" ");
      room = building.pop();
      if (room === '') {
        room = undefined;
      } else if (room === 'Pool' || room === 'Center' || room === 'campus)') {
        building.push(room)
        room = undefined;
      } else {
        room = (room as string).toUpperCase();
      }
      builf = building.join(" ");
    }
    let buil = await prisma.building.findFirst({
      where: {
        college_id: coll.id,
        name: builf
      }
    })
    if (buil === null) {
      continue;
    }

    await prisma.section.create({
      data: {
        instructor_id: inst.id,
        availability_id: crse.availability[0].id,
        building_id: buil.id,
        course_tag: c['course_id'],
        section_crn: Number.parseInt(c['crn']),
        room_num: room,
        schedule: (c['days'] as string).trim(),
        section_start: DateTime.fromFormat(c['course_start'], "LLL dd, yyyy").toJSDate(),
        section_end: DateTime.fromFormat(c['course_end'], "LLL dd, yyyy").toJSDate(),
        online: online,
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
