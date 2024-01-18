import { clearPage } from './util.js';
import { loadEditPage } from './edit-page.js';
import { nav } from './nav.js';
import { getPostDetail, publishPost } from '../functions.js';

export function loadPostPage(data) {
	clearPage();
	nav('POSTS');
	postCards(data);
};

function postCards(arr) {
	if (arr === undefined) return;
	if (arr.length < 1) return;

	const main = document.getElementById('page-main');
	const postList = document.createElement('div');
	postList.setAttribute('id', 'post-list');

	arr.forEach((post) => {
		let isPublished;
		const card = document.createElement('div');
		card.classList.add('card-wrapper');

		card.addEventListener('click', async (e) => {
			loadEditPage(await getPostDetail(post._id));
		});

		const title = document.createElement('h3')
		title.classList.add('card-title');
		title.textContent = post.title;

		const creator = document.createElement('p');
		creator.classList.add('card-creator');
		creator.textContent = post.creator.username

		const postDate = document.createElement('p');
		postDate.textContent = `DATE POSTED: ${post['posted_timestamp_formatted']}`;

		if (post.published) {
			isPublished = 'UNPUBLISH';
		} else {
			isPublished = 'PUBLISH';
		};

		const publishDate = document.createElement('p');
		publishDate.textContent = `DATE PUBLISHED: ${post['published_timestamp'] !== null ? post['published_timestamp_formatted'] : 'NOT PUBLISHED'}`;

		const publishBtn = document.createElement('button');
		publishBtn.setAttribute('type', 'button');
		publishBtn.classList.add('publish-button');
		publishBtn.textContent = isPublished;

		publishBtn.addEventListener('click', (e) => {
			publishPost(e, post._id);
		});

		card.append(
			title,
			creator,
			postDate,
			publishDate,
			publishBtn
		);

		postList.appendChild(card);
	});

	main.appendChild(postList);
};
