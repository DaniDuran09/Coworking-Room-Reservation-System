import type { Request, Response } from "express";
import type { ReservationService } from "../../domain/reservations/reservation.service.js";
import { CreateReservationDto } from "../../domain/reservations/dto/create-reservation.dto.js";


export class ReservationController {

    constructor(
        private readonly reservationService: ReservationService,
    ) { }

    createReservation = (req: Request, res: Response) => {
        const [error, dto] = CreateReservationDto.create(req.body);
        if (error) return res.status(400).json({ error });
        const userId = req.user!.id;
        this.reservationService
            .createReservation(dto!, userId)
            .then((reservation) => res.status(201).json(reservation))
            .catch((err) => res.status(400).json({ error: err.message }));
    };

    getReservations = (req: Request, res: Response) => {
        this.reservationService
            .getReservations()
            .then((reservations) => res.status(200).json(reservations))
            .catch((err) => res.status(404).json({ error: err.message }));
    };

    getReservationsByUser = (req: Request, res: Response) => {
        this.reservationService
            .getReservationsByUser(req.user?.id!)
            .then((reservations) => res.status(200).json(reservations))
            .catch((err) => res.status(404).json({ error: err.message }))
    }

    cancelReservation = (req: Request, res: Response) => {
        const userId = req.user!.id;
        const reservationId = +req.params.id!;

        this.reservationService
            .cancelReservation(reservationId, userId)
            .then((reservation) => res.status(200).json(reservation))
            .catch((err) => res.status(400).json({ error: err.message }));
    };


}