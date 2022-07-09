import {
  Ctx,
  Hears,
  InjectBot,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { actionButtons } from './app.buttons';
import { AppService } from './app.service';
import { showList } from './app.utils';
import { Context } from './context.interface';

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly appService: AppService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Что Вы хотите сделать?', actionButtons());
  }

  @Hears('📋 Мой список задач')
  async listTask(ctx: Context) {
    const tasks = await this.appService.getAllTasks();
    await ctx.reply(showList(tasks));
  }

  @Hears('📝 Добавить задачу')
  async createTask(ctx: Context) {
    await ctx.reply('Введите текст вашей задачи: ');
    ctx.session.type = 'create';
  }

  @Hears('✅ Завершить задачу')
  async doneTask(ctx: Context) {
    await ctx.reply('Какую задачу Вы хотите завершить?');
    await ctx.reply('Введите номер задачи: ');
    ctx.session.type = 'done';
  }

  @Hears('❌ Удалить задачу')
  async deleteTask(ctx: Context) {
    await ctx.reply('Какую задачу Вы хотите удалить?');
    await ctx.reply('Введите номер задачи: ');
    ctx.session.type = 'delete';
  }

  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    if (!ctx.session.type) return;

    if (ctx.session.type === 'create') {
      const tasks = await this.appService.createTask(message);
      await ctx.reply(showList(tasks));
    }

    if (ctx.session.type === 'done') {
      const tasks = await this.appService.doneTask(Number(message));
      if (!tasks) {
        await ctx.reply('Я не нашел такой задачи чтобы завершить 😕');
        return;
      }
      await ctx.reply(showList(tasks));
    }

    if (ctx.session.type === 'delete') {
      const tasks = await this.appService.deleteTask(Number(message));
      if (!tasks) {
        await ctx.reply('Я не нашел такой задачи чтобы удалить 😕');
        return;
      }
      await ctx.reply(showList(tasks));
    }
  }
}
