import prisma from '@shared/Database';
import logger from '@shared/Logger';

// Probe database for activity/content
(() => {
  async function main() {
    const allUsers = await prisma.college.findMany()
    // if (Object.values(allUsers).length == 0) {
    //   logger.err('Database has not been seeded yet. CRUD functionality will be unavailable.');
    // }
  }

  main()
    .catch((e) => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
})();
