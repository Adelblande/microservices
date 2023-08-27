import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { Product } from '../models/product';
import { ProductsService } from 'src/services/products/products.service';
import { CreateProductInput } from '../inputs/create-product-input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productsService.listAll();
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Product)
  create(@Args('data') data: CreateProductInput) {
    return this.productsService.create(data);
  }
}
