import { nav } from './nav.js';
import { login } from '../functions.js';
import { clearPage, createFormGroup } from './util.js';

export function loadHomePage() {
	clearPage();
	nav('HOME', true);
	loginForm();
}

function loginForm() {
	const main = document.getElementById('page-main');

	const form = document.createElement('form');
	form.setAttribute('id', 'login-form');

	const userInput = document.createElement('input');
	userInput.setAttribute('type', 'text');
	userInput.setAttribute('name', 'username');

	const passInput = document.createElement('input');
	passInput.setAttribute('type', 'password');
	passInput.setAttribute('name', 'password');

	const submitBtn = document.createElement('button');
	submitBtn.textContent = 'LOGIN'

	form.append(
		createFormGroup(userInput),
		createFormGroup(passInput),
		submitBtn
	);

	form.addEventListener('submit', login);

	main.appendChild(form);
}
