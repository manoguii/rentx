import { AppError } from "@errors/AppError";
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
    const car = await createCarUseCase.execute({
      name: "test-car",
      description: "test-car-description",
      daily_rate: 100,
      license_plate: "ABC-123",
      fine_amount: 100,
      brand: "test-brand",
      category_id: "test-category-id",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        description: "test-car-description",
        daily_rate: 100,
        license_plate: "ABC-123",
        fine_amount: 100,
        brand: "test-brand",
        category_id: "test-category-id",
      });

      await createCarUseCase.execute({
        name: "Car 2",
        description: "test-car-description",
        daily_rate: 100,
        license_plate: "ABC-123",
        fine_amount: 100,
        brand: "test-brand",
        category_id: "test-category-id",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "test-car-description",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 100,
      brand: "test-brand",
      category_id: "test-category-id",
    });

    expect(car.available).toBe(true);
  });
});
