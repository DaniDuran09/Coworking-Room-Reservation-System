
import bcrypt from "bcryptjs";

export class BcryptAdapter {
    static hash(password: string): string {
        return bcrypt.hashSync(password, 10);
    }
    static compare(password: string, hashed: string): boolean {
        return bcrypt.compareSync(password, hashed);
    }
}