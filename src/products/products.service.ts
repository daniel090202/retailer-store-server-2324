import { HttpStatus, Injectable } from '@nestjs/common';

import { Product } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

import { ProductDTO } from '@/models';
@Injectable({})
class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async getProduct(SKU: string): Promise<{
    statusCode: number;
    message: string;
    data?: Array<Product>;
  }> {
    if (SKU.length <= 0) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'None of the products were found',
      };
    }

    try {
      const products: Array<Product> | null =
        await this.prismaService.product.findMany({
          where: {
            OR: [
              {
                SKU: { startsWith: SKU },
              },
            ],
          },
        });

      if (products.length === 0) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'None of the products were found',
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: 'All of products satisfied.',
          data: products,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async getAllProducts(): Promise<ReturnValue> {
    try {
      const products: Array<Product> =
        await this.prismaService.product.findMany({});

      return {
        statusCode: HttpStatus.OK,
        message: 'All available products.',
        data: products,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async getAllArchivedProducts() {
    try {
      const archivedProducts: Array<Product> =
        await this.prismaService.product.findMany({
          where: {
            archived: { equals: true },
          },
        });

      return {
        statusCode: HttpStatus.OK,
        message: 'All archived products.',
        data: archivedProducts,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async createProduct(productDTO: ProductDTO): Promise<ReturnValue> {
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
      };
    }
  }

  async updateProduct(productDTO: ProductDTO) {
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
