import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Contract {
  @Field({ nullable: false })
  id?: string;
}

@ObjectType()
export class Owner {
  @Field({ nullable: true })
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

  @Field({ nullable: true })
  owner?: Owner;
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
  NFT721?: NFT721[];

  @Field(() => [NFT1155], { nullable: true })
  NFT1155?: NFT1155[];
}

@ObjectType()
export class NftContractsResponse {
  @Field({ nullable: true })
  code: number;

  @Field({ nullable: true })
  message?: string;

  @Field(() => [NFT721], { nullable: true })
  NFT721?: NFT721;
}

@ObjectType()
export class ContractItem {
  @Field({ nullable: false })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: false })
  symbol?: string;

  @Field({ nullable: false })
  totalSupply?: string;

  @Field({ nullable: true })
  totalVolume?: string;
}

@ObjectType()
export class ContractInformationResponse {
  @Field({ nullable: true })
  code: number;

  @Field({ nullable: true })
  message?: string;

  @Field(() => ContractItem, { nullable: true })
  contract?: ContractItem;
}
