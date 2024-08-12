// find.product.usecase.spec.ts

import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";
import { OutputFindProductDto } from "./find.product.dto";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test find product use case", () => {
  let productRepository: any;
  let findProductUseCase: FindProductUseCase;

  beforeEach(() => {
    productRepository = MockRepository();
    findProductUseCase = new FindProductUseCase(productRepository);
  });

  it("should find a product by ID", async () => {
    const product = new Product("1", "Product 1", 100);
    productRepository.find.mockResolvedValue(product);

    const output: OutputFindProductDto = await findProductUseCase.execute("1");

    expect(output).toEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it("should throw an error when product not found", async () => {
    productRepository.find.mockRejectedValue(new Error("Product not found"));

    await expect(findProductUseCase.execute("non-existent-id")).rejects.toThrow(
      "Product not found"
    );
  });
});
