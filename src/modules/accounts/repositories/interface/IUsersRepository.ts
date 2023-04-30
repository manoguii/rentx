import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '@prisma/client'

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
  findByDriverLicense(driver_license: string): Promise<User>
}

export { IUsersRepository }
