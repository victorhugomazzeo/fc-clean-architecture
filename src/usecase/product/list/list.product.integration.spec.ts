import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Test list product use case", () => {
    let sequelize: Sequelize;
    let productRepository: ProductRepository;
    let createProductUseCase: CreateProductUseCase;
    let listProductUseCase: ListProductUseCase;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();

        productRepository = new ProductRepository();
        createProductUseCase = new CreateProductUseCase(productRepository);
        listProductUseCase = new ListProductUseCase(productRepository);
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should list all products", async () => {
        const products = [
            new Product("1", "Product 1", 100),
            new Product("2", "Product 2", 200),
        ];

        await productRepository.create(products[0]);
        await productRepository.create(products[1]);

        const result = await listProductUseCase.execute();

        expect(result).toEqual({
            products: products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
            })),
        });
    });
});
