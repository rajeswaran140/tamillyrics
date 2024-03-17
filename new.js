// document.addEventListener('DOMContentLoaded', function () {
// 	let song = document.getElementById('song');
// 	let playPauseIcon = document.getElementById('playPauseIcon');
// 	let equalizer = document.querySelector('.equalizer');
// 	let bars = document.querySelectorAll('.equalizer .bar');

// 	// Function to simulate equalizer animation
// 	function startEqualizerAnimation() {
// 		bars.forEach(bar => {
// 			// Generate a random height for each bar
// 			const height = Math.random() * 60 + 10;
// 			bar.style.height = height + 'px';
// 		});
// 	}

// 	// Function to update the play/pause icon and equalizer state
// 	function updatePlayerState() {
// 		if (song.paused) {
// 			playPauseIcon.classList.replace('fa-pause', 'fa-play');
// 			clearInterval(equalizerAnimationInterval); // Stop equalizer animation
// 		} else {
// 			playPauseIcon.classList.replace('fa-play', 'fa-pause');
// 			equalizerAnimationInterval = setInterval(startEqualizerAnimation, 500);
// 		}
// 	}

// 	// Play or pause the song and update UI accordingly
// 	function playPause() {
// 		if (song.paused) {
// 			song.play();
// 		} else {
// 			song.pause();
// 		}
// 		updatePlayerState();
// 	}

// 	// Initialize variables for the interval
// 	let equalizerAnimationInterval;

// 	song.addEventListener('play', () => {
// 		updatePlayerState();
// 	});

// 	song.addEventListener('pause', () => {
// 		updatePlayerState();
// 	});

// 	song.addEventListener('ended', () => {
// 		playPauseIcon.classList.replace('fa-pause', 'fa-play');
// 		clearInterval(equalizerAnimationInterval);
// 	});

// 	// Adjust volume control
// 	document
// 		.getElementById('volumeControl')
// 		.addEventListener('input', function (e) {
// 			song.volume = e.target.value;
// 		});

// 	// Initially stop the equalizer
// 	updatePlayerState();
// });

// function getRandomColor() {
// 	var letters = '0123456789ABCDEF';
// 	var color = '#';
// 	for (var i = 0; i < 6; i++) {
// 		color += letters[Math.floor(Math.random() * 16)];
// 	}
// 	return color;
// }

// // Function to apply random colors to each equalizer bar
// function colorizeEqualizerBars() {
// 	document.querySelectorAll('.equalizer .bar').forEach(bar => {
// 		bar.style.backgroundColor = getRandomColor();
// 	});
// }

// // Call the function to colorize bars on page load
// colorizeEqualizerBars();

// // Include in the updatePlayerState function or where the equalizer starts
// if (!song.paused) {
// 	colorizeEqualizerBars();
// }

// $(document).ready(function () {
// 	$('#progressBar').slider({
// 		range: 'min',
// 		min: 0,
// 		max: song.duration,
// 		slide: function (event, ui) {
// 			song.currentTime = ui.value;
// 		},
// 	});

// 	song.addEventListener('timeupdate', function () {
// 		$('#progressBar').slider('value', song.currentTime);
// 	});
// });

document.addEventListener('DOMContentLoaded', function () {
	let song = document.getElementById('song');
	let playPauseIcon = document.getElementById('playPauseIcon');
	let equalizer = document.querySelector('.equalizer');
	let bars = document.querySelectorAll('.equalizer .bar');
	let progressBar = document.getElementById('progressBar');
	let volumeControl = document.getElementById('volumeControl');

	// Function to generate a random color
	function getRandomColor() {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	// Function to apply random colors to each equalizer bar
	function colorizeEqualizerBars() {
		bars.forEach(bar => {
			bar.style.backgroundColor = getRandomColor();
		});
	}

	// Function to simulate equalizer animation
	function startEqualizerAnimation() {
		bars.forEach(bar => {
			const height = Math.random() * 60 + 10; // Random height between 10px and 70px
			bar.style.height = `${height}px`;
		});
		colorizeEqualizerBars(); // Colorize bars with each animation frame for dynamic effect
	}

	// Function to update the play/pause icon and equalizer state
	function updatePlayerState() {
		if (song.paused) {
			playPauseIcon.classList.replace('fa-pause', 'fa-play');
			clearInterval(equalizerAnimationInterval); // Stop equalizer animation
		} else {
			playPauseIcon.classList.replace('fa-play', 'fa-pause');
			equalizerAnimationInterval = setInterval(startEqualizerAnimation, 500); // Start equalizer animation
		}
	}

	// Play or pause the song and update UI accordingly
	function playPause() {
		if (song.paused) {
			song.play();
		} else {
			song.pause();
		}
		updatePlayerState();
	}

	let equalizerAnimationInterval;

	song.addEventListener('play', updatePlayerState);
	song.addEventListener('pause', updatePlayerState);
	song.addEventListener('ended', function () {
		playPauseIcon.classList.replace('fa-pause', 'fa-play');
		clearInterval(equalizerAnimationInterval); // Ensure equalizer stops at the end
	});

	// Initialize progress bar and update on song timeupdate
	progressBar.max = song.duration;
	progressBar.value = 0;

	song.addEventListener('timeupdate', function () {
		progressBar.value = song.currentTime;
	});

	progressBar.addEventListener('input', function () {
		song.currentTime = progressBar.value;
	});

	// Adjust volume control
	volumeControl.addEventListener('input', function (e) {
		song.volume = e.target.value;
	});

	// Initially colorize bars and update player state
	colorizeEqualizerBars();
	updatePlayerState();
});
