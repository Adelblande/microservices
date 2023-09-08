import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { Purchase } from '../models/purchase';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { UseGuards } from '@nestjs/common';
import { CustomersService } from 'src/services/customers.service';

@Resolver(() => Purchase)
export class PurchaseResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private customersService: CustomersService,
  ) {}

  @Query(() => [Purchase])
  purchases() {
    return this.purchasesService.listAll();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productsService.listOne(purchase.productId);
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Purchase)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    let customer = await this.customersService.getCustomerByAuthUserId(
      user.sub,
    );

    if (!customer) {
      customer = await this.customersService.create({ authUserId: user.sub });
    }

    return this.purchasesService.create({
      customerId: customer.id,
      productId: data.productId,
    });
  }
}
