import { Query, Resolver } from '@nestjs/graphql';
import { StudentsService } from 'src/services/students.service';
import { Student } from '../models/student';

@Resolver()
export class StudentsResolver {
  constructor(private studentsService: StudentsService) {}

  @Query(() => [Student])
  findAllStudents() {
    return this.studentsService.findAll();
  }
}
