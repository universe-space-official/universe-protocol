import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Orbis {
    @Field({ nullable: false })
    did?: string
    @Field({ nullable: true })
    name?: string
    @Field({ nullable: true })
    bio?: string
    @Field({ nullable: true })
    followers?: number
    @Field({ nullable: true })
    following?: number
}
