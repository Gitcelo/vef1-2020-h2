import { element, formatTime } from './utils';

const info = './videos.json';
const URL = 'video.html?id=';

export async function fetchVideos() {
  let result;
  try {
    result = await fetch(info);
  } catch (e) {
    return null;
  }
  if (result.ok) {
    return result.json();
  }
  return null;
}

export function timeStamp(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}

export function search(video, videos) {
  for (let i = 0; i < videos.length; i += 1) {
    if (video === videos[i].id) return videos[i];
  }
  return null;
}

export function goToVideo(id) {
  window.location.href = `${URL}${id}`;
}

export async function makeVideos() {
  const data = await fetchVideos();
  if (data === null) {
    return;
  }
  const mum = document.querySelector('.grid');
  const elem = document.createElement('section');
  elem.setAttribute('class', 'video row');
  mum.appendChild(element('section', { class: 'video row' }, null, ''));
  const cat = data.categories;
  const videodata = data.videos;
  cat.forEach((category) => {
    elem.appendChild(element('h2', { class: 'col' }, null, category.title));
    const videocat = category.videos;
    videocat.sort((a, b) => a - b);
    videocat.forEach((videoid) => {
      const value = search(videoid, videodata);
      const daughter = element('div', { class: 'col col-4 col-12-sm video-card' }, null,
        element('div', { class: 'video-thumbnail' }, { click: () => { goToVideo(value.id); } },
          element('img', { class: 'video-image', src: value.poster, alt: '' }, null, ' '),
          element('div', { class: 'video-timestamp' }, null, timeStamp(value.duration))),
        element('div', { class: 'video-info' }, null,
          element('h3', { class: 'video-name' }, { click: () => { goToVideo(value.id); } }, value.title),
          element('p', { class: 'video-uploadtime' }, null, formatTime(value.created))));
      elem.appendChild(daughter);
    });
    elem.appendChild(element('hr', { class: 'video-linebrake' }, null, ' '));
  });
  mum.firstElementChild.appendChild(elem);
}
