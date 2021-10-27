import { PrismaClient } from "@prisma/client";
import csv from 'csv-parse';
import fs from 'fs';
import { ml } from '../src/core/db/masterlist';
const prisma = new PrismaClient();

// function load_csv(): object[] {
//   let results: any[] = [];
//   fs.createReadStream('/server/school/cms/backend/src/core/db/masterlist_fall_v1.1.csv')
//     .pipe(csv({
//       quote: '`',
//       delimiter: '|',
//       columns: true
//     }))
//     .on('data', (data: any) => results.push(data))
//     .on('end', () => {
//       // console.log(results);
//       // return results;
//     })
//   console.log(results);
//   return results;
// }

// console.log(load_csv());
// let masterlist: any = load_csv();
// console.log(masterlist);
// let collegesData : object[] = [];
// masterlist.forEach((element: any) => {
//   if (!collegesData.includes(element['name'])) {
//     collegesData.push(element['name']);
//   }
//   console.log('a');
// });
// console.log(collegesData);
// Array.from({length: 7726}).ml.forEach(element => {
  
// });

// let collegesData = [];
// ml.forEach((element: any) => {
//   if (!collegesData.includes(element['name'])) {
//     collegesData.push(element['name']);
//   }
// });
// console.log(collegesData);
// await prisma.college.create({
//   data: {
//     name: row['name']
//   }
// })

async function main() {
  // let filteredView: Set({ [key: string]: string }) = [{}];
  // let filteredView = new Set();
  // for (let row of ml) {
  //   if (!filteredView.has({ name: row['college'] })) {
  //     filteredView.add({
  //       name: row['college'],
  //     })
  //   }
  // }
  // console.log(filteredView)

  await prisma.college.createMany({
    data: ml,
    skipDuplicates: true,
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
