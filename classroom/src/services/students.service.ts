import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateStudentParams {
  authUserId: string;
}

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.student.findMany();
  }

  async getStudentById(id: string) {
    return await this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  async getStudentByAuthUserId(authUserId: string) {
    return await this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  async createStudent({ authUserId }: CreateStudentParams) {
    return await this.prisma.student.create({
      data: {
        authUserId,
      },
    });
  }
}
