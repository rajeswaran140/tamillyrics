/**
 * Spotify-Like Music Player for Tamil Lyrics
 * Features:
 * - Multiple song playlist
 * - Previous/Next track controls
 * - Shuffle and Repeat modes
 * - Search/Filter functionality
 * - Time display and seeking
 * - Local storage for state persistence
 * - Optimized with requestAnimationFrame
 */

// Song Library
const songLibrary = [
	{
		id: 1,
		title: "வாசம் வீசும் பூங்காற்றே",
		artist: "Siyad & Dhanyasri",
		composer: "Kapileshwer",
		lyricist: "Rajeswaran",
		duration: 240, // seconds (will be updated from actual file)
		image: "/image/Vaasam veesum100.jpg",
		audio: "/audio/Vaasam1.mp3"
	}
	// Add more songs here as needed
];

// Player State
class MusicPlayer {
	constructor() {
		this.songs = songLibrary;
		this.currentIndex = 0;
		this.isPlaying = false;
		this.isShuffle = false;
		this.repeatMode = 'off'; // 'off', 'all', 'one'
		this.volume = 0.5;
		this.playHistory = [];
		this.shuffleQueue = [];

		this.initElements();
		this.loadState();
		this.attachEventListeners();
		this.loadSong(this.currentIndex);
		this.renderPlaylist();
		this.initEqualizer();
	}

	initElements() {
		this.elements = {
			song: document.getElementById('song'),
			playPauseBtn: document.getElementById('playPauseBtn'),
			playPauseIcon: document.getElementById('playPauseIcon'),
			prevBtn: document.getElementById('prevBtn'),
			nextBtn: document.getElementById('nextBtn'),
			shuffleBtn: document.getElementById('shuffleBtn'),
			repeatBtn: document.getElementById('repeatBtn'),
			progressBar: document.getElementById('progressBar'),
			volumeControl: document.getElementById('volumeControl'),
			currentTime: document.getElementById('currentTime'),
			totalTime: document.getElementById('totalTime'),
			songTitle: document.getElementById('songTitle'),
			songArtist: document.getElementById('songArtist'),
			songImage: document.getElementById('songImage'),
			playlist: document.getElementById('playlist'),
			searchInput: document.getElementById('searchInput'),
			equalizer: document.querySelector('.equalizer'),
			bars: document.querySelectorAll('.equalizer .bar'),
			// Player bar elements
			playerThumb: document.getElementById('playerThumb'),
			playerSongTitle: document.getElementById('playerSongTitle'),
			playerSongArtist: document.getElementById('playerSongArtist')
		};
	}

	loadState() {
		const savedState = localStorage.getItem('musicPlayerState');
		if (savedState) {
			const state = JSON.parse(savedState);
			this.currentIndex = state.currentIndex || 0;
			this.volume = state.volume || 0.5;
			this.isShuffle = state.isShuffle || false;
			this.repeatMode = state.repeatMode || 'off';
			this.elements.volumeControl.value = this.volume;
			this.elements.song.volume = this.volume;
		}
	}

	saveState() {
		const state = {
			currentIndex: this.currentIndex,
			volume: this.volume,
			isShuffle: this.isShuffle,
			repeatMode: this.repeatMode
		};
		localStorage.setItem('musicPlayerState', JSON.stringify(state));
	}

	attachEventListeners() {
		// Playback controls
		this.elements.playPauseBtn.addEventListener('click', () => this.togglePlay());
		this.elements.prevBtn.addEventListener('click', () => this.previousTrack());
		this.elements.nextBtn.addEventListener('click', () => this.nextTrack());
		this.elements.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
		this.elements.repeatBtn.addEventListener('click', () => this.toggleRepeat());

		// Audio events
		this.elements.song.addEventListener('play', () => this.updatePlayerState());
		this.elements.song.addEventListener('pause', () => this.updatePlayerState());
		this.elements.song.addEventListener('ended', () => this.handleSongEnd());
		this.elements.song.addEventListener('loadedmetadata', () => this.updateDuration());
		this.elements.song.addEventListener('timeupdate', () => this.updateProgress());

		// Progress and volume
		this.elements.progressBar.addEventListener('input', (e) => this.seek(e));
		this.elements.volumeControl.addEventListener('input', (e) => this.changeVolume(e));

		// Search
		this.elements.searchInput.addEventListener('input', (e) => this.searchSongs(e));

		// Cleanup
		window.addEventListener('beforeunload', () => {
			this.stopEqualizerAnimation();
			this.saveState();
		});
	}

