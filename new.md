<div class="music-player-enhanced">
    <nav>
        <div class="circle">
            <i class="fa-solid fa-angle-left"></i>
        </div>
        <div class="circle">
            <i class="fa-solid fa-bars"></i>
        </div>
    </nav>
    <div class="song-thumbnail">
        <img src="https://rajeswaran.co/wp-content/uploads/2024/03/Vaasam-veesum100.jpg" class="song-img" alt="Song Thumbnail" />
    </div>
    <div class="song-details">
        <h1 style="color: #000; font-size: 25px; line-height: 1.5; margin-bottom: 15px;">"வாசம் வீசும் பூங்காற்றே"</h1>
        <p>Music Composer: <strong>Kapileshwer.</strong></p>
        <p>Lyrics Writer: <strong>Rajeswaran.</strong></p>
        <p style="margin-bottom: 28px; line-height:1.6;">Vijay TV's Super Singers: <strong>Siyad & Dhanyasri.</strong></p>
    </div>
    <div class="audio-wrapper">
        <audio id="song" controls>
            <source src="https://rajeswaran.co/wp-content/uploads/2024/03/Vaasam1.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    </div>
    <div class="audio-controls">
        <button onclick="playPause()"><i class="fa-solid fa-play" id="playPauseIcon"></i></button>
    </div>
    <div class="equalizer stopped">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    </div>
</div>

<style>.music-player-enhanced {
    background: skyblue;
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border-radius: 2px 28px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.song-thumbnail {
    margin: 20px auto;
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 50%;
    border: 5px solid #fff;
    animation: rotateImage 20s linear infinite, moveSideWays 10s ease-in-out infinite alternate;
}

.song-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: zoomInOut 10s infinite alternate ease-in-out;
}

@keyframes rotateImage {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes zoomInOut {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

@keyframes moveSideWays {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-10px); }
}

.audio-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
}

.audio-controls button {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 2rem;
}

#volumeControl {
    -webkit-appearance: none;
    appearance: none;
    width: 100px;
    height: 8px;
    background: #fff;
    border-radius: 5px;
    cursor: pointer;
}

#volumeControl::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #000;
}

#volumeControl::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #000;
}

.equalizer {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 50px;
    margin-top: 20px;
}

.equalizer.stopped .bar {
  animation: none;
}

.bar {
    width: 5px;
    height: 20px;
    background: #fff;
    margin: 0 2px;
    animation: equalize 1s infinite ease-in-out;
}

@keyframes equalize {
    0%, 100% { height: 20px; }
    50% { height: 50px; }
}

/* Mobile responsiveness */
@media (max-width: 600px) {
    .music-player-enhanced {
        padding: 10px;
        max-width: 95%;
    }

    .song-thumbnail {
        width: 150px;
        height: 150px;
    }

    .song-details h1, .song-details p {
        font-size: 16px;
    }

    .audio-controls button {
        font-size: 1.5rem;
    }

    .equalizer {
        margin-top: 15px;
    }

    .equalizer .bar {
        width: 3px; /* Smaller bars on mobile */
    }

    .audio-controls {
        gap: 5px; /* Reduce space between controls */
    }

    #volumeControl {
        width: 80px; /* Adjust volume control width */
    }
}
</style>

<script>document.addEventListener("DOMContentLoaded", function() {
    let song = document.getElementById("song");
    let playPauseIcon = document.getElementById("playPauseIcon");
    let equalizer = document.querySelector(".equalizer");
    let bars = document.querySelectorAll(".equalizer .bar");

    // Function to simulate equalizer animation
    function startEqualizerAnimation() {
        bars.forEach(bar => {
            // Generate a random height for each bar
            const height = Math.random() * 60 + 10; 
            bar.style.height = height + 'px';
        });
    }

    // Function to update the play/pause icon and equalizer state
    function updatePlayerState() {
        if (song.paused) {
            playPauseIcon.classList.replace("fa-pause", "fa-play");
            clearInterval(equalizerAnimationInterval); // Stop equalizer animation
        } else {
            playPauseIcon.classList.replace("fa-play", "fa-pause");
            equalizerAnimationInterval = setInterval(startEqualizerAnimation, 500); 
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

    // Initialize variables for the interval
    let equalizerAnimationInterval;

    song.addEventListener("play", () => {
        updatePlayerState();
    });

    song.addEventListener("pause", () => {
        updatePlayerState();
    });

    song.addEventListener("ended", () => {
        playPauseIcon.classList.replace("fa-pause", "fa-play");
        clearInterval(equalizerAnimationInterval); 
    });

    // Adjust volume control
    document.getElementById("volumeControl").addEventListener("input", function(e) {
        song.volume = e.target.value;
    });

    // Initially stop the equalizer
    updatePlayerState();
});
</script>

  <script>// Function to generate a random color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to apply random colors to each equalizer bar
function colorizeEqualizerBars() {
    document.querySelectorAll(".equalizer .bar").forEach(bar => {
        bar.style.backgroundColor = getRandomColor();
    });
}

// Call the function to colorize bars on page load
colorizeEqualizerBars();

// Include in the updatePlayerState function or where the equalizer starts
if (!song.paused) {
    colorizeEqualizerBars(); 
}
</script>
