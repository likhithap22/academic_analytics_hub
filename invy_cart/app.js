const appsContainer = document.getElementById('apps');
const modal = document.getElementById('modal');
const previewFrame = document.getElementById('previewFrame');
const closeBtn = document.getElementById('closeBtn');
const notice = document.getElementById('notice');

async function loadApps() {
  const res = await fetch('/api/apps');
  const apps = await res.json();

  apps.forEach(app => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="https://logo.clearbit.com/${new URL(app.url).hostname}?size=80" alt="${app.name}">
      <h3>${app.name}</h3>
      <div>
        <button class="open-embed">Open Inside</button>
        <button class="open-new">Open in New Tab</button>
      </div>
    `;

    card.querySelector('.open-embed').addEventListener('click', () => openEmbed(app));
    card.querySelector('.open-new').addEventListener('click', () => window.open(app.url, '_blank'));
    appsContainer.appendChild(card);
  });
}

function openEmbed(app) {
  previewFrame.src = app.url;
  notice.textContent = "Loading... (Some sites may block embedding)";
  modal.setAttribute('aria-hidden', 'false');

  setTimeout(() => {
    notice.textContent = "If page doesn’t load, click 'Open in New Tab'.";
  }, 1500);
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  previewFrame.src = 'about:blank';
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

loadApps();
