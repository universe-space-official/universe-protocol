import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ProfileType {
  USER = 1,
  PROJECT = 2
}

// @TODO: To add both userId and projectId
// timestamp wiithout timezone
@ObjectType()
export class Profile {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  idprofile: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field()
  @Column({ default: ProfileType.USER })
  type: ProfileType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  ethereumAddress?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  discord_username?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  instagram_username?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  twitter_username?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  profile_image?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  banner_image?: string;

  @Field()
  @Column({
    type: 'timestamp',
    default: new Date()
  })
  created_at: Date;

  @Field()
  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  whitelist?: string;

  @Field()
  @Column({ default: 2 })
  status: number;
}
