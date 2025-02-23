import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class UpdateTaskInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  completed?: boolean;
}
