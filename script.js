document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("tasks");

  if (!container) {
    console.error("Контейнер #tasks не найден");
    return;
  }

  fetch("tasks.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Не удалось загрузить tasks.json");
      }
      return response.json();
    })
    .then(data => {
      container.innerHTML = "";

      const tasks = data.tasks || data;

      if (!Array.isArray(tasks)) {
        console.error("tasks.json имеет неверный формат");
        return;
      }

      tasks
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .forEach(task => {
          const div = document.createElement("div");
          div.className = "task";

          div.innerHTML = `
            <div class="task-date">${task.date ?? ""}</div>
            <div class="task-title">${task.title ?? "Без названия"}</div>
            ${
              task.file
                ? `<a href="${task.file}" download>Скачать файл</a>`
                : ""
            }
          `;

          container.appendChild(div);
        });
    })
    .catch(err => {
      console.error(err);
      container.innerHTML =
        "<p style='opacity:0.6'>Задания временно недоступны</p>";
    });
});
