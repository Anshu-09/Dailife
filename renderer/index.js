const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'tasks.json');

function loadTasks() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(raw || '[]');
    }
  } catch (e) {
    console.error('load error', e);
  }
  return [];
}

function saveTasks(tasks) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf8');
  } catch (e) {
    console.error('save error', e);
  }
}

const taskListEl = document.getElementById('taskList');
const newTaskEl = document.getElementById('newTask');
const addBtn = document.getElementById('addBtn');
const closeBtn = document.getElementById('closeBtn');

function render() {
  const tasks = loadTasks();
  taskListEl.innerHTML = '';
  tasks.forEach((t, idx) => {
    const li = document.createElement('li');
    li.className = t.done ? 'done' : '';
    const span = document.createElement('div');
    span.className = 'text';
    span.textContent = t.text;
    span.addEventListener('click', () => {
      tasks[idx].done = !tasks[idx].done;
      saveTasks(tasks);
      render();
    });
    li.addEventListener('dblclick', () => {
      tasks.splice(idx, 1);
      saveTasks(tasks);
      render();
    });
    li.appendChild(span);
    const meta = document.createElement('div');
    meta.style.marginLeft = '8px';
    meta.style.opacity = '0.8';
    meta.style.fontSize = '12px';
    meta.textContent = t.time || '';
    li.appendChild(meta);
    taskListEl.appendChild(li);
  });
}

addBtn.addEventListener('click', () => {
  const v = newTaskEl.value.trim();
  if (!v) return;
  const tasks = loadTasks();
  tasks.unshift({ text: v, done: false, time: new Date().toLocaleTimeString() });
  saveTasks(tasks);
  newTaskEl.value = '';
  render();
});

newTaskEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addBtn.click();
});

closeBtn.addEventListener('click', () => {
  const w = require('electron').remote.getCurrentWindow();
  w.close();
});

render();
