const main = document.querySelector('main');

main.classList.add('show-progress-bar');
main.style.setProperty('--progress', '0%');

main.addEventListener('scroll', () => {
	const progress = Math.round((main.scrollTop / (main.scrollHeight - main.clientHeight)) * 100);
	main.style.setProperty('--progress', `${progress}%`);
});