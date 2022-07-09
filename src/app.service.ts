import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './Task.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async getAllTasks() {
    return this.taskRepository.find();
  }

  async getTaskById(id: number) {
    return this.taskRepository.findOneBy({ id });
  }

  async doneTask(id: number) {
    const task = await this.getTaskById(id);
    if (!task) return null;

    task.isCompleted = !task.isCompleted;
    await this.taskRepository.save(task);
    return this.getAllTasks();
  }

  async createTask(title: string) {
    const task = this.taskRepository.create({ title });
    await this.taskRepository.save(task);
    return this.getAllTasks();
  }

  async deleteTask(id: number) {
    const task = await this.getTaskById(id);
    if (!task) return null;

    await this.taskRepository.delete({ id });
    return this.getAllTasks();
  }
}
