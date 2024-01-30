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
  getProductsWithUPC(@Query() query: { UPC: string; filter: string }) {
    const { UPC, filter } = query;

    return this.productsService.getProductsWithUPC(UPC, filter);
  }

  @Get('get-all-products')
  @HttpCode(200)
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get('get-all-archived-products')
  @HttpCode(200)
  getAllArchivedProducts() {
    return this.productsService.getAllArchivedProducts();
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
