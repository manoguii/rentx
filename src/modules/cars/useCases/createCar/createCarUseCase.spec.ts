import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "./createCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("shold be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "test-car",
      description: "test-car-description",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 100,
      brand: "test-brand",
      category_id: "test-category-id",
    });
  });
});
