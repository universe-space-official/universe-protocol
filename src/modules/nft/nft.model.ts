import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NFT721 {
    @Field({ nullable: true })
    token_address?: string;

    @Field({ nullable: true })
    token_id?: string;

    @Field({ nullable: true })
    owner_of?: string;

    @Field({ nullable: true })
    contract_type?: string;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    symbol?: string;

    @Field({ nullable: true })
    token_uri?: string;

    @Field({ nullable: true })
    metadata?: string;
}

@ObjectType()
export class NFT1155 {
    @Field({ nullable: true })
    token_address?: string;

    @Field({ nullable: true })
    token_id?: string;

    @Field({ nullable: true })
    owner_of?: string;

    @Field({ nullable: true })
    contract_type?: string;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    symbol?: string;

    @Field({ nullable: true })
    token_uri?: string;

    @Field({ nullable: true })
    metadata?: string;
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
