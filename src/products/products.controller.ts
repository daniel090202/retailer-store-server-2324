import { Post, Body, HttpCode, Controller, Req, Put } from '@nestjs/common';

import { ProductDTO } from '@/dto';

import { ProductsService } from './products.service';

@Controller('api/v1/products')
class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('create')
  @HttpCode(200)
  create(@Body() body: ProductDTO) {
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

    return this.productsService.create(productDTO);
  }

  @Put('update')
  @HttpCode(200)
  update(@Body() body: ProductDTO) {
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

    return this.productsService.update(productDTO);
  }
}

export { ProductsController };
