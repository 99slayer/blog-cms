import { loadHomePage } from "./DOM/home-page.js";
import { loadPostPage } from "./DOM/post-page.js";

export async function login(e) {
	e.preventDefault();
	const formInput = new FormData(e.target).entries();
	try {
		const res = await loginFetch(formInput);

		if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

		const data = await res.json();
		const maxAge = (60 * 60 * 24) * 30;
		localStorage.setItem('username', data.username);
		localStorage.setItem('accessToken', data.accessToken);
		document.cookie = `refreshtoken=${data.refreshToken}; max-age=${maxAge}; path=/`;
		loadPostPage(await getPostList());
	} catch (error) {
		console.log(error);
	};
};

export async function logout() {
	console.log('logout');
	const res = await logoutFetch();
	localStorage.clear();
	document.cookie = 'refreshtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
	loadHomePage();
};

export async function getPostList() {
	try {
		const res = await postListFetch();

		if (!res.ok) throw new Error(
			`${res.status} ${res.statusText}`,
			{ cause: res.status }
		);

		const data = await res.json();
		return data.posts;
	} catch (error) {
		if (error.cause === 401) {
			await getToken();
			const res = await postListFetch();

			if (!res.ok) throw error;

			const data = await res.json();
			return data.posts;
		} else {
			console.log(error);
		}
	};
};

export async function getPostDetail(id) {
	try {
		const res = await postDetailFetch(id);

		if (!res.ok) throw new Error(
			`${res.status} ${res.statusText}`,
			{ cause: res.status }
		);

		const data = await res.json();
		return data.post;
	} catch (error) {
		if (error.cause === 401) {
			await getToken();
			const res = await postDetailFetch(id);

			if (!res.ok) throw error;

			const data = await res.json();
			return data.post;
		} else {
			console.log(error);
		}
	};
};

export async function savePost(e) {
	e.preventDefault();
	const rawInput = new FormData(e.target).entries();
	const input = JSON.stringify(Object.fromEntries(rawInput));

	try {
		const res = await savePostFetch(input);

		if (!res.ok) throw new Error(
			`${res.status} ${res.statusText}`,
			{ cause: res.status }
		);

		loadPostPage(await getPostList());
	} catch (error) {
		if (error.cause === 401) {
			await getToken();
			const res = await savePostFetch(input);

			if (!res.ok) throw error;

			loadPostPage(await getPostList());
		} else {
			console.log(error);
		}
	};
};

export async function publishPost(e, id) {
	e.stopPropagation();

	try {
		const res = await publishPostFetch(id);

		if (!res.ok) throw new Error(
			`${res.status} ${res.statusText}`,
			{ cause: res.status }
		);

		loadPostPage(await getPostList());
	} catch (error) {
		if (error.cause === 401) {
			await getToken();
			const res = await publishPostFetch(id);

			if (!res.ok) throw error;

			loadPostPage(await getPostList());
		} else {
			console.log(error);
		}
	};
};

export async function updatePost(e, id) {
	e.preventDefault();
	const rawInput = new FormData(e.target).entries();
	const input = JSON.stringify(Object.fromEntries(rawInput));

	try {
		const res = await updatePostFetch(id, input);

		if (!res.ok) throw new Error(
			`${res.status} ${res.statusText}`,
			{ cause: res.status }
		);

		loadPostPage(await getPostList());
	} catch (error) {
		if (error.cause === 401) {
			await getToken();
			const res = await updatePostFetch(id, input);

			if (!res.ok) throw error;

			loadPostPage(await getPostList());
		} else {
			console.log(error);
		}
	};
};

export async function deletePost(id) {
	try {
		const res = await deletePostFetch(id);

		if (!res.ok) throw new Error(
			`${res.status} ${res.statusText}`,
			{ cause: res.status }
		);

		loadPostPage(await getPostList());
	} catch (error) {
		if (error.cause === 401) {
			await getToken();
			const res = await deletePostFetch(id);

			if (!res.ok) throw error;

			loadPostPage(await getPostList());
		} else {
			console.log(error);
		}
	};
};

// ----------------------- FETCH FUNCTIONS ------------------------

async function loginFetch(input) {
	const res = await fetch('http://localhost:3000/api/users/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(Object.fromEntries(input))
	});

	return res;
};

async function logoutFetch() {
	const res = await fetch('http://localhost:3000/api/users/logout', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'RefreshToken': document.cookie
		}
	});

	return res;
};

async function postListFetch() {
	const res = await fetch('http://localhost:3000/api/posts', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			'RefreshToken': document.cookie
		},
	});

	return res;
};

async function postDetailFetch(id) {
	const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			'RefreshToken': document.cookie
		}
	});

	return res;
};

async function savePostFetch(input) {
	const res = await fetch('http://localhost:3000/api/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			'RefreshToken': document.cookie,
			'username': localStorage.getItem('username')
		},
		body: input
	});

	return res;
};

async function updatePostFetch(id, input) {
	const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			'RefreshToken': document.cookie
		},
		body: input
	});

	return res;
};

async function publishPostFetch(id) {
	const res = await fetch(`http://localhost:3000/api/posts/${id}/publish`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			'RefreshToken': document.cookie
		}
	});

	return res;
};

async function deletePostFetch(id) {
	const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			'RefreshToken': document.cookie
		}
	});

	return res;
};

// ----------------------- UTIL FUNCTIONS -------------------------

async function getToken() {
	console.log('Getting new access token.');
	const res = await fetch('http://localhost:3000/api/users/token', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'RefreshToken': document.cookie
		}
	});

	if (!res.ok) {
		console.log('Invalid refresh token.');
		await logout();
	} else {
		console.log('Accessed refreshed.');
		const data = await res.json();
		localStorage.setItem('accessToken', data.accessToken);
	}
};
