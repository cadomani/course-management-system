import csv from 'csv-parse';
import fs from 'fs';

function load_csv(): object {
  const results: any[] = [];
  fs.createReadStream('/server/school/cms/backend/src/core/db/masterlist_fall_v1.1.csv')
    .pipe(csv({
      quote: '`',
      delimiter: '|',
      columns: true
    }))
    .on('data', (data: any) => results.push(data))
    .on('end', () => {
      console.log(results);
    })
  return results;
}

export default load_csv;
