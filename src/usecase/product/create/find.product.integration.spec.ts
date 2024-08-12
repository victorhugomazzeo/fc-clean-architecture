// create.product.usecase.spec.ts

import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import { InputCreateProductDto } from "./create.product.dto";

describe("Test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input: InputCreateProductDto = {
      name: "Product A",
      price: 100,
    };

    const output = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);

    const createdProduct = await productRepository.find(result.id);

    expect(createdProduct).toBeDefined();
    expect(createdProduct.id).toBe(result.id);
    expect(createdProduct.name).toBe(input.name);
    expect(createdProduct.price).toBe(input.price);
  });
});
