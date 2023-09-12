import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

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
}
