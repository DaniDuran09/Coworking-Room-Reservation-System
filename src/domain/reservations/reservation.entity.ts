import type { ReservationState } from "../../../generated/prisma/enums.js";


export class ReservationEntity {
    constructor(
        public readonly id: number,
        public readonly userId: number,
        public readonly roomId: number,
        public readonly startDate: Date,
        public readonly endDate: Date,
        public readonly status: ReservationState,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }

    static fromObject(data: Record<string, unknown>): ReservationEntity {
        const { id, userId, roomId, startDate, endDate, status, createdAt, updatedAt } = data
        return new ReservationEntity(
            id as number,
            userId as number,
            roomId as number,
            startDate as Date,
            endDate as Date,
            status as ReservationState,
            createdAt as Date,
            updatedAt as Date,
        );
    }

}