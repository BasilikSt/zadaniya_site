fetch('tasks')
  .then(() => {
    fetchTasks();
  });

async function fetchTasks() {
  const response = await fetch('tasks/index.json');
  const tasks = await response.json();

  const container = document.getElementById('tasks');
  container.innerHTML = '';

  tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

  tasks.forEach(task => {
    const div = document.createElement('div');
    div.className = 'task';

    div.innerHTML = `
      <div class="task-date">${task.date}</div>
      <div class="task-title">${task.title}</div>
      <a href="${task.file}" download>Скачать</a>
    `;

    container.appendChild(div);
  });
}
