import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/accounts/repositories/interface/IUsersRepository'

import { User } from '@prisma/client'
import { prisma } from '@lib/prisma'

class UsersRepository implements IUsersRepository {
  async create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    await prisma.user.create({
      data: {
        name,
        email,
        password,
        driver_license,
      },
    })
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByDriverLicense(driver_license: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        driver_license,
      },
    })

    return user
  }
}

export { UsersRepository }
