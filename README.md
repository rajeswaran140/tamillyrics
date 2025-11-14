# Tamil Lyrics Music Player 🎵

A high-performance, Spotify-inspired music player for Tamil lyrics with beautiful animations, optimized rendering, and professional features.

## 🎵 **Main Player** (`index.html`)

The main player features a professional Spotify-style interface with:
- **Full playlist management** with track listing
- **Advanced playback controls** (play, pause, previous, next)
- **Shuffle & Repeat modes** for flexible listening
- **Live search** to filter songs
- **Dark theme** with professional UI
- **State persistence** - remembers your preferences
- **Mobile responsive** design

### Alternative: Simple Player (`simple.html`)
A minimalist single-song player is also available for basic playback needs.

📖 **[Read Full Documentation →](SPOTIFY_README.md)**

## ✨ Features

- 🎵 Professional Spotify-inspired interface
- 🎨 Animated rotating album art with dynamic equalizer
- 📚 Playlist management (expandable for multiple songs)
- ⏮️ ⏯️ ⏭️ Full playback controls (previous, play/pause, next)
- 🔀 Shuffle mode with intelligent playback history
- 🔁 Three repeat modes (Off, Repeat All, Repeat One)
- 🔍 Live search to filter songs by title, artist, or lyricist
- 🎚️ Volume control with slider
- ⏱️ Progress bar with seek functionality and time display
- 💾 State persistence - remembers your position and preferences
- 📱 Fully responsive design for all devices
- ⚡ Optimized for 60fps performance
- 🎨 Dark theme with Spotify green accents
- 🖥️ Sidebar navigation with library access

## 🚀 Live Demo

[Your Amplify URL will appear here after deployment]

## 🎯 Performance Optimizations

This player has been heavily optimized for performance:

- **requestAnimationFrame** instead of setInterval for smooth 60fps animations
- **DOM caching** - elements queried once at startup
- **Throttled updates** - timeupdate events limited to 100ms intervals
- **GPU acceleration** - CSS3 3D transforms (rotate3d, scale3d)
- **Pre-generated colors** - color pool generated once, reused throughout
- **Proper cleanup** - prevents memory leaks on page unload
- **Optimized rendering** - will-change and CSS containment properties

## 📁 File Structure

```
tamillyrics/
├── Main Player
│   ├── index.html          # ⭐ Main Spotify-style player
│   ├── spotify-player.js   # Player logic and state management
│   └── spotify-style.css   # Spotify-themed dark styles
│
├── Alternative Players
│   ├── simple.html         # Minimalist single-song player
│   ├── audioPlayer.js      # Simple player logic
│   ├── style.css          # Simple player styles
│   └── songs.html         # Alternative player variant
│
├── Deployment
│   ├── amplify.yml        # AWS Amplify build config
│   ├── _redirects         # Amplify routing rules
│   ├── DEPLOYMENT.md      # Deployment guide
│   └── SPOTIFY_README.md  # Full documentation
│
├── Assets
│   ├── audio/
│   │   └── Vaasam1.mp3   # Audio file (13 MB)
│   └── image/
│       ├── Vaasam veesum100.jpg  # Album artwork
│       ├── Rajeswaran Image1.jpg
│       └── favicon.png
│
└── Documentation
    ├── README.md          # This file
    └── new.md            # Development notes
```

## 🛠️ Technologies Used

- **HTML5** - Audio API
- **Vanilla JavaScript** - No frameworks, pure performance
- **CSS3** - Animations, transforms, flexbox
- **Font Awesome 6.4** - Icons

## 📦 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed AWS Amplify deployment instructions.

### Quick Deploy to AWS Amplify

1. Fork this repository
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
3. Connect your GitHub repository
4. Select the branch and deploy
5. Your app will be live in ~2 minutes!

## 🎵 Song Information

**"வாசம் வீசும் பூங்காற்றே"**

- **Music Composer**: Kapileshwer
- **Lyrics Writer**: Rajeswaran
- **Singers**: Vijay TV's Super Singers - Siyad & Dhanyasri

## 🔧 Local Development

1. Clone the repository:
```bash
git clone https://github.com/rajeswaran140/tamillyrics.git
cd tamillyrics
```

2. Start a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

3. Open in your browser:
- **Main Player**: `http://localhost:8000/index.html` ⭐
- **Simple Player**: `http://localhost:8000/simple.html` (alternative)

**Note**: Use a local server instead of opening HTML files directly for the best experience (avoids CORS issues with audio files).

## 📊 Performance Metrics

| Metric | Value |
|--------|-------|
| Animation FPS | 60fps (requestAnimationFrame) |
| DOM Queries | Cached (0 per second) |
| Event Throttling | 100ms |
| CSS Animations | GPU-accelerated |
| Code Reduction | -356 lines (removed duplicates) |

## 🌟 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## 📄 License

Please ensure you have proper rights for the music and lyrics before deployment.

## 👨‍💻 Author

**Rajeswaran** - Lyrics Writer

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Made with ❤️ for Tamil Music**
