import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
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

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "description car",
      daily_rate: 230,
      license_plate: "SDKF-258",
      fine_amount: 80,
      brand: "brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: "brand" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3 ",
      description: "description car",
      daily_rate: 230,
      license_plate: "SDKF-258",
      fine_amount: 80,
      brand: "brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "car3" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4 ",
      description: "description car",
      daily_rate: 230,
      license_plate: "SDKF-258",
      fine_amount: 80,
      brand: "brand",
      category_id: "12345",
    });

    const cars = await listAvailableCarsUseCase.execute({ category_id: "12345" });

    expect(cars).toEqual([car]);
  });
});
