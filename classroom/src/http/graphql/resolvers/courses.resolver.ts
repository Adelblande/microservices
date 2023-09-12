import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Course } from '../models/course';
import { CoursesService } from 'src/services/courses.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { UseGuards } from '@nestjs/common';
import { CreateCourseInput } from '../inputs/create-course-input';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private coursesService: CoursesService) {}

  @Query(() => [Course])
  findAllCourses() {
    return this.coursesService.findAll();
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Course)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesService.create(data);
  }
}
