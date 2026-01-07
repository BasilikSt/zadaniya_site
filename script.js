fetch('tasks.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('tasks');
    container.innerHTML = '';

    const tasks = data.tasks || data;

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
  });
