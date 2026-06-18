import type { RoomRepository } from "../room/room.repository.js";
import type { UserRepository } from "../user/user.repository.js";
import type { CreateReservationDto } from "./dto/create-reservation.dto.js";
import { ReservationEntity } from "./reservation.entity.js";
import type { ReservationRepository } from "./reservation.repository.js";

export class ReservationService {
    constructor(
        private readonly reservationRepository: ReservationRepository,
        private readonly userRepository: UserRepository,
        private readonly roomRepository: RoomRepository,
    ) { }

    async createReservation(dto: CreateReservationDto, userId: number): Promise<ReservationEntity> {
        const { roomId, startDate, endDate, } = dto;

        const start = new Date(startDate);
        const end = new Date(endDate);
        if (start >= end) throw new Error('Start Date should be more recent than endDate');
        if (start < new Date()) throw new Error('Start date should start in the future');

        const user = await this.userRepository.findById(userId);
        if (!user) throw new Error('User not found');

        const room = await this.roomRepository.findById(dto.roomId);
        if (!room) throw new Error('Room not found');

        const overlapping = await this.reservationRepository.findOverlapping(dto.roomId, dto.startDate, dto.endDate)
        if (overlapping.length > 0) throw new Error('This room is not available for the selected time slot');

        return await this.reservationRepository.create(dto, userId)

    }

    async getReservations(): Promise<ReservationEntity[]> {
        return await this.reservationRepository.findAll()
    }

    async getReservationsByUser(userId: number): Promise<ReservationEntity[] | null> {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new Error('User not found');
        return this.reservationRepository.findByUserId(userId);
    }

    async getReservationById(id: number): Promise<ReservationEntity | null> {
        const reservation = await this.reservationRepository.findById(id);
        if (!reservation) throw new Error('Reservation not found');
        return reservation;
    }

    async cancelReservation(id: number, userId: number) {
        const reservation = await this.reservationRepository.findById(id);
        if (!reservation) throw new Error('Reservation not found');
        if (reservation.userId !== userId) throw new Error('you can only cancel your own reservations');
        return await this.reservationRepository.cancel(id);
    }

}