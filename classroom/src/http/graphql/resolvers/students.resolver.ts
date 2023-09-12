import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { StudentsService } from 'src/services/students.service';
import { Student } from '../models/student';
import { EnrollmentsService } from 'src/services/enrollments.service';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Student])
  findAllStudents() {
    return this.studentsService.findAll();
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.getEnrollmentsByStudent(student.id);
  }
}
