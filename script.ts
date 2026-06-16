import { prisma } from "./lib/prisma.js";

async function main() {

    console.log(process.env.POSTGRES_URL);
    const user = await prisma.user.create({
        data: {
            email: "esteban@prisma.io",
            name: "Alice",
            password: '123456',
            role: 'ADMIN',
        },
    });
    console.log("Created user:", user);
    const allUsers = await prisma.user.findMany({

    });
    console.log("All users:", JSON.stringify(allUsers, null, 2));
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