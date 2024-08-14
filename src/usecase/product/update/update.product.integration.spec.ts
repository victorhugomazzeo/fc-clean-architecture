import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import { InputUpdateProductDto } from "./update.product.dto";

describe("Test update product use case", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const createProduct = new Product("1", "Product A", 100);
    await productRepository.create(createProduct);

    const usecase = new UpdateProductUseCase(productRepository);

    const input: InputUpdateProductDto = {
      id: "1",
      name: "Product B",
      price: 150,
    };

    await usecase.execute(input);

    const updatedProduct = await productRepository.find(input.id);

    expect(updatedProduct).toBeDefined();
    expect(updatedProduct.id).toBe(input.id);
    expect(updatedProduct.name).toBe(input.name);
    expect(updatedProduct.price).toBe(input.price);
  });
});
