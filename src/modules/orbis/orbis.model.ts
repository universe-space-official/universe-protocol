import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class Profile {
    @Field({ nullable: true })
    username?: string
    @Field({ nullable: true })
    description: string
}


@ObjectType()
export class Details {
    @Field({ nullable: false })
    did?: string
    @Field({ nullable: true })
    profile: Profile
}

@ObjectType()
export class Orbis {
    @Field({ nullable: false })
    did?: string
    @Field({ nullable: true })
    username?: string
    @Field({ nullable: true })
    details?: Details
    @Field({ nullable: true })
    address?: string
    @Field({ nullable: true })
    count_followers?: number
    @Field({ nullable: true })
    count_following?: number
    @Field({ nullable: true })
    last_activity_timestamp?: number
    @Field({ nullable: true })
    timestamp?: number
}

@ObjectType()
export class OrbisResponse {
    @Field({ nullable: true })
    code: number;

    @Field({ nullable: true })
    message?: string;

    @Field(() => [Orbis], { nullable: true })
    data?: any;
}
