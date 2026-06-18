import type { UserRole } from "../../../generated/prisma/enums.js";

export class UserEntity {
    constructor(
        public readonly id: number,
        public readonly email: string,
        public readonly name: string,
        public readonly password: string,
        public readonly role: UserRole,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }

    static fromObject(data: Record<string, unknown>): UserEntity {
        const { id, email, name, password, role, createdAt, updatedAt } = data;
        return new UserEntity(
            id as number,
            email as string,
            name as string,
            password as string,
            role as UserRole,
            createdAt as Date,
            updatedAt as Date,
        );
    }
}