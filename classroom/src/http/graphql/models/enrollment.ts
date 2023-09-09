import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Student } from './student';

@ObjectType()
export class Enrollment {
  @Field(() => ID)
  id: string;

  @Field(() => Student)
  student: Student;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  canceledAt: Date;
}
