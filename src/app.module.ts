import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
// import { RecipesModule } from './recipes/recipes.module';

import { ProfileModule } from './modules/profile/profile.module';
import { NftListResponse } from './modules/nft/nft.model';
import { Profile } from './modules/profile/profile.model';

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
