import { Markup } from 'telegraf';

export function actionButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback('📋 Мой список задач', 'list'),
      Markup.button.callback('📝 Добавить задачу', 'create'),
      Markup.button.callback('✅ Завершить задачу', 'done'),
      Markup.button.callback('❌ Удалить задачу', 'delete'),
    ],
    {
      columns: 2,
    },
  );
}
