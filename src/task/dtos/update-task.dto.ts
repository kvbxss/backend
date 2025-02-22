import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  completed?: boolean;
}
