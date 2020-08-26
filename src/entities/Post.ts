import { Entity, Property, PrimaryKey } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";

//type-graphql type <> mikro-orm type : you have to attach type-graphql type
@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: "text" })
  title!: string;
}
