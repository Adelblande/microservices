import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { StudentsService } from 'src/services/students.service';
import { Student } from '../models/student';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';

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

  @UseGuards(AuthorizationGuard)
  @Query(() => Student)
  me(@CurrentUser() user: AuthUser) {
    return this.studentsService.getStudentByAuthUserId(user.sub);
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.getEnrollmentsByStudent(student.id);
  }
}
