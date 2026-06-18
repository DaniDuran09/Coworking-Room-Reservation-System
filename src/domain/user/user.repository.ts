import type { RegisterDto } from "../auth/dtos/register.dto.js";
import type { UserEntity } from "./user.entity.js";


export abstract class UserRepository {
    abstract create(dto: RegisterDto, hashedPassword: string): Promise<UserEntity>;
    abstract findByEmail(email: string): Promise<UserEntity | null>;
    abstract findById(id: number): Promise<UserEntity | null>
}