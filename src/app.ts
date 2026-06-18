import { prisma } from './lib/prisma.js';
import { AppRoutes } from './presentation/routes.js';
import { Server } from './presentation/server.js';

async function main() {
    await prisma.$connect();
    console.log('PostgreSQL conectado ');

    const server = new Server({
        port: 3000,
        routes: AppRoutes.routes,
    });

    server.start();

}

main();