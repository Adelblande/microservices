import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

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
      },
    });
  }
}
