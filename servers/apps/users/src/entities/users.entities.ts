import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Field(() => [Avatar], { nullable: true })
  avatars?: Avatar[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @Column("simple-array", { default: [] })
  @Field(() => [String])
  roles: string[];
}

@ObjectType()
export class Avatar {
  @Field(() => ID)
  id: string;

  @Field()
  publicId: string;

  @Field()
  url: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
