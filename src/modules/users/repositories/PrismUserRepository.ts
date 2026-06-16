
import { prisma } from "../../../../lib/prisma.js";
import { UserRepository } from "./UserRepository.js";

export class PrismaUserRepository extends UserRepository {

    async create(data: unknown): Promise<unknown> {
        throw new Error("Method not implemented.");
    }

    async findById(id: number): Promise<unknown> {
        throw new Error("Method not implemented.");
    }

    async findByEmail(email: string): Promise<unknown> {
        return prisma.user.findUnique({
            where: {
                email
            }
        });
    }
}