export const showList = (todos: any[]) =>
  `Ваш список задач: \n\n${todos
    .map(
      (todo, index) =>
        (todo.isCompleted ? '✅' : '🌀') + ` ${index + 1}. ${todo.title} \n\n`,
    )
    .join('')}`;
