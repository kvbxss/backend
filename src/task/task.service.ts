import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './models/task.schema';
import { CreateTaskInput, UpdateTaskInput } from './dtos/index';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async create(input: CreateTaskInput): Promise<Task> {
    return this.taskModel.create(input);
  }

  async update(id: string, input: UpdateTaskInput): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      { completed: input.completed },
      { new: true },
    );
    if (!updatedTask) {
      throw new Error(`Task with id ${id} not found`);
    }
    return updatedTask;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.taskModel.findByIdAndDelete(id);
    return !!result;
  }
}
