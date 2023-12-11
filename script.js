document.addEventListener("DOMContentLoaded", function () {
  let progress = document.getElementById("progress");
  let song = document.getElementById("song");
  let ctrlIcon = document.getElementById("ctrlIcon");
  let playPauseBtn = document.getElementById("playPauseBtn");

  song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
  };

  playPauseBtn.addEventListener("click", function () {
    if (ctrlIcon.classList.contains("fa-pause")) {
      song.pause();
      ctrlIcon.classList.remove("fa-pause");
      ctrlIcon.classList.add("fa-play");
    } else {
      song.play();
      ctrlIcon.classList.add("fa-pause");
      ctrlIcon.classList.remove("fa-play");
    }
  });

  setInterval(() => {
    if (!song.paused) {
      progress.value = song.currentTime;
    }
  }, 500);

  progress.addEventListener("input", function () {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  });
});
