document.addEventListener('DOMContentLoaded', function () {
	function a() {
		let a = '#';
		for (let b = 0; 6 > b; b++)
			a += '0123456789ABCDEF'[Math.floor(16 * Math.random())];
		return a;
	}
	function b() {
		i.forEach(b => {
			b.style.backgroundColor = a();
		});
	}
	function c() {
		i.forEach(a => {
			const b = 60 * Math.random() + 10;
			a.style.height = `${b}px`;
		}),
			b();
	}
	function d() {
		f.paused
			? (g.classList.replace('fa-pause', 'fa-play'), clearInterval(e))
			: (g.classList.replace('fa-play', 'fa-pause'), (e = setInterval(c, 500)));
	}
	let e,
		f = document.getElementById('song'),
		g = document.getElementById('playPauseIcon'),
		h = document.querySelector('.equalizer'),
		i = document.querySelectorAll('.equalizer .bar'),
		j = document.getElementById('progressBar'),
		k = document.getElementById('volumeControl');
	f.addEventListener('play', d),
		f.addEventListener('pause', d),
		f.addEventListener('ended', function () {
			g.classList.replace('fa-pause', 'fa-play'), clearInterval(e);
		}),
		(j.max = f.duration),
		(j.value = 0),
		f.addEventListener('timeupdate', function () {
			j.value = f.currentTime;
		}),
		j.addEventListener('input', function () {
			f.currentTime = j.value;
		}),
		k.addEventListener('input', function (a) {
			f.volume = a.target.value;
		}),
		b(),
		d();
});
