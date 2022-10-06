console.log('Welcome to Spotify');

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let next = document.getElementById('next');
let previous = document.getElementById('previous');
//Songs List
let songs = [{
        songName: 'Baarishein',
        filePath: 'songs/1.mp3',
        coverPath: 'covers/1.jpeg',
    },
    {
        songName: 'Darkhast',
        filePath: 'songs/2.mp3',
        coverPath: 'covers/2.jpeg',
    },
    {
        songName: 'Raabta',
        filePath: 'songs/3.mp3',
        coverPath: 'covers/3.jpeg',
    },
    {
        songName: 'Meherbaani',
        filePath: 'songs/4.mp3',
        coverPath: 'covers/4.jpeg',
    },
    {
        songName: 'Shukhran Allah',
        filePath: 'songs/5.mp3',
        coverPath: 'covers/5.jpeg',
    },
    {
        songName: 'Iktara',
        filePath: 'songs/6.mp3',
        coverPath: 'covers/6.jpeg',
    },
    {
        songName: 'Jeena Jeena',
        filePath: 'songs/7.mp3',
        coverPath: 'covers/7.jpeg',
    },
    {
        songName: 'Safarnama',
        filePath: 'songs/8.mp3',
        coverPath: 'covers/8.jpeg',
    },
    {
        songName: 'Qaafirana',
        filePath: 'songs/9.mp3',
        coverPath: 'covers/9.jpeg',
    },
    {
        songName: 'Nazm Nazm',
        filePath: 'songs/10.mp3',
        coverPath: 'covers/10.jpeg',
    },
];
songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});
//audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

//Listen to Event
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    //update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    if (myProgressBar.value === '100') {
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        myProgressBar.value = 0;
    }
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime =
        (myProgressBar.value * audioElement.duration) / 100;
    // console.log(audioElement.currentTime);
});

const makeAllPlays = () => {
    songItemPlay.forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};
songItemPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);

        if (audioElement.paused || audioElement.currentTime <= 0) {
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        } else {
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    });
});
next.addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
});
previous.addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 9;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3 `;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
});