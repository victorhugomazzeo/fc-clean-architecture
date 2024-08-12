// update.product.usecase.spec.ts

import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test update product use case", () => {
  let productRepository: any;
  let updateProductUseCase: UpdateProductUseCase;

  beforeEach(() => {
    productRepository = MockRepository();
    updateProductUseCase = new UpdateProductUseCase(productRepository);
  });

  it("should update a product", async () => {
    const input: InputUpdateProductDto = {
      id: "1",
      name: "Updated Product",
      price: 150,
    };

    const product = new Product(input.id, input.name, input.price);
    productRepository.update.mockResolvedValue(undefined);

    const output: OutputUpdateProductDto = await updateProductUseCase.execute(input);

    expect(output).toEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
    expect(productRepository.update).toHaveBeenCalledWith(product);
  });
});
