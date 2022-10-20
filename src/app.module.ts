import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
// import { RecipesModule } from './recipes/recipes.module';


import { ProfileModule } from './modules/profile/profile.module.js';
import { NftListResponse } from './modules/nft/nft.model.js';
import { Profile } from './modules/profile/profile.model.js';

import { Orbis } from './modules/orbis/orbis.model.js';

@Module({
  imports: [
    ProfileModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'example',
      password: 'example',
      database: 'example',
      entities: [Profile, NftListResponse],
      synchronize: true,
    })
  ],
})
export class AppModule { }
