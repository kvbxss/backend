import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { TaskType, CreateTaskInput, UpdateTaskInput } from './dtos/index';

@Resolver(() => TaskType)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [TaskType])
  async tasks() {
    return this.taskService.findAll();
  }

  @Mutation(() => TaskType)
  async createTask(@Args('input') input: CreateTaskInput) {
    return this.taskService.create(input);
  }

  @Mutation(() => TaskType)
  async updateTask(@Args('input') input: UpdateTaskInput) {
    return this.taskService.update(input.id, input);
  }

  @Mutation(() => Boolean)
  async deleteTask(@Args('id') id: string) {
    return this.taskService.delete(id);
  }
}
