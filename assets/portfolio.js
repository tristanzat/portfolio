async function loadProjects() {
  const res = await fetch('assets/projects.json');
  const projects = await res.json();
  const highlighted = projects.filter(p => p.highlight);
  const others = projects.filter(p => !p.highlight);

  const highlightedDiv = document.getElementById('highlighted-projects');
  highlightedDiv.innerHTML = highlighted.map(project => `
    <div class="project-card">
      <h3><a href="${project.link}">${project.title}</a></h3>
      <p>${project.description}</p>
      <div class="tags">${project.tags.map(tag => `<span>${tag}</span>`).join(' ')}</div>
    </div>
  `).join('');

  const otherList = document.getElementById('other-projects');
  otherList.innerHTML = others.map(project => `
    <li><a href="${project.link}">${project.title}</a> &mdash; ${project.description}</li>
  `).join('');
}

function setLastUpdated() {
  const el = document.getElementById('last-updated');
  el.textContent = new Date(document.lastModified).toLocaleDateString();
}

document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  setLastUpdated();
});
