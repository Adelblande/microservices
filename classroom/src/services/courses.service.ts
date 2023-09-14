import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateCourseInput } from 'src/http/graphql/inputs/create-course-input';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.course.findMany();
  }

  async getCourseById(id: string) {
    return await this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  async getCourseBySlug(slug: string) {
    return await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });
  }

  async create({ title, slug }: CreateCourseInput) {
    const slugCourse = slug ?? slugify(title, { lower: true });

    const courseWithSameSlug = await this.prisma.course.findUnique({
      where: {
        slug: slugCourse,
      },
    });

    if (courseWithSameSlug) {
      throw new Error('Another course with same slug already exists.');
    }

    return await this.prisma.course.create({
      data: {
        title,
        slug: slugCourse,
      },
    });
  }
}
