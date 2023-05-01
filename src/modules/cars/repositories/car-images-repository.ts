import { CarImage } from '@prisma/client'
import { ICarImagesRepository } from './interface/ICarImagesRepository'
import { prisma } from '@lib/prisma'

class CarImagesRepository implements ICarImagesRepository {
  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = await prisma.carImage.create({
      data: {
        image_name,
        car_id,
      },
    })

    return carImage
  }
}

export { CarImagesRepository }
