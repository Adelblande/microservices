import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface GetEnrollmentsByCourseAndStudentParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getEnrollmentsByStudent(studentId: string) {
    return await this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getEnrollmentsByCourseAndStudent({
    courseId,
    studentId,
  }: GetEnrollmentsByCourseAndStudentParams) {
    return await this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });
  }
}
