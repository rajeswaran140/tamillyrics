/**
 * Optimized Audio Player for Tamil Lyrics
 * Performance improvements:
 * - Uses requestAnimationFrame instead of setInterval
 * - Caches DOM elements
 * - Pre-generates colors to reduce computation
 * - Proper cleanup of event listeners and animations
 */

document.addEventListener('DOMContentLoaded', function () {
	// Cache all DOM elements once
	const elements = {
		song: document.getElementById('song'),
		playPauseIcon: document.getElementById('playPauseIcon'),
		equalizer: document.querySelector('.equalizer'),
		bars: document.querySelectorAll('.equalizer .bar'),
		progressBar: document.getElementById('progressBar'),
		volumeControl: document.getElementById('volumeControl')
	};

	// Animation state
	let animationFrameId = null;
	let isAnimating = false;
	let lastAnimationTime = 0;
	const ANIMATION_INTERVAL = 500; // milliseconds between animation updates

	// Pre-generate a pool of random colors for better performance
	const colorPool = [];
	const COLOR_POOL_SIZE = 20;

	function generateColorPool() {
		const letters = '0123456789ABCDEF';
		for (let i = 0; i < COLOR_POOL_SIZE; i++) {
			let color = '#';
			for (let j = 0; j < 6; j++) {
				color += letters[Math.floor(Math.random() * 16)];
			}
			colorPool.push(color);
		}
	}

	// Get random color from pre-generated pool
	function getRandomColor() {
		return colorPool[Math.floor(Math.random() * COLOR_POOL_SIZE)];
	}

	// Apply random colors to equalizer bars
	function colorizeEqualizerBars() {
		elements.bars.forEach(bar => {
			bar.style.backgroundColor = getRandomColor();
		});
	}

	// Optimized equalizer animation using requestAnimationFrame
	function animateEqualizer(currentTime) {
		if (!isAnimating) return;

		// Throttle animation updates to ANIMATION_INTERVAL
		if (currentTime - lastAnimationTime >= ANIMATION_INTERVAL) {
			elements.bars.forEach(bar => {
				const height = Math.random() * 60 + 10; // Random height between 10px and 70px
				bar.style.height = `${height}px`;
			});
			colorizeEqualizerBars();
			lastAnimationTime = currentTime;
		}

		// Continue animation loop
		animationFrameId = requestAnimationFrame(animateEqualizer);
	}

	// Start equalizer animation
	function startEqualizerAnimation() {
		if (!isAnimating) {
			isAnimating = true;
			lastAnimationTime = performance.now();
			animationFrameId = requestAnimationFrame(animateEqualizer);
		}
	}

	// Stop equalizer animation with proper cleanup
	function stopEqualizerAnimation() {
		isAnimating = false;
		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}
	}

	// Update play/pause icon and equalizer state
	function updatePlayerState() {
		if (elements.song.paused) {
			elements.playPauseIcon.classList.replace('fa-pause', 'fa-play');
			stopEqualizerAnimation();
		} else {
			elements.playPauseIcon.classList.replace('fa-play', 'fa-pause');
			startEqualizerAnimation();
		}
	}

	// Play or pause the song
	window.playPause = function() {
		if (elements.song.paused) {
			elements.song.play();
		} else {
			elements.song.pause();
		}
	};

	// Event listeners for song state
	elements.song.addEventListener('play', updatePlayerState);
	elements.song.addEventListener('pause', updatePlayerState);
	elements.song.addEventListener('ended', function () {
		elements.playPauseIcon.classList.replace('fa-pause', 'fa-play');
		stopEqualizerAnimation();
	});

	// Progress bar initialization and updates
	elements.song.addEventListener('loadedmetadata', function() {
		elements.progressBar.max = elements.song.duration;
	});
	elements.progressBar.value = 0;

	// Throttled timeupdate for better performance
	let timeUpdateThrottle = null;
	elements.song.addEventListener('timeupdate', function () {
		if (!timeUpdateThrottle) {
			timeUpdateThrottle = setTimeout(() => {
				elements.progressBar.value = elements.song.currentTime;
				timeUpdateThrottle = null;
			}, 100); // Update every 100ms instead of every frame
		}
	});

	elements.progressBar.addEventListener('input', function () {
		elements.song.currentTime = elements.progressBar.value;
	});

	// Volume control
	elements.volumeControl.addEventListener('input', function (e) {
		elements.song.volume = e.target.value;
	});

	// Initialize
	generateColorPool();
	colorizeEqualizerBars();
	updatePlayerState();

	// Cleanup on page unload
	window.addEventListener('beforeunload', function() {
		stopEqualizerAnimation();
		if (timeUpdateThrottle) {
			clearTimeout(timeUpdateThrottle);
		}
	});
});
