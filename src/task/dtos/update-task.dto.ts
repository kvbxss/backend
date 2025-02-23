import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class UpdateTaskInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  @MaxLength(30)
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @Field({ nullable: true })
  completed?: boolean;
}
