// list.products.usecase.spec.ts

import ListProductsUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";
import { OutputListProductsDto } from "./list.product.dto";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test list products use case", () => {
  let productRepository: any;
  let listProductsUseCase: ListProductsUseCase;

  beforeEach(() => {
    productRepository = MockRepository();
    listProductsUseCase = new ListProductsUseCase(productRepository);
  });

  it("should list all products", async () => {
    const products = [
      new Product("1", "Product 1", 100),
      new Product("2", "Product 2", 200),
    ];
    productRepository.findAll.mockResolvedValue(products);

    const output: OutputListProductsDto = await listProductsUseCase.execute();

    expect(output).toEqual({
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    });
  });

  it("should return an empty list when no products are found", async () => {
    productRepository.findAll.mockResolvedValue([]);

    const output: OutputListProductsDto = await listProductsUseCase.execute();

    expect(output).toEqual({
      products: [],
    });
  });
});
