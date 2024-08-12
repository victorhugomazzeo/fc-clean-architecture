import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputListProductsDto } from "./list.product.dto";
import Product from "../../../domain/product/entity/product";

export default class ListProductsUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<OutputListProductsDto> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
