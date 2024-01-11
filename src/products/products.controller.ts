import { Get, Put, Post, Body, HttpCode, Controller } from '@nestjs/common';

import { ProductDTO } from '@/models';

import { ProductsService } from './products.service';

@Controller('api/v1/products')
class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @HttpCode(200)
  getAllProducts() {
    return;
  }

  @Post('create')
  @HttpCode(200)
  createProduct(@Body() body: ProductDTO) {
    const productDTO = new ProductDTO(
      body.SKU,
      body.UPC,
      body.name,
      body.brand,
      body.forGender,
      body.category,
      body.size,
      body.color,
      body.originalPrice,
      body.salePrice,
      body.unit,
      body.initialInventory,
      body.minimumInventory,
      body.maximumInventory,
      body.storageLocation,
    );

    return this.productsService.createProduct(productDTO);
  }

  @Put('update')
  @HttpCode(200)
  updateProduct(@Body() body: ProductDTO) {
    const productDTO = new ProductDTO(
      body.SKU,
      body.UPC,
      body.name,
      body.brand,
      body.forGender,
      body.category,
      body.size,
      body.color,
      body.originalPrice,
      body.salePrice,
      body.unit,
      body.initialInventory,
      body.minimumInventory,
      body.maximumInventory,
      body.storageLocation,
    );

    return this.productsService.updateProduct(productDTO);
  }
}

export { ProductsController };
