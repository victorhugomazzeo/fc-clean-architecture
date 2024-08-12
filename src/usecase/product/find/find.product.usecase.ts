// find.product.usecase.ts

import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputFindProductDto } from "./find.product.dto";
import Product from "../../../domain/product/entity/product";

export default class FindProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(id: string): Promise<OutputFindProductDto> {
    const product = await this.productRepository.find(id);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
