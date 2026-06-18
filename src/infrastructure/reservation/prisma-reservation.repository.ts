import type { CreateReservationDto } from "../../domain/reservations/dto/create-reservation.dto.js";
import { ReservationEntity } from "../../domain/reservations/reservation.entity.js";
import { ReservationRepository } from "../../domain/reservations/reservation.repository.js";
import { prisma } from "../../lib/prisma.js";

export class PrismaReservationRepository extends ReservationRepository {

    async create(dto: CreateReservationDto, userId: number): Promise<ReservationEntity> {
        const create = await prisma.reservation.create({
            data: {
                roomId: dto.roomId,
                startDate: dto.startDate,
                endDate: dto.endDate,
                userId
            }
        });
        return ReservationEntity.fromObject(create);
    }

    async findAll(): Promise<ReservationEntity[]> {
        const reservations = await prisma.reservation.findMany();
        return reservations.map(ReservationEntity.fromObject)
    }

    async findById(id: number): Promise<ReservationEntity | null> {
        const reservation = await prisma.reservation.findUnique({ where: { id } });
        if (!reservation) return null;
        return ReservationEntity.fromObject(reservation);
    }

    async findByUserId(id: number): Promise<ReservationEntity[]> {
        const reservations = await prisma.reservation.findMany({ where: { userId: id } });
        return reservations.map(ReservationEntity.fromObject);
    }

    async cancel(id: number): Promise<ReservationEntity> {
        const reservation = await prisma.reservation.update({
            where: { id },
            data: { status: 'CANCELLED' }
        })
        return ReservationEntity.fromObject(reservation);
    }

    async findOverlapping(roomId: number, startDate: Date, endDate: Date): Promise<ReservationEntity[]> {
        const overlapping = await prisma.reservation.findMany({
            where: {
                roomId,
                status: { not: 'CANCELLED' },
                startDate: { lt: endDate },
                endDate: { gt: startDate },
            },
        });
        return overlapping.map(ReservationEntity.fromObject);
    }

}