
export class RoomEntity {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly capacity: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }

    static fromObject(data: Record<string, unknown>): RoomEntity {
        const { id, name, capacity, createdAt, updatedAt } = data;
        return new RoomEntity(
            id as number,
            name as string,
            capacity as number,
            createdAt as Date,
            updatedAt as Date,
        );
    }
}