import { Query, Resolver } from '@nestjs/graphql';
import { Enrollment } from '../models/enrollment';
import { EnrollmentsService } from 'src/services/enrollments.service';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(private enrollmentsService: EnrollmentsService) {}

  @Query(() => [Enrollment])
  findAllEnrollment() {
    return this.enrollmentsService.findAll();
  }
}
