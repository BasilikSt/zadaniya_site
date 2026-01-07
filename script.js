document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("tasks");
  const toggleBtn = document.getElementById("toggle-actual");
  const themeBtn = document.getElementById("theme-toggle");

  let showOnlyActual = false;
  let allTasks = [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /* ===== РЕНДЕР ===== */
  function renderTasks() {
    container.innerHTML = "";

    const visibleTasks = showOnlyActual
      ? allTasks.filter(task => new Date(task.date) >= today)
      : allTasks;

    if (visibleTasks.length === 0) {
      container.innerHTML = "<p class='empty'>Заданий нет ✨</p>";
      return;
    }

    visibleTasks.forEach((task, index) => {
      const card = document.createElement("div");
      card.className = "task";
      card.style.animationDelay = `${index * 0.05}s`;

      const actions = [];

      if (task.file) {
        actions.push(
          `<a href="${task.file}" download>📎 Файл</a>`
        );
      }

      if (task.link) {
        actions.push(
          `<a href="${task.link}" target="_blank">🔗 Ссылка</a>`
        );
      }

      card.innerHTML = `
        <div class="task-date">${task.date}</div>
        <div class="task-title">${task.title}</div>
        <div class="task-actions">
          ${actions.join("")}
        </div>
      `;

      container.appendChild(card);
    });
  }

  /* ===== ФИЛЬТР ===== */
  toggleBtn.addEventListener("click", () => {
    showOnlyActual = !showOnlyActual;

    toggleBtn.classList.toggle("active", showOnlyActual);
    toggleBtn.textContent = showOnlyActual
      ? "Показать все задания"
      : "Показать только актуальные";

    renderTasks();
  });

  /* ===== ТЕМА ===== */
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeBtn.textContent =
      document.body.classList.contains("dark") ? "☀️" : "🌙";
  });

  /* ===== ЗАГРУЗКА ДАННЫХ ===== */
  fetch("tasks.json")
    .then(res => {
      if (!res.ok) throw new Error("fetch error");
      return res.json();
    })
    .then(data => {
      allTasks = (data.tasks || []).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      renderTasks();
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p class='empty'>Не удалось загрузить задания</p>";
    });
});
