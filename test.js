<audio id="song" src="path/to/audio/file.mp3"></audio>
<input id="progress" type="range" min="0" max="100" value="0" />
<button id="playPauseBtn"><i id="ctrlIcon" class="fa fa-play"></i></button>

<script>
  let progress = document.getElementById("progress");
  let song = document.getElementById("song");
  let ctrlIcon = document.getElementById("ctrlIcon");
  let playPauseBtn = document.getElementById("playPauseBtn");

  song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
  };

  function playPause() {
    if (song.paused) {
      song.play();
      ctrlIcon.classList.remove("fa-play");
      ctrlIcon.classList.add("fa-pause");
    } else {
      song.pause();
      ctrlIcon.classList.remove("fa-pause");
      ctrlIcon.classList.add("fa-play");
    }
  }

  playPauseBtn.addEventListener("click", playPause);

  if (song.play()) {
    setInterval(() => {
      progress.value = song.currentTime;
    }, 500);
  }

  progress.oninput = function () {
    song.currentTime = progress.value;
  };

  // Volume control
  let volumeInput = document.createElement("input");
  volumeInput.type = "range";
  volumeInput.min = 0;
  volumeInput.max = 1;
  volumeInput.step = 0.1;
  volumeInput.value = song.volume;

  volumeInput.oninput = function () {
    song.volume = volumeInput.value;
  };

  let volumeContainer = document.createElement("div");
  volumeContainer.appendChild(volumeInput);
  playPauseBtn.parentNode.insertBefore(volumeContainer, playPauseBtn.nextSibling);
</script>
