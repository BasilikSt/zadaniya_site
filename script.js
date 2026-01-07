document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("tasks");
  const themeBtn = document.getElementById("theme-toggle");

  if (!container) return;

  /* ================== РЕНДЕР ================== */

  function render(tasks) {
    container.innerHTML = "";

    if (!tasks.length) {
      container.innerHTML = "<p>Заданий пока нет</p>";
      return;
    }

    /* группируем по предметам */
    const grouped = {};

    tasks.forEach(task => {
      const subject = task.subject || "Без предмета";
      if (!grouped[subject]) grouped[subject] = [];
      grouped[subject].push(task);
    });

    /* рисуем */
    Object.keys(grouped).forEach(subject => {
      const section = document.createElement("section");
      section.className = "subject";

      section.innerHTML = `
        <h2 class="subject-title">${subject}</h2>
      `;

      grouped[subject].forEach((task, index) => {
        const card = document.createElement("div");
        card.className = "task";
        card.style.animationDelay = `${index * 0.05}s`;

        const actions = [];

        /* несколько файлов */
        if (Array.isArray(task.files)) {
          task.files.forEach(file => {
            actions.push(`
              <a href="${file.url}" download>
                📎 ${file.name || "Файл"}
              </a>
            `);
          });
        }

        /* ссылка */
        if (task.link) {
          actions.push(`
            <a href="${task.link}" target="_blank">
              🔗 Ссылка
            </a>
          `);
        }

        card.innerHTML = `
          <div class="task-title">${task.title}</div>
          ${
            actions.length
              ? `<div class="task-actions">${actions.join("")}</div>`
              : ""
          }
        `;

        section.appendChild(card);
      });

      container.appendChild(section);
    });
  }

  /* ================== ЗАГРУЗКА ================== */

  fetch("tasks.json")
    .then(res => {
      if (!res.ok) throw new Error("Ошибка загрузки");
      return res.json();
    })
    .then(data => {
      render(data.tasks || []);
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p>Не удалось загрузить задания</p>";
    });

  /* ================== ТЕМА ================== */

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      themeBtn.textContent =
        document.body.classList.contains("dark") ? "☀️" : "🌙";
    });
  }
});

