import { Field, InputType, ObjectType } from '@nestjs/graphql';

export enum ProfileType {
  USER = 1,
  PROJECT = 2,
}

@ObjectType()
export class Profile {
  @Field()
  idprofile: string;

  @Field({ nullable: true })
  name?: string;

  @Field()
  type: ProfileType;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  ethereumAddress?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  discord_username?: string;

  @Field({ nullable: true })
  instagram_username?: string;

  @Field({ nullable: true })
  twitter_username?: string;

  @Field({ nullable: true })
  profile_image?: string;

  @Field({ nullable: true })
  banner_image?: string;

  @Field()
  created_at: Date;

  @Field()
  deleted_at: Date;

  @Field({ nullable: true })
  whitelist?: string;

  @Field()
  status: number;
}

@InputType()
export class ProfileInput {
  @Field({ nullable: false })
  provider: string;
}
