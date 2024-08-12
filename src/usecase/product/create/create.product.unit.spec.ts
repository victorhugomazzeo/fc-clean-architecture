import CreateProductUseCase from "./create.product.usecase";
import { InputCreateProductDto } from "./create.product.dto";

const initialInput: InputCreateProductDto = {
    name: "Product 1",
    price: 100,
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test create product use case", () => {
    let input: InputCreateProductDto;
    let productRepository: any;
    let productCreateUseCase: CreateProductUseCase;

    beforeEach(() => {
        input = { ...initialInput }; // Restore the input object to its initial state before each test
        productRepository = MockRepository();
        productCreateUseCase = new CreateProductUseCase(productRepository);
    });

    it("should create a product", async () => {
        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("should throw an error when name is missing", async () => {
        input.name = "";

        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
            "Name is required"
        );
    });

    it("should throw an error when price is negative", async () => {

        input.price = -1;

        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        );
    });
});
