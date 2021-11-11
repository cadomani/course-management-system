import prisma from '@shared/Database';
import logger from '@shared/Logger';
import { exit } from 'process';

// Probe database for activity/content
(() => {
  async function main() {
    const allUsers = await prisma.college.findMany()
    if (Object.values(allUsers).length == 0) {
      logger.err('FATAL: Database has not been seeded yet.');
      exit(-1);
    }
  }

  main()
    .catch((e) => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
})();
