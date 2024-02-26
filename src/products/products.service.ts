import { HttpStatus, Injectable } from '@nestjs/common';

import { Product, ProductDetail } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

import { ProductDTO } from '@/models';

@Injectable({})
class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async getProductsWithSKU(
    SKU: string,
    filter: string,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: Array<{
      product: Product;
      detail: ProductDetail;
    }>;
  }> {
    try {
      const maxProductReturned = 3;

      const productsWithEachDetail: Array<{
        product: Product;
        detail: ProductDetail;
      }> = [];

      let productDetails: Array<ProductDetail> | null =
        await this.prismaService.productDetail.findMany({
          take: maxProductReturned,
          where: {
            SKU: { endsWith: SKU },
          },
        });

      switch (filter) {
        case 'ascending-stock':
          productDetails = await this.prismaService.productDetail.findMany({
            where: {
              SKU: { startsWith: SKU },
            },
            orderBy: [
              {
                remainInventory: 'asc',
              },
            ],
          });

          break;
        case 'descending-stock':
          productDetails = await this.prismaService.productDetail.findMany({
            where: {
              SKU: { startsWith: SKU },
            },
            orderBy: [
              {
                remainInventory: 'desc',
              },
            ],
          });

          break;
      }

      if (productDetails === null) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'None of the variance of the products were found',
        };
      } else {
        for (const productDetail of productDetails) {
          const product = await this.prismaService.product.findUnique({
            where: {
              UPC: productDetail.UPC,
            },
          });

          if (product) {
            productsWithEachDetail.push({
              product: product,
              detail: productDetail,
            });
          } else {
            return {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal server error.',
            };
          }
        }

        return {
          statusCode: HttpStatus.OK,
          message: 'All satisfied products with each variance.',
          data: productsWithEachDetail,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async getProductWithUPC(UPC: string): Promise<{
    statusCode: number;
    message: string;
    data?: Product;
  }> {
    try {
      const product: Product | null =
        await this.prismaService.product.findUnique({
          where: {
            UPC: UPC,
          },
          include: {
            productDetails: true,
          },
        });

      if (product === null) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'None of the products were found',
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: `The product with UPC as ${UPC}.`,
          data: product,
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async getProductsWithUPC(
    page: number,
    UPC: string,
    filter: string,
    archivedProductStatus: string,
  ): Promise<{
    statusCode: number;
    message: string;
    data?: {
      totalPage: number;
      totalProduct: number;
      allProducts: Array<Product>;
    };
  }> {
    if (page < 1) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Page number must be greater than 1.',
      };
    }

    try {
      const itemsPerPage = 7;
      const actualPage = page - 1;

      let products: Array<Product> | null;

      const allProducts: Array<Product> | null =
        await this.prismaService.product.findMany({
          where: {
            UPC: { startsWith: UPC },
            archived: archivedProductStatus === 'archived' ? true : false,
          },
          orderBy: [
            {
              name: 'asc',
            },
          ],
        });

      switch (filter) {
        case 'alphabetical':
          products = await this.prismaService.product.findMany({
            skip: actualPage * itemsPerPage,
            take: itemsPerPage,
            where: {
              UPC: { startsWith: UPC },
              archived: archivedProductStatus === 'archived' ? true : false,
            },
            orderBy: [
              {
                name: 'asc',
              },
            ],
            include: {
              productDetails: true,
            },
          });

          break;
        case 'ascending-sale-price':
          products = await this.prismaService.product.findMany({
            skip: actualPage * itemsPerPage,
            take: itemsPerPage,
            where: {
              UPC: { startsWith: UPC },
              archived: archivedProductStatus === 'archived' ? true : false,
            },
            orderBy: [
              {
                salePrice: 'asc',
              },
            ],
            include: {
              productDetails: true,
            },
          });

          break;
        case 'descending-sale-price':
          products = await this.prismaService.product.findMany({
            skip: actualPage * itemsPerPage,
            take: itemsPerPage,
            where: {
              UPC: { startsWith: UPC },
              archived: archivedProductStatus === 'archived' ? true : false,
            },
            orderBy: [
              {
                salePrice: 'desc',
              },
            ],
            include: {
              productDetails: true,
            },
          });

          break;
        case 'ascending-stock':
          products = await this.prismaService.product.findMany({
            skip: actualPage * itemsPerPage,
            take: itemsPerPage,
            where: {
              UPC: { startsWith: UPC },
              archived: archivedProductStatus === 'archived' ? true : false,
            },
            include: {
              productDetails: {
                orderBy: {
                  remainInventory: 'asc',
                },
              },
            },
          });

          break;
        case 'descending-stock':
          products = await this.prismaService.product.findMany({
            skip: actualPage * itemsPerPage,
            take: itemsPerPage,
            where: {
              UPC: { startsWith: UPC },
              archived: archivedProductStatus === 'archived' ? true : false,
            },
            include: {
              productDetails: {
                orderBy: {
                  remainInventory: 'desc',
                },
              },
            },
          });

          break;
        default:
          products = await this.prismaService.product.findMany({
            skip: actualPage * itemsPerPage,
            take: itemsPerPage,
            where: {
              UPC: { startsWith: UPC },
              archived: archivedProductStatus === 'archived' ? true : false,
            },
            include: {
              productDetails: true,
            },
          });

          break;
      }

      const totalProduct = allProducts.length;
      const totalPage = Math.ceil(totalProduct / itemsPerPage);

      if (products === null) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'None of the products were found',
        };
      } else {
        return {
          statusCode: HttpStatus.OK,
          message: `All the ${archivedProductStatus} products with UPC as ${UPC} of page ${page} over ${totalPage}.`,
          data: {
            totalPage: totalPage,
            allProducts: products,
            totalProduct: totalProduct,
          },
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async getAllArchivedProducts(page: number): Promise<{
    statusCode: number;
    message: string;
    data?: {
      totalPage: number;
      totalArchivedProduct: number;
      allArchivedProducts: Array<Product>;
    };
  }> {
    if (page < 1) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Page number must be greater than 1.',
      };
    }

    try {
      const itemsPerPage = 7;
      const actualPage = page - 1;

      const products: Array<Product> =
        await this.prismaService.product.findMany({
          skip: actualPage * itemsPerPage,
          take: itemsPerPage,
          where: {
            archived: true,
          },
          include: {
            productDetails: true,
          },
        });

      const allProducts: Array<Product> =
        await this.prismaService.product.findMany({
          where: {
            archived: true,
          },
        });

      const totalArchivedProduct = allProducts.length;
      const totalPage = Math.ceil(totalArchivedProduct / itemsPerPage);

      return {
        statusCode: HttpStatus.OK,
        message: `All archived products of page ${page} over ${totalPage}.`,
        data: {
          totalArchivedProduct: totalArchivedProduct,
          totalPage: totalPage,
          allArchivedProducts: products,
        },
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error.',
      };
    }
  }

  async createProduct(productDTO: ProductDTO): Promise<{
    statusCode: number;
    message: string;
    data?: Product;
  }> {
    try {
      const product: Product | undefined =
        await this.prismaService.product.create({
          data: {
            UPC: productDTO.UPC,
            name: productDTO.name,
            brand: productDTO.brand,
            forGender: productDTO.forGender,
            category: productDTO.category,
            originalPrice: productDTO.originalPrice,
            salePrice: productDTO.salePrice,
            unit: productDTO.unit,

            productDetails: {
              createMany: {
                data: productDTO.details,
              },
            },
          },
          include: {
            productDetails: true,
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

  async updateProduct(productDTO: ProductDTO): Promise<{
    statusCode: number;
    message: string;
    data?: Product;
  }> {
    try {
      const product: Product = await this.prismaService.product.update({
        where: {
          UPC: productDTO.UPC,
        },
        data: {
          UPC: productDTO.UPC,
          name: productDTO.name,
          brand: productDTO.brand,
          forGender: productDTO.forGender,
          category: productDTO.category,
          originalPrice: productDTO.originalPrice,
          salePrice: productDTO.salePrice,
          unit: productDTO.unit,

          productDetails: {
            deleteMany: [{ UPC: productDTO.UPC }],
            createMany: { data: productDTO.details },
          },
        },
        include: {
          productDetails: true,
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
      };
    }
  }
}

export { ProductsService };
