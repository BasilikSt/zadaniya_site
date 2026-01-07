document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("tasks");
  if (!container) return;

  fetch("tasks.json")
    .then(r => r.json())
    .then(data => {
      const tasks = data.tasks || [];
      container.innerHTML = "";

      tasks
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .forEach(task => {
          const div = document.createElement("div");
          div.className = "task";

          div.innerHTML = `
            <div class="task-date">${task.date}</div>
            <div class="task-title">${task.title}</div>
            ${task.file ? `<a href="${task.file}" download>Скачать файл</a>` : ""}
          `;

          container.appendChild(div);
        });
    })
    .catch(() => {
      container.innerHTML = "<p>Пока заданий нет</p>";
    });
});
