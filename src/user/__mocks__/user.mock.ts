import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userEntityMock : UserEntity = {
    id: 1,
    cpf: "12345678910",
    email: "email@mock.com",
    name: "User Mock",
    password: "123456",
    phone: "12345678910",
    typeUser: UserType.User,
    createdAt: new Date(),
    updatedAt: undefined
}