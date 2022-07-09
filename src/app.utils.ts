export const showList = (tasks: any[]) =>
  `Ваш список задач: \n\n${tasks
    .map(
      (tasks, index) =>
        (tasks.isCompleted ? '✅' : '🌀') +
        ` ${index + 1}. ${tasks.title} \n\n`,
    )
    .join('')}`;
