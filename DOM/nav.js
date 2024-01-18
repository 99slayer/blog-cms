import { loadPostPage } from "./post-page.js";
import { loadCreatePage } from "./create-page.js";
import { getPostList, logout } from "../functions.js";

export function nav(heading, home = false) {
	const nav = document.getElementById('page-nav');

	const header = document.createElement('h1');
	header.textContent = heading;

	if (home) {
		nav.append(header);
		return;
	};

	const logoutBtn = document.createElement('button');
	logoutBtn.textContent = 'LOGOUT';

	logoutBtn.addEventListener('click', logout);

	const postBtn = document.createElement('button');
	postBtn.textContent = 'POSTS';

	postBtn.addEventListener('click', async (e) => {
		loadPostPage(await getPostList());
	});

	const newPostBtn = document.createElement('button');
	newPostBtn.textContent = 'NEW POST';

	newPostBtn.addEventListener('click', loadCreatePage);

	nav.append(
		header,
		logoutBtn,
		postBtn,
		newPostBtn
	);
}