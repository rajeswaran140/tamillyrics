# Tamil Lyrics - Spotify-Style Music Player 🎵

A fully-featured, Spotify-inspired music player built with vanilla JavaScript, HTML, and CSS. Optimized for performance with modern web APIs and beautiful UI/UX.

![Spotify Player](https://img.shields.io/badge/Version-2.0-brightgreen) ![Performance](https://img.shields.io/badge/Performance-Optimized-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🎵 Core Playback
- **Multi-song playlist** - Full playlist management with multiple tracks
- **Play/Pause controls** - Smooth playback control
- **Previous/Next track** - Navigate between songs
- **Shuffle mode** - Random playback with smart history
- **Repeat modes** - Off / Repeat All / Repeat One
- **Seek functionality** - Jump to any position in the track
- **Volume control** - Adjust playback volume

### 🎨 User Interface
- **Spotify-inspired design** - Dark theme with green accents
- **Sidebar navigation** - Easy access to playlists and library
- **Now Playing view** - Large album art with song information
- **Interactive playlist** - Click any song to play
- **Search functionality** - Filter songs by title, artist, or lyricist
- **Responsive design** - Works on desktop, tablet, and mobile
- **Animated equalizer** - Dynamic visualization during playback

### ⚡ Performance
- **requestAnimationFrame** - Smooth 60fps animations
- **DOM caching** - Elements queried once at startup
- **Throttled updates** - Optimized event handling
- **Local storage** - Persist player state across sessions
- **GPU acceleration** - Hardware-accelerated CSS animations
- **Lazy loading ready** - Prepared for large music libraries

## 📁 File Structure

```
tamillyrics/
├── spotify.html              # Main Spotify player page
├── spotify-player.js         # Player logic and state management
├── spotify-style.css         # Spotify-themed styles
├── index.html               # Original simple player
├── audioPlayer.js           # Original player logic
├── style.css                # Original styles
├── audio/
│   └── Vaasam1.mp3         # Audio files
└── image/
    ├── Vaasam veesum100.jpg # Album artwork
    └── favicon.png          # Site favicon
```

## 🚀 Quick Start

### Option 1: Open Directly
Simply open `spotify.html` in a modern web browser:
```bash
# Navigate to the project folder
cd tamillyrics

# Open in browser (macOS)
open spotify.html

# Open in browser (Linux)
xdg-open spotify.html

# Open in browser (Windows)
start spotify.html
```

### Option 2: Local Server
For the best experience, use a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Visit: http://localhost:8000/spotify.html
```

**Using Node.js:**
```bash
npx http-server

# Visit: http://localhost:8080/spotify.html
```

**Using PHP:**
```bash
php -S localhost:8000

# Visit: http://localhost:8000/spotify.html
```

## 🎯 How to Use

### Basic Playback
1. Click any song in the playlist to start playing
2. Use the **Play/Pause** button (⏯️) in the center controls
3. Navigate with **Previous** (⏮️) and **Next** (⏭️) buttons
4. Adjust volume with the slider in the bottom-right

### Advanced Features
- **Shuffle**: Click the shuffle button (🔀) to randomize playback
- **Repeat**: Click the repeat button (🔁) to cycle through:
  - Off → Repeat All → Repeat One → Off
- **Seek**: Drag the progress bar to jump to any part of the song
- **Search**: Type in the search box to filter songs by title, artist, or lyricist

### Keyboard Shortcuts (Coming Soon)
- `Space` - Play/Pause
- `→` - Next track
- `←` - Previous track
- `↑` - Volume up
- `↓` - Volume down

## 🎵 Adding Your Own Songs

Edit the `songLibrary` array in `spotify-player.js`:

```javascript
const songLibrary = [
	{
		id: 1,
		title: "Your Song Title",
		artist: "Artist Name",
		composer: "Composer Name",
		lyricist: "Lyricist Name",
		duration: 240, // Will auto-update from file
		image: "/image/your-album-art.jpg",
		audio: "/audio/your-song.mp3"
	},
	// Add more songs...
];
```

### Supported Audio Formats
- MP3 (recommended)
- WAV
- OGG
- AAC/M4A
- FLAC (browser-dependent)

### Image Requirements
- Format: JPG, PNG, WebP
- Recommended size: 500x500px or larger
- Square aspect ratio for best results

## 🎨 Customization

### Color Scheme
Edit CSS variables in `spotify-style.css`:

```css
:root {
	--bg-primary: #121212;      /* Main background */
	--bg-secondary: #181818;    /* Sidebar/player bar */
	--accent-color: #1db954;    /* Spotify green */
	--text-primary: #ffffff;    /* Main text */
	--text-secondary: #b3b3b3;  /* Secondary text */
}
```

### Layout
- Sidebar width: Line 38 in `spotify-style.css` (`grid-template-columns: 250px 1fr`)
- Player bar height: Line 363 (`height: 90px`)
- Album art size: Lines 216-217 (`width/height: 250px`)

## 📊 Performance Metrics

| Metric | Value | Optimization |
|--------|-------|--------------|
| Animation FPS | 60fps | requestAnimationFrame |
| DOM Queries | Cached | Single query at init |
| Event Throttling | 100ms | Throttled timeupdate |
| CSS Animations | GPU-accelerated | 3D transforms |
| State Persistence | LocalStorage | Automatic save |
| Memory Management | Optimized | Proper cleanup |

## 🔧 Technical Details

### Player State Management
The player maintains state using a class-based architecture:
```javascript
class MusicPlayer {
	- currentIndex    // Current song in playlist
	- isPlaying      // Playback state
	- isShuffle      // Shuffle mode
	- repeatMode     // Repeat mode (off/all/one)
	- volume         // Volume level (0-1)
	- playHistory    // Shuffle history
}
```

### Local Storage
Player state is automatically saved and restored:
- Current song position
- Volume level
- Shuffle/repeat preferences
- Restores on page reload

### Equalizer Animation
Uses optimized `requestAnimationFrame`:
- Throttled to 500ms intervals
- Pre-generated color pool
- GPU-accelerated rendering
- Automatic cleanup

## 🌐 Browser Support

| Browser | Minimum Version | Support |
|---------|----------------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Opera | 76+ | ✅ Full |
| Mobile Safari | iOS 14+ | ✅ Full |
| Chrome Mobile | 90+ | ✅ Full |

## 📱 Mobile Responsive

The player is fully responsive with optimized layouts for:
- **Desktop**: Full sidebar + main content layout
- **Tablet (768px)**: Collapsed sidebar, streamlined controls
- **Mobile (480px)**: Single-column layout, touch-optimized

## 🚀 Deployment

### AWS Amplify
The project is ready for AWS Amplify deployment:
1. Connect your Git repository
2. Amplify will detect `amplify.yml`
3. Deploy automatically
4. Access via `https://[app-id].amplifyapp.com`

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### Other Platforms
- **Netlify**: Drag & drop the folder
- **Vercel**: Import from Git
- **GitHub Pages**: Enable in repository settings
- **Firebase Hosting**: `firebase deploy`

## 🎯 Roadmap

### Planned Features
- [ ] Keyboard shortcuts
- [ ] Lyrics display sync
- [ ] Queue management
- [ ] Playlist creation/editing
- [ ] Like/favorite songs
- [ ] Audio visualization (waveform)
- [ ] Cross-fade between tracks
- [ ] Gapless playback
- [ ] Equalizer controls
- [ ] Theme customization
- [ ] Export/import playlists

### Future Enhancements
- [ ] Backend integration
- [ ] User authentication
- [ ] Cloud storage sync
- [ ] Social sharing
- [ ] Collaborative playlists
- [ ] Download for offline
- [ ] PWA (Progressive Web App)
- [ ] Desktop app (Electron)

## 🐛 Known Issues

1. **Safari autoplay**: Requires user interaction before first play
2. **iOS volume control**: iOS restricts volume control via JavaScript
3. **Large files**: Audio files >50MB may cause loading delays

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup
1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Credits

**Lyrics & Music**
- **Lyrics Writer**: Rajeswaran
- **Music Composer**: Kapileshwer
- **Singers**: Siyad & Dhanyasri (Vijay TV's Super Singers)

**Development**
- Built with ❤️ for Tamil Music
- Inspired by Spotify's design language
- Performance optimizations by Claude

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check the [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- Review the code comments for implementation details

## 🌟 Show Your Support

If you like this project, please give it a ⭐️ on GitHub!

---

**Made with 🎵 and ❤️ for Tamil Music Lovers**
