document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("tasks");
  const themeBtn = document.getElementById("theme-toggle");

  /* ===== РЕНДЕР ===== */
  function renderTasks(tasks) {
    container.innerHTML = "";

    if (!tasks.length) {
      container.innerHTML = "<p class='empty'>Заданий нет ✨</p>";
      return;
    }

    tasks.forEach((task, index) => {
      const card = document.createElement("div");
      card.className = "task";
      card.style.animationDelay = `${index * 0.05}s`;

      let actions = "";

      if (task.file) {
        actions += `<a href="${task.file}" download>📎 Файл</a>`;
      }

      if (task.link) {
        actions += `<a href="${task.link}" target="_blank">🔗 Ссылка</a>`;
      }

      card.innerHTML = `
        <div class="task-title">${task.title}</div>
        ${actions ? `<div class="task-actions">${actions}</div>` : ""}
      `;

      container.appendChild(card);
    });
  }

  /* ===== ТЕМА ===== */
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeBtn.textContent =
      document.body.classList.contains("dark") ? "☀️" : "🌙";
  });

  /* ===== ЗАГРУЗКА ===== */
  fetch("tasks.json")
    .then(res => {
      if (!res.ok) throw new Error("fetch error");
      return res.json();
    })
    .then(data => {
      renderTasks(data.tasks || []);
    })
    .catch(() => {
      container.innerHTML =
        "<p class='empty'>Не удалось загрузить задания</p>";
    });
});
