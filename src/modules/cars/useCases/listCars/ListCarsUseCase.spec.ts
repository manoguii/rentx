import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "description car",
      daily_rate: 230,
      license_plate: "SDKF-258",
      fine_amount: 80,
      brand: "car_brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "description car",
      daily_rate: 230,
      license_plate: "SDKF-258",
      fine_amount: 80,
      brand: "brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({ brand: "brand" });

    expect(cars).toEqual([car]);
  });
});
