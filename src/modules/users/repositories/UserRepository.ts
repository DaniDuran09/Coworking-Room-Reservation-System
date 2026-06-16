export abstract class UserRepository {
    abstract create();

    abstract findById();

    abstract findByEmail();
}