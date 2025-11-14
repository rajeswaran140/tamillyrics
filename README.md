# Tamil Lyrics Music Player 🎵

A high-performance, modern music player for Tamil lyrics with beautiful animations and optimized rendering.

## ✨ Features

- 🎵 Clean, responsive music player interface
- 🎨 Animated rotating album art
- 📊 Dynamic equalizer visualization with random colors
- 🔊 Volume control
- ⏯️ Play/pause controls
- ⏱️ Progress bar with seek functionality
- 📱 Mobile responsive design
- ⚡ Optimized for performance (60fps animations)

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
├── index.html              # Main player page
├── audioPlayer.js          # Optimized player logic
├── style.css              # Optimized styles
├── songs.html             # Alternative player (remote assets)
├── amplify.yml            # AWS Amplify build config
├── _redirects             # Amplify routing rules
├── audio/
│   └── Vaasam1.mp3        # Song file (13 MB)
└── image/
    ├── Vaasam veesum100.jpg
    ├── Rajeswaran Image1.jpg
    └── favicon.png
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

2. Open in browser:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Or simply open index.html in your browser
```

3. Navigate to `http://localhost:8000` in your browser

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
