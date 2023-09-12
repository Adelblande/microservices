import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Enrollment } from '../models/enrollment';
import { EnrollmentsService } from 'src/services/enrollments.service';
import { CoursesService } from 'src/services/courses.service';
import { StudentsService } from 'src/services/students.service';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
  ) {}

  @Query(() => [Enrollment])
  findAllEnrollment() {
    return this.enrollmentsService.findAll();
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.getCourseById(enrollment.courseId);
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.getStudentById(enrollment.studentId);
  }
}
