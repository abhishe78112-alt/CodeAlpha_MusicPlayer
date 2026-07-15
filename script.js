// ===================================
// ELEMENTS
// ===================================

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

const playlist = document.querySelectorAll("#playlist li");

const themeToggle = document.getElementById("themeToggle");

// ===================================
// SONG LIST
// ===================================

const songs = [

{
title:"Chill Vibes",
artist:"Mixkit",
src:"music/song1.mp3",
cover:"images/cover1.jpg"
},

{
title:"Dream Night",
artist:"Mixkit",
src:"music/song2.mp3",
cover:"images/cover2.jpg"
},

{
title:"Morning Energy",
artist:"Mixkit",
src:"music/song3.mp3",
cover:"images/cover3.jpg"
}

];

// ===================================
// VARIABLES
// ===================================

let currentSong = 0;

let isPlaying = false;

// ===================================
// LOAD SONG
// ===================================

function loadSong(index){

audio.src=songs[index].src;

cover.src=songs[index].cover;

title.innerHTML=songs[index].title;

artist.innerHTML=songs[index].artist;

playlist.forEach(item=>item.classList.remove("active"));

playlist[index].classList.add("active");

}

loadSong(currentSong);

// ===================================
// PLAY / PAUSE
// ===================================

function playMusic(){

audio.play();

isPlaying=true;

playBtn.innerHTML='<i class="fa-solid fa-pause"></i>';

}

function pauseMusic(){

audio.pause();

isPlaying=false;

playBtn.innerHTML='<i class="fa-solid fa-play"></i>';

}

playBtn.addEventListener("click",()=>{

if(isPlaying){

pauseMusic();

}else{

playMusic();

}

});

// ===================================
// NEXT
// ===================================

nextBtn.addEventListener("click",()=>{

currentSong++;

if(currentSong>=songs.length){

currentSong=0;

}

loadSong(currentSong);

playMusic();

});

// ===================================
// PREVIOUS
// ===================================

prevBtn.addEventListener("click",()=>{

currentSong--;

if(currentSong<0){

currentSong=songs.length-1;

}

loadSong(currentSong);

playMusic();

});

// ===================================
// PLAYLIST CLICK
// ===================================

playlist.forEach((item,index)=>{

item.addEventListener("click",()=>{

currentSong=index;

loadSong(currentSong);

playMusic();

});

});
// ===================================
// PROGRESS BAR
// ===================================

audio.addEventListener("timeupdate",()=>{

const progressPercent=(audio.currentTime/audio.duration)*100;

progress.value=progressPercent || 0;

current.innerHTML=formatTime(audio.currentTime);

duration.innerHTML=formatTime(audio.duration);

});

progress.addEventListener("input",()=>{

audio.currentTime=(progress.value/100)*audio.duration;

});

// ===================================
// FORMAT TIME
// ===================================

function formatTime(time){

if(isNaN(time)) return "0:00";

const min=Math.floor(time/60);

const sec=Math.floor(time%60);

return `${min}:${sec<10?"0"+sec:sec}`;

}

// ===================================
// VOLUME
// ===================================

volume.addEventListener("input",()=>{

audio.volume=volume.value/100;

});

// ===================================
// AUTO NEXT SONG
// ===================================

audio.addEventListener("ended",()=>{

currentSong++;

if(currentSong>=songs.length){

currentSong=0;

}

loadSong(currentSong);

playMusic();

});

// ===================================
// DARK MODE
// ===================================

const themeIcon=document.querySelector("#themeToggle i");

if(localStorage.getItem("theme")=="light"){

document.body.classList.add("light");

themeIcon.classList.remove("fa-moon");

themeIcon.classList.add("fa-sun");

}

themeToggle.addEventListener("click",()=>{

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){

themeIcon.classList.remove("fa-moon");

themeIcon.classList.add("fa-sun");

localStorage.setItem("theme","light");

}else{

themeIcon.classList.remove("fa-sun");

themeIcon.classList.add("fa-moon");

localStorage.setItem("theme","dark");

}

});

// ===================================
// KEYBOARD SUPPORT
// ===================================

document.addEventListener("keydown",(e)=>{

// Space = Play/Pause

if(e.code==="Space"){

e.preventDefault();

if(isPlaying){

pauseMusic();

}else{

playMusic();

}

}

// Right Arrow = Next

if(e.code==="ArrowRight"){

nextBtn.click();

}

// Left Arrow = Previous

if(e.code==="ArrowLeft"){

prevBtn.click();

}

});

// ===================================
// STARTUP MESSAGE
// ===================================

console.log("🎵 Premium Music Player Loaded Successfully");