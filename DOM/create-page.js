import { clearPage, createFormGroup } from './util.js';
import { nav } from './nav.js';
import { savePost } from '../functions.js';

export function loadCreatePage() {
	clearPage();
	nav('CREATE');
	postForm();
}

function postForm() {
	const main = document.getElementById('page-main');

	const form = document.createElement('form');
	form.setAttribute('id', 'create-form');

	const titleInput = document.createElement('input');
	titleInput.setAttribute('type', 'text');
	titleInput.setAttribute('name', 'title');
	titleInput.setAttribute('required', '');

	const textInput = document.createElement('textarea');
	textInput.setAttribute('name', 'text');
	textInput.setAttribute('required', '');

	const submitBtn = document.createElement('button');
	submitBtn.textContent = 'SAVE';

	form.append(
		createFormGroup(titleInput),
		createFormGroup(textInput),
		submitBtn
	);

	form.addEventListener('submit', savePost)

	main.appendChild(form);
}
