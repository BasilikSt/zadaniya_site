document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("tasks");
  const toggleBtn = document.getElementById("toggle-actual");
  const themeBtn = document.getElementById("theme-toggle");

  let showOnlyActual = false;
  let allTasks = [];

  const today = new Date().setHours(0,0,0,0);

  function render() {
    container.innerHTML = "";

    const list = showOnlyActual
      ? allTasks.filter(t => new Date(t.date) >= today)
      : allTasks;

    list.forEach((task, i) => {
      const div = document.createElement("div");
      div.className = "task";
      div.style.animationDelay = `${i * 0.05}s`;

      div.innerHTML = `
        <div class="task-date">${task.date}</div>
        <div class="task-title">${task.title}</div>
        ${task.file ? `<a href="${task.file}" download>Скачать файл</a>` : ""}
      `;

      container.appendChild(div);
    });
  }

  toggleBtn.addEventListener("click", () => {
    showOnlyActual = !showOnlyActual;
    toggleBtn.classList.toggle("active", showOnlyActual);
    toggleBtn.textContent = showOnlyActual
      ? "Показать все задания"
      : "Показать только актуальные";
    render();
  });

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeBtn.textContent =
      document.body.classList.contains("dark") ? "☀️" : "🌙";
  });

  fetch("tasks.json")
    .then(r => r.json())
    .then(data => {
      allTasks = (data.tasks || []).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      render();
    })
    .catch(() => {
      container.innerHTML = "<p>Заданий пока нет</p>";
    });
});
