import { Query, Resolver } from '@nestjs/graphql';
import { Course } from '../models/course';
import { CoursesService } from 'src/services/courses.service';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private coursesService: CoursesService) {}

  @Query(() => [Course])
  findAllCourses() {
    return this.coursesService.findAll();
  }
}
