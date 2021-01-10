const addBtn = document.querySelector('#add');

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes.length > 0) {
  notes.forEach(note => addNewNote(note));
}

addBtn.addEventListener('click', () => addNewNote());

function addNewNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');

  note.innerHTML = `
    <div class="tools">
        <button class="edit" >
            <i class="fas fa-edit"></i>
        </button>
        <button class="delete" >
            <i class="fas fa-trash-alt"></i>
        </button>
    </div>

    <div class="main ${text !== '' ? '' : 'hidden'}"></div>
    <textarea class="${text !== '' ? 'hidden' : ''}"></textarea>
  `;
  // text !== '' => class="main "
  // text === '' => class="main hidden"

  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');
  const main = note.querySelector('.main');
  const textarea = note.querySelector('textarea');

  textarea.value = text;
  main.innerHTML = marked(text);

  deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLS();
  });

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textarea.classList.toggle('hidden');
  });

  textarea.addEventListener('input', e => {
    main.innerHTML = marked(e.target.value);
    updateLS();
  });

  document.body.appendChild(note);
}

// localStorage : https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
// convert from object to string : JSON.stringify(object)
// convert from string to JSON : JSON.parse(dataFromLocalStorage)

function updateLS() {
  const notesText = document.querySelectorAll('textarea');

  const notes = [];

  notesText.forEach(note => notes.push(note.value));

  localStorage.setItem('notes', JSON.stringify(notes));
}
