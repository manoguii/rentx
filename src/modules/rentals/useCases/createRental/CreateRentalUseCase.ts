// import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

// @injectable()
class CreateRentalUseCase {
  constructor(
    // @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<void> {
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
  }
}

export { CreateRentalUseCase };
