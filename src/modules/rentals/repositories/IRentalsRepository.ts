import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentaldByUser(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
