

export class CreateReservationDto {

    private constructor(
        public readonly roomId: number,
        public readonly startDate: Date,
        public readonly endDate: Date,
    ) { }

    static create(data: Record<string, unknown>): [string | undefined, CreateReservationDto?] {
        const { roomId, startDate, endDate } = data;
        if (!roomId || typeof roomId !== 'number') return ['room id is required'];
        if (!startDate || typeof startDate !== 'string') return ['start date is required'];
        if (!endDate || typeof endDate !== 'string') return ['end date is required'];

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime())) return ['start Date mus be a valid date'];
        if (isNaN(end.getTime())) return ['end Date mus be a valid date'];
        if (end <= start) return ['end Date must be after start date'];

        return [undefined, new CreateReservationDto(roomId, start, end)];

    }

}