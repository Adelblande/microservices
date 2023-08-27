import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';

import { DatabaseModule } from 'src/database/database.module';
import { ProductResolver } from './graphql/resolvers/product.resolver';
import { ProductsService } from 'src/services/products/products.service';
import { PurchaseResolver } from './graphql/resolvers/purchase.resolver';
import { PurchasesService } from 'src/services/products/purchases.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    ProductResolver,
    ProductsService,
    PurchaseResolver,
    PurchasesService,
  ],
})
export class HttpModule {}
