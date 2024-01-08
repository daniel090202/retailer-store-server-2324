import { Injectable, HttpStatus } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import { ProductDTO } from '@/dto';

@Injectable({})
class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(productDTO: ProductDTO) {
    try {
      const product: ProductDTO = await this.prismaService.product.create({
        data: {
          SKU: productDTO.SKU,
          UPC: productDTO.UPC,
          name: productDTO.name,
          brand: productDTO.brand,
          forGender: productDTO.forGender,
          category: productDTO.category,
          size: productDTO.size,
          color: productDTO.color,
          originalPrice: productDTO.originalPrice,
          salePrice: productDTO.salePrice,
          unit: productDTO.unit,
          initialInventory: productDTO.initialInventory,
          minimumInventory: productDTO.minimumInventory,
          maximumInventory: productDTO.maximumInventory,
          remainInventory: productDTO.remainInventory,
          soldQuantity: productDTO.soldQuantity,
          storageLocation: productDTO.storageLocation,
          displayLocation: productDTO.displayLocation,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully created.',
        data: product,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        return {
          statusCode: error.code,
          message: 'Duplicate registration.',
        };
      }

      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
        error,
      };
    }
  }

  async update(productDTO: ProductDTO) {
    try {
      const product: ProductDTO = await this.prismaService.product.update({
        where: {
          SKU: productDTO.SKU,
        },
        data: {
          SKU: productDTO.SKU,
          UPC: productDTO.UPC,
          name: productDTO.name,
          brand: productDTO.brand,
          forGender: productDTO.forGender,
          category: productDTO.category,
          size: productDTO.size,
          color: productDTO.color,
          originalPrice: productDTO.originalPrice,
          salePrice: productDTO.salePrice,
          unit: productDTO.unit,
          initialInventory: productDTO.initialInventory,
          minimumInventory: productDTO.minimumInventory,
          maximumInventory: productDTO.maximumInventory,
          remainInventory: productDTO.remainInventory,
          soldQuantity: productDTO.soldQuantity,
          storageLocation: productDTO.storageLocation,
          displayLocation: productDTO.displayLocation,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully updated.',
        data: product,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
        error,
      };
    }
  }
}

export { ProductsService };
