const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const stamptime = document.getElementById('stamptime');

//1-function toggle video
function toggleVideo() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
};

//2-function updateIcon
function updateIcon() {
    if (video.paused) {
        play.innerHTML = '<i class="fas fa-play fa-2x"></i>';
    } else {
        play.innerHTML = '<i class="fas fa-pause fa-2x"></i>'
    }
};




//3- function update progress
function updateProgress() {
    progress.value = video.currentTime / video.duration * 100;

    //update timestamp
    let minutes = Math.floor(video.currentTime / 60);
    if (minutes < 10) {
        minutes = `0${minutes}`;

    }
    let seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10) {
        seconds = `0${seconds}`;

    }
    timestamp.innerHTML = `${minutes}:${seconds}`;


};


//4- function to stop video
function stopVideo() {
    video.pause();
    video.currentTime = 0;

};

//5- Set progress
function setProgress() {
    video.currentTime = progress.value * video.duration / 100;
};

//Eventlistners
//1-video element- click to play or pause a video
video.addEventListener('click', toggleVideo);

//2-video element- pause to toggle play icon to pause icon
video.addEventListener('pause', updateIcon);

//3-video element- play to toggle pause icon to play icon
video.addEventListener('play', updateIcon);

//4-video element- update progress bar and timestamp
video.addEventListener('timeupdate', updateProgress);

//5- Play button -click to play or pause video
play.addEventListener('click', toggleVideo);

//6- Stop button -click to pause or reset video
stop.addEventListener('click', stopVideo);

//7- Progress bar- change position to cahange time of playback
progress.addEventListener('change', setProgress);