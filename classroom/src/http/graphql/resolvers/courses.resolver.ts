import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Course } from '../models/course';
import { CoursesService } from 'src/services/courses.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateCourseInput } from '../inputs/create-course-input';
import { StudentsService } from 'src/services/students.service';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Course])
  findAllCourses() {
    return this.coursesService.findAll();
  }

  @UseGuards(AuthorizationGuard)
  @Query(() => Course)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentsService.getStudentByAuthUserId(user.sub);

    if (!student) {
      throw new Error('Student not found.');
    }

    const enrollment =
      await this.enrollmentsService.getEnrollmentsByCourseAndStudent({
        courseId: id,
        studentId: student.id,
      });

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return this.coursesService.getCourseById(id);
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Course)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesService.create(data);
  }
}
