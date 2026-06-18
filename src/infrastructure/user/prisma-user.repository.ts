import type { RegisterDto } from "../../domain/auth/dtos/register.dto.js";
import { UserEntity } from "../../domain/user/user.entity.js";
import { UserRepository } from "../../domain/user/user.repository.js";
import { prisma } from "../../lib/prisma.js";



export class PrismaUserRepository extends UserRepository {

    async create(dto: RegisterDto, hashedPassword: string): Promise<UserEntity> {
        const user = await prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashedPassword,
                role: 'MEMBER',
            },
        });
        return UserEntity.fromObject(user);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        return UserEntity.fromObject(user);
    }

    async findById(id: number): Promise<UserEntity | null> {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return null;
        return UserEntity.fromObject(user);
    }


}