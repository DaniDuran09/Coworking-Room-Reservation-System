import { prisma } from './lib/prisma.js';

async function main() {
    await prisma.$connect();
    console.log('PostgreSQL conectado ✅');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });