export abstract class ReservationRepository {
    abstract create();

    abstract findById();

    abstract findByUserId();

    abstract findAll();

    abstract update();
}