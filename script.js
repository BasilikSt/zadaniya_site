document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("tasks");
  if (!container) return;

  try {
    const res = await fetch("/tasks/");
    const files = await res.json(); // GitHub Pages / Netlify отдают список

    const tasks = await Promise.all(
      files.map(f => fetch(`/tasks/${f.name}`).then(r => r.json()))
    );

    tasks
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach(task => {
        const div = document.createElement("div");
        div.className = "task";

        div.innerHTML = `
          <div class="task-date">${task.date}</div>
          <div class="task-title">${task.title}</div>
          ${task.file ? `<a href="${task.file}" download>Скачать</a>` : ""}
        `;

        container.appendChild(div);
      });

  } catch {
    container.innerHTML = "<p>Заданий пока нет</p>";
  }
});

