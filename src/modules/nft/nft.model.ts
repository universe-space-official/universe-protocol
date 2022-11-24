import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Contract {
  @Field({ nullable: false })
  id?: string;
}

@ObjectType()
export class NFT721 {
  @Field({ nullable: false })
  id?: string;

  @Field({ nullable: true })
  uri?: string;

  @Field({ nullable: false })
  contract?: Contract;

  @Field({ nullable: false })
  identifier?: number;

  @Field({ nullable: true })
  chainId?: number;

  @Field({ nullable: true })
  metadata?: String;
}

@ObjectType()
export class NFT1155 {
  @Field({ nullable: false })
  id?: string;

  @Field({ nullable: true })
  uri?: string;

  @Field({ nullable: false })
  contract?: string;
}

@ObjectType()
export class NftListResponse {
  @Field({ nullable: true })
  code: number;

  @Field({ nullable: true })
  message?: string;

  @Field(() => [NFT721], { nullable: true })
  NFT721?: any;

  @Field(() => [NFT1155], { nullable: true })
  NFT1155?: any;
}

@ObjectType()
export class NftContractsResponse {
  @Field({ nullable: true })
  code: number;

  @Field({ nullable: true })
  message?: string;

  @Field(() => [NFT721], { nullable: true })
  NFT721?: any;
}
