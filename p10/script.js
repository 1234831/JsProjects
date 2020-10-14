//Get the DOM elements
const musicContainer = document.getElementById('music-container');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const audio = document.getElementById('audio');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//Songs list
const songList = ['forget me',
    'khaab',
    'mn bichara qismat mara',
    'wakhra swag'
];

//Track which song is currently playing

let currentSong = 1;

//Update the song to the DOM

function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}
//function to play the song
function playSong() {
    musicContainer.classList.add('play');
    playButton.querySelector('i.fas').classList.remove('fa-play');
    playButton.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

//function to pause the song
function pauseSong() {
    musicContainer.classList.remove('play');
    playButton.querySelector('i.fas').classList.remove('fa-puase');
    playButton.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

//function to switch to previous song
function prevSong() {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songList.length - 1;
    }

    loadSong(songList[currentSong]);

    playSong();

}
//function to switch to next song
function nextSong() {
    currentSong++;
    if (currentSong > songList.length - 1) {
        currentSong = 0;
    }

    loadSong(songList[currentSong]);

    playSong();

}

//update the progress bar
function updateProgress(e) {
    const { currentTime, duration } = e.srcElement;
    const progressPercentage = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

//Set the progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const offsetX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (offsetX / width) * duration;
}

//Initial song load
loadSong(songList[currentSong]);

//Event listners
//1. Play button event listner
playButton.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

//2. Previous button event listner
prevButton.addEventListener('click', prevSong);

//3. next button event listner
nextButton.addEventListener('click', nextSong);

//4. update the time for song play

audio.addEventListener('timeupdate', updateProgress);

//5. update the time for song play based on click on progress container

progressContainer.addEventListener('click', setProgress);

//6. automatically play next song

audio.addEventListener('ended', nextSong);