


export class CreateRoomDto {
    private constructor(
        public readonly name: string,
        public readonly capacity: number,
    ) { }

    static create(data: Record<string, unknown>): [string | undefined, CreateRoomDto?] {
        const { name, capacity } = data;
        if (!name || typeof name !== 'string') return ['name is required'];
        if (!capacity || typeof capacity !== 'number') return ['capacity must be a number'];
        if (capacity < 1) return ['capacity must be at least 1'];
        return [undefined, new CreateRoomDto(name, capacity)];
    }
}