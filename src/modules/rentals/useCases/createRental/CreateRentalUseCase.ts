import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental> {
    const minimumHour = 24;

    // Não deve ser possível cadastrar um novo aluguel caso já *** exista um aberto para o mesmo carro
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new AppError("Car is unavailable !");
    }

    // Não deve ser possível cadastrar um novo aluguel caso já *** exista um aberto para o mesmo usuário
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentaldByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user !");
    }

    // O aluguel deve ter duração mínima de 24 horas.
    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if (compare < minimumHour) {
      throw new AppError("Return date must be at least 24 hours");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
