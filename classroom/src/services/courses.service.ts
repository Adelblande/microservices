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

  async create({ title }: CreateCourseInput) {
    const slug = slugify(title, { lower: true });

    const courseWithSameSlug = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (courseWithSameSlug) {
      throw new Error('Another course with same slug already exists.');
    }

    return await this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
