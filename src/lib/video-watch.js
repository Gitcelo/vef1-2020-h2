import {
  fetchVideos, search, timeStamp, goToVideo,
} from './videos';
import { el, element, formatTime } from './utils';

function setTime(time) {
  const myVideo = document.getElementById('myVideo');

  myVideo.currentTime += time;
}

function playToggle() {
  const myVideo = document.getElementById('myVideo');
  const play = document.getElementById('play');
  const pause = document.getElementById('pause');

  if (myVideo.paused) myVideo.play();
  else myVideo.pause();

  play.classList.toggle('button__active');
  pause.classList.toggle('button__active');
}

function soundToggle() {
  const myVideo = document.getElementById('myVideo');
  const mute = document.getElementById('mute');
  const unmute = document.getElementById('unmute');

  if (myVideo.muted) myVideo.muted = false;
  else myVideo.muted = true;

  mute.classList.toggle('button__active');
  unmute.classList.toggle('button__active');
}

function fullScreen() {
  const myVideo = document.getElementById('myVideo');
  myVideo.requestFullscreen();
}

export async function displayVideo() {
  const data = await fetchVideos();

  let videoID = window.location.href;
  videoID = videoID.split('?')[1];
  videoID = videoID.split('&')[0];
  videoID = videoID.split('=')[1];
  videoID = Number(videoID);

  // let videoID = Number(/\?id=([^\?]+)/.exec(window.location.href)[1]);

  const video = await search(videoID, data.videos);
  console.log(video);

  const body = document.querySelector('body');

  const tengdMyndbond = element('section', { class: 'video row' }, null,
    element('h2', { class: 'col' }, null, 'Tengd myndbönd'));

  video.related.forEach((id) => {
    const value = search(id, data.videos);
    const daughter = element('div', { class: 'col col-4 col-12-sm video-card' }, { click: () => { goToVideo(value.id); } },
      element('div', { class: 'video-thumbnail' }, null,
        element('img', { class: 'video-image', src: value.poster, alt: '' }, null, 'hehe'),
        element('div', { class: 'video-timestamp' }, null, timeStamp(value.duration))),
      element('div', { class: 'video-info' }, null,
        element('h3', { class: 'video-name' }, null, value.title),
        element('p', { class: 'video-uploadtime' }, null, formatTime(value.created))));
    tengdMyndbond.appendChild(daughter);
  });

  body.appendChild(
    el('main',
      element('section', { class: 'video-view grid' }, null,
        el('h1', video.title),
        element('video', { id: 'myVideo' }, null,
          element('source', { src: video.video, type: 'video/mp4' }, null, ' ')),
        element('div', { class: 'video-controls' }, null,
          element('button', { class: 'video-controls__button' }, { click: () => { setTime(-3); } },
            element('img', { class: 'video-controls__img', src: 'img/back.svg', id: 'rewind' }, null, ' ')),
          element('button', { class: 'video-controls__button' }, { click: playToggle },
            element('img', { class: 'video-controls__img', src: 'img/play.svg', id: 'play' }, null, ' '),
            element('img', { class: 'video-controls__img button__active', src: 'img/pause.svg', id: 'pause' }, null, ' ')),
          element('button', { class: 'video-controls__button' }, { click: soundToggle },
            element('img', { class: 'video-controls__img button__active', src: 'img/unmute.svg', id: 'unmute' }, null, ' '),
            element('img', { class: 'video-controls__img', src: 'img/mute.svg', id: 'mute' }, null, ' ')),
          element('button', { class: 'video-controls__button' }, { click: fullScreen },
            element('img', { class: 'video-controls__img', src: 'img/fullscreen.svg', id: 'fullScreen' }, null, ' ')),
          element('button', { class: 'video-controls__button' }, { click: () => { setTime(3); } },
            element('img', { class: 'video-controls__img', src: 'img/next.svg', id: 'forward' }, null, ' '))),
        element('div', { class: 'video-description' }, null,
          el('p', video.description))),
      element('div', { class: 'grid' }, null, tengdMyndbond)),
  );
  body.appendChild(
    el('footer',
      element('a', { href: 'index.html' }, null, 'Til baka')),
  );

  document.getElementById('myVideo').addEventListener('ended', () => {
    document.getElementById('pause').classList.add('button__active');
    document.getElementById('play').classList.remove('button__active');
  });
}
