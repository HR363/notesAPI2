import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './interfaces/note.interface';

@Injectable()
export class NotesService {
  private prisma = new PrismaClient();

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = await this.prisma.note.create({
      data: createNoteDto,
    });
    return note as Note;
  }

  async findAll(): Promise<Note[]> {
    return (await this.prisma.note.findMany()) as Note[];
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.prisma.note.findUnique({ where: { id } });
    if (!note) throw new NotFoundException('Note not found');
    return note as Note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.prisma.note.update({
      where: { id },
      data: updateNoteDto,
    });
    return note as Note;
  }

  async remove(id: number): Promise<void> {
    await this.prisma.note.delete({ where: { id } });
  }
}