	loadSong(index) {
		if (index < 0 || index >= this.songs.length) return;

		const song = this.songs[index];
		this.currentIndex = index;

		// Update audio source
		this.elements.song.src = song.audio;

		// Update main UI
		this.elements.songTitle.textContent = song.title;
		this.elements.songArtist.textContent = `Vijay TV's Super Singers: ${song.artist}`;
		this.elements.songImage.src = song.image;

		// Update credits if element exists
		const creditsDiv = document.querySelector('.song-credits');
		if (creditsDiv) {
			creditsDiv.innerHTML = `
				<p><strong>Music Composer:</strong> ${song.composer}</p>
				<p><strong>Lyrics Writer:</strong> ${song.lyricist}</p>
			`;
		}

		// Update player bar UI
		this.elements.playerThumb.src = song.image;
		this.elements.playerSongTitle.textContent = song.title;
		this.elements.playerSongArtist.textContent = song.artist;

		// Highlight current song in playlist
		this.highlightCurrentSong();

		// Save state
		this.saveState();
	}

	togglePlay() {
		if (this.elements.song.paused) {
			this.elements.song.play().catch(err => console.error('Playback error:', err));
		} else {
			this.elements.song.pause();
		}
	}

	previousTrack() {
		if (this.isShuffle && this.playHistory.length > 1) {
			this.playHistory.pop(); // Remove current
			const prevIndex = this.playHistory[this.playHistory.length - 1];
			this.loadSong(prevIndex);
		} else {
			const newIndex = (this.currentIndex - 1 + this.songs.length) % this.songs.length;
			this.loadSong(newIndex);
		}
		if (!this.elements.song.paused) {
			this.elements.song.play();
		}
	}

	nextTrack() {
		if (this.isShuffle) {
			const nextIndex = this.getRandomIndex();
			this.playHistory.push(nextIndex);
			this.loadSong(nextIndex);
		} else {
			const newIndex = (this.currentIndex + 1) % this.songs.length;
			this.loadSong(newIndex);
		}
		if (!this.elements.song.paused) {
			this.elements.song.play();
		}
	}

	handleSongEnd() {
		if (this.repeatMode === 'one') {
			this.elements.song.currentTime = 0;
			this.elements.song.play();
		} else if (this.repeatMode === 'all' || this.currentIndex < this.songs.length - 1) {
			this.nextTrack();
		} else {
			this.updatePlayerState();
		}
	}

	toggleShuffle() {
		this.isShuffle = !this.isShuffle;
		this.elements.shuffleBtn.classList.toggle('active', this.isShuffle);

		if (this.isShuffle) {
			this.playHistory = [this.currentIndex];
		} else {
			this.playHistory = [];
		}

		this.saveState();
	}

	toggleRepeat() {
		const modes = ['off', 'all', 'one'];
		const currentModeIndex = modes.indexOf(this.repeatMode);
		this.repeatMode = modes[(currentModeIndex + 1) % modes.length];

		this.elements.repeatBtn.classList.toggle('active', this.repeatMode !== 'off');
		this.elements.repeatBtn.setAttribute('data-mode', this.repeatMode);

		// Update icon based on mode
		const icon = this.elements.repeatBtn.querySelector('i');
		if (this.repeatMode === 'one') {
			icon.className = 'fa-solid fa-repeat-1';
		} else {
			icon.className = 'fa-solid fa-repeat';
		}

		this.saveState();
	}

	getRandomIndex() {
		let randomIndex;
		do {
			randomIndex = Math.floor(Math.random() * this.songs.length);
		} while (randomIndex === this.currentIndex && this.songs.length > 1);
		return randomIndex;
	}

	seek(e) {
		this.elements.song.currentTime = e.target.value;
	}

	changeVolume(e) {
		this.volume = e.target.value;
		this.elements.song.volume = this.volume;
		this.saveState();
	}

	updateProgress() {
		if (!this.progressUpdateThrottle) {
			this.progressUpdateThrottle = setTimeout(() => {
				this.elements.progressBar.value = this.elements.song.currentTime;
				this.elements.currentTime.textContent = this.formatTime(this.elements.song.currentTime);
				this.progressUpdateThrottle = null;
			}, 100);
		}
	}

	updateDuration() {
		const duration = this.elements.song.duration;
		this.elements.progressBar.max = duration;
		this.elements.totalTime.textContent = this.formatTime(duration);

		// Update song library with actual duration
		if (this.songs[this.currentIndex]) {
			this.songs[this.currentIndex].duration = duration;
		}
	}

