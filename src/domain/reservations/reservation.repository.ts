import type { CreateReservationDto } from "./dto/create-reservation.dto.js";
import type { ReservationEntity } from "./reservation.entity.js";



export abstract class ReservationRepository {
    abstract create(dto: CreateReservationDto, userId: number): Promise<ReservationEntity>;
    abstract findAll(): Promise<ReservationEntity[]>;
    abstract findById(id: number): Promise<ReservationEntity | null>;
    abstract findByUserId(id: number): Promise<ReservationEntity[]>;
    abstract cancel(id: number): Promise<ReservationEntity>;
    abstract findOverlapping(roomId: number, startDate: Date, endDate: Date): Promise<ReservationEntity[]>;
}