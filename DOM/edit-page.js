import { clearPage, createFormGroup } from './util.js';
import { nav } from './nav.js';
import { updatePost, deletePost } from '../functions.js';

export function loadEditPage(data) {
	clearPage();
	nav('EDIT');
	deleteButton(data);
	editForm(data);
}

function deleteButton(postData) {
	const main = document.getElementById('page-main');
	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete-button');
	deleteBtn.textContent = 'DELETE';

	deleteBtn.addEventListener('click', async (e) => {
		await deletePost(postData._id);
	});

	main.appendChild(deleteBtn);
}

function editForm(postData) {
	const main = document.getElementById('page-main');

	const form = document.createElement('form');
	form.setAttribute('id', 'edit-form');

	const titleInput = document.createElement('input');
	titleInput.setAttribute('type', 'text');
	titleInput.setAttribute('name', 'title');
	titleInput.setAttribute('value', postData.title);

	const textInput = document.createElement('textarea');
	textInput.setAttribute('name', 'text');
	textInput.textContent = postData.text;

	const submitBtn = document.createElement('button');
	submitBtn.textContent = 'SAVE';

	form.append(
		createFormGroup(titleInput),
		createFormGroup(textInput),
		submitBtn
	);

	form.addEventListener('submit', async (e) => {
		await updatePost(e, postData._id);
	});

	main.appendChild(form);
}