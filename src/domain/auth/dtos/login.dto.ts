

export class LoginDto {

    private constructor(
        public readonly email: string,
        public readonly password: string,
    ) { }

    static create(data: Record<string, unknown>): [string | undefined, LoginDto?] {
        const { email, password } = data;
        if (!email || typeof email !== 'string') return ['email is required'];
        if (!password || typeof password !== 'string') return ['password is required'];

        return [undefined, new LoginDto(email, password)];
    }

}