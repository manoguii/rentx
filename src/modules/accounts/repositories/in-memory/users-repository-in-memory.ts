import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '@prisma/client'
import { User as UserEntity } from '../../entities/User'
import { IUsersRepository } from '../interface/IUsersRepository'

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = []

  async create({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new UserEntity()

    Object.assign(user, {
      name,
      email,
      driver_license,
      password,
    })

    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email)
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id)
  }

  async findByDriverLicense(driver_license: string): Promise<User> {
    return this.users.find((user) => user.driver_license === driver_license)
  }

  async updatePassword(user_id: string, password: string): Promise<User> {
    let userWithUpdatedPassword: User

    this.users.map((user) => {
      if (user.id === user_id) {
        const userUpdated = {
          ...user,
          password,
        }

        userWithUpdatedPassword = userUpdated

        return userUpdated
      } else {
        return user
      }
    })

    return userWithUpdatedPassword
  }
}

export { UsersRepositoryInMemory }