	updatePlayerState() {
		const isPlaying = !this.elements.song.paused;
		this.isPlaying = isPlaying;

		if (isPlaying) {
			this.elements.playPauseIcon.classList.replace('fa-play', 'fa-pause');
			this.startEqualizerAnimation();
		} else {
			this.elements.playPauseIcon.classList.replace('fa-pause', 'fa-play');
			this.stopEqualizerAnimation();
		}
	}

	formatTime(seconds) {
		if (isNaN(seconds)) return '0:00';
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	renderPlaylist(songsToRender = this.songs) {
		this.elements.playlist.innerHTML = songsToRender.map((song, index) => `
			<div class="playlist-item ${index === this.currentIndex ? 'active' : ''}" data-index="${this.songs.indexOf(song)}">
				<div class="playlist-item-image">
					<img src="${song.image}" alt="${song.title}">
					<div class="play-overlay">
						<i class="fa-solid fa-play"></i>
					</div>
				</div>
				<div class="playlist-item-info">
					<div class="playlist-item-title">${song.title}</div>
					<div class="playlist-item-artist">${song.artist}</div>
				</div>
				<div class="playlist-item-duration">${this.formatTime(song.duration)}</div>
			</div>
		`).join('');

		// Add click listeners to playlist items
		document.querySelectorAll('.playlist-item').forEach(item => {
			item.addEventListener('click', () => {
				const index = parseInt(item.getAttribute('data-index'));
				this.loadSong(index);
				this.elements.song.play();
			});
		});
	}

	highlightCurrentSong() {
		document.querySelectorAll('.playlist-item').forEach((item, idx) => {
			const itemIndex = parseInt(item.getAttribute('data-index'));
			item.classList.toggle('active', itemIndex === this.currentIndex);
		});
	}

	searchSongs(e) {
		const query = e.target.value.toLowerCase();
		const filteredSongs = this.songs.filter(song =>
			song.title.toLowerCase().includes(query) ||
			song.artist.toLowerCase().includes(query) ||
			song.lyricist.toLowerCase().includes(query)
		);
		this.renderPlaylist(filteredSongs);
	}

	// Equalizer Animation (Optimized)
	initEqualizer() {
		this.animationFrameId = null;
		this.isAnimating = false;
		this.lastAnimationTime = 0;
		this.ANIMATION_INTERVAL = 500;

		// Pre-generate color pool
		this.colorPool = [];
		this.generateColorPool();
		this.colorizeEqualizerBars();
	}

	generateColorPool() {
		// Generate only green shades (Spotify green theme)
		// Base Spotify green: #1db954
		const greenShades = [
			'#1db954', // Spotify green
			'#1ed760', // Lighter green
			'#1aa34a', // Darker green
			'#17a047', // Medium dark green
			'#1fdf64', // Bright green
			'#169c46', // Forest green
			'#14833b', // Deep green
			'#1cd85e', // Vivid green
			'#18b04c', // Mid green
			'#1ec457', // Light mid green
			'#15923f', // Dark mid green
			'#1be75a', // Electric green
			'#13782f', // Dark forest green
			'#20f068', // Neon green
			'#12652a', // Very dark green
			'#1ccf5d', // Lime green
			'#1a8d42', // Olive green
			'#1db456', // Primary green
			'#16a044', // Sea green
			'#1fc960'  // Spring green
		];
		this.colorPool = greenShades;
	}

	getRandomColor() {
		return this.colorPool[Math.floor(Math.random() * this.colorPool.length)];
	}

	colorizeEqualizerBars() {
		this.elements.bars.forEach(bar => {
			bar.style.backgroundColor = this.getRandomColor();
		});
	}

	animateEqualizer(currentTime) {
		if (!this.isAnimating) return;

		if (currentTime - this.lastAnimationTime >= this.ANIMATION_INTERVAL) {
			this.elements.bars.forEach(bar => {
				const height = Math.random() * 60 + 10;
				bar.style.height = `${height}px`;
			});
			this.colorizeEqualizerBars();
			this.lastAnimationTime = currentTime;
		}

		this.animationFrameId = requestAnimationFrame((time) => this.animateEqualizer(time));
	}

	startEqualizerAnimation() {
		if (!this.isAnimating) {
			this.isAnimating = true;
			this.lastAnimationTime = performance.now();
			this.animationFrameId = requestAnimationFrame((time) => this.animateEqualizer(time));
		}
	}

	stopEqualizerAnimation() {
		this.isAnimating = false;
		if (this.animationFrameId !== null) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}
	}
}

// Initialize player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	window.musicPlayer = new MusicPlayer();
});
