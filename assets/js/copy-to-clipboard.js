const snippets = document.querySelectorAll('.snippet');

snippets.forEach((snippet) => {
	const button = document.createElement('button');
	button.textContent = 'Copy';
	button.setAttribute('aria-label', 'Copy code snippet');
	button.classList.add('copy-button');
	snippet.appendChild(button);

	button.addEventListener('click', (event) => {
		copyToClipboard(event, snippet);
	});
});

async function copyToClipboard(event, parentElement) {
	if (!event.target.matches('.copy-button')) {
		return;
	}

	const code = parentElement.querySelector('code').textContent;

	try {
		await navigator.clipboard.writeText(code);
		event.target.textContent = 'Copied!';
	}
	catch (err) {
		event.target.textContent = 'Failed to copy!';
	}

	setTimeout(() => {
		event.target.textContent = 'Copy';
	}, 2000);
}