import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NFT721 {
    @Field({ nullable: false })
    id?: string
    @Field({ nullable: true })
    uri?: string
    @Field({ nullable: false })
    identifier?: number
    @Field({ nullable: false })
    chainId?: number
}

@ObjectType()
export class NFT1155 {
    @Field({ nullable: false })
    id?: string
    @Field({ nullable: true })
    uri?: string
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
