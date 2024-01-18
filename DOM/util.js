export function clearPage() {
	const nav = document.getElementById('page-nav');
	const main = document.getElementById('page-main');
	nav.replaceChildren();
	main.replaceChildren();
};

export function createFormGroup(input) {
	const formGroup = document.createElement('div');
	formGroup.classList.add('form-group');

	input.classList.add('form-control');

	const label = document.createElement('label');
	label.setAttribute('for', input.getAttribute('name'));
	label.textContent = input.getAttribute('name').toUpperCase();

	formGroup.append(label, input);

	return formGroup;
}