document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('body');
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars-container';
  container.appendChild(starsContainer);

  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'loading';
  loadingDiv.textContent = 'Loading starred repositories...';
  starsContainer.appendChild(loadingDiv);

  fetch('events.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load events.json');
      }
      return response.json();
    })
    .then(events => {
      loadingDiv.remove();
      renderStars(events, starsContainer);
    })
    .catch(error => {
      loadingDiv.remove();
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error';
      errorDiv.textContent = 'Error loading repositories: ' + error.message;
      starsContainer.appendChild(errorDiv);
    });
});

function renderStars(events, container) {
  events.forEach(event => {
    const starItem = document.createElement('div');
    starItem.className = 'star-item';

    const title = document.createElement('h3');
    const link = document.createElement('a');
    link.href = event.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = event.repository;
    title.appendChild(link);

    const description = document.createElement('p');
    description.textContent = event.description;

    const date = document.createElement('div');
    date.className = 'star-date';
    const starredDate = new Date(event.starred_at);
    date.textContent = 'Starred on ' + starredDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    starItem.appendChild(title);
    starItem.appendChild(description);
    starItem.appendChild(date);
    container.appendChild(starItem);
  });
}
