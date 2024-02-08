import {
  Get,
  Put,
  Post,
  Body,
  Query,
  HttpCode,
  Controller,
} from '@nestjs/common';

import { ProductDTO } from '@/models';

import { ProductsService } from './products.service';

@Controller('api/v1/products')
class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/get-product-with-sku')
  @HttpCode(200)
  getProductsWithSKU(@Query() query: { SKU: string; filter: string }) {
    const { SKU, filter } = query;

    return this.productsService.getProductsWithSKU(SKU, filter);
  }

  @Get('/get-product-with-upc')
  @HttpCode(200)
  getProductWithUPC(
    @Query()
    query: {
      UPC: string;
    },
  ) {
    const { UPC } = query;

    return this.productsService.getProductWithUPC(UPC);
  }

  @Get('/get-products-with-upc')
  @HttpCode(200)
  getProductsWithUPC(
    @Query()
    query: {
      page: number;
      UPC: string;
      filter: string;
      archivedProductStatus: string;
    },
  ) {
    const { page, UPC, filter, archivedProductStatus } = query;

    return this.productsService.getProductsWithUPC(
      page,
      UPC,
      filter,
      archivedProductStatus,
    );
  }

  @Get('get-all-archived-products')
  @HttpCode(200)
  getAllArchivedProducts(@Query() query: { page: number }) {
    const { page } = query;

    return this.productsService.getAllArchivedProducts(page);
  }

  @Post('create-product')
  @HttpCode(200)
  createProduct(@Body() body: ProductDTO) {
    const productDTO = new ProductDTO(
      body.UPC,
      body.name,
      body.brand,
      body.forGender,
      body.category,
      body.originalPrice,
      body.salePrice,
      body.unit,
      body.details,
    );

    return this.productsService.createProduct(productDTO);
  }

  @Put('update-product')
  @HttpCode(200)
  updateProduct(@Body() body: ProductDTO) {
    const productDTO = new ProductDTO(
      body.UPC,
      body.name,
      body.brand,
      body.forGender,
      body.category,
      body.originalPrice,
      body.salePrice,
      body.unit,
      body.details,
    );

    return this.productsService.updateProduct(productDTO);
  }
}

export { ProductsController };
