import { fetchVideos, search, timeStamp, goToVideo } from './videos';
import { el, element } from './utils'



function rewind() {
  let myVideo = document.getElementById('myVideo');
  t = myVideo.currentTime;
  if (t < 3) 
    myVideo.currentTime = 0;
  else
    myVideo.currentTime = t - 3;
}

function playToggle() {
  let myVideo = document.getElementById("myVideo");
  let play = document.getElementById("play");
  let pause = document.getElementById("pause");

  if (myVideo.paused) {
    myVideo.play(); 
  }
  else {
    myVideo.pause(); 
  }
  play.classList.toggle('button__active');
  pause.classList.toggle('button__active');
}


function soundToggle() {

  let myVideo = document.getElementById('myVideo');
  let mute = document.getElementById('mute');
  let parent = mute.parentNode;
  if (myVideo.muted) {
    myVideo.muted = false; 
    parent.removeChild(parent.firstChild);
    parent.appendChild(element('img', { 'class':'video-controls__img', 'src':'img/unmute.svg', 'id': 'mute'}, null, ' '));
  }
  else {
    myVideo.muted = true;
    parent.removeChild(parent.firstChild);
    parent.appendChild(element('img', { 'class':'video-controls__img', 'src':'img/mute.svg', 'id': 'mute'}, null, ' '));
  }
}

function fullScreen() {
  let myVideo = document.getElementById('myVideo');
  myVideo.requestFullscreen();
}

function fastForward() {
  let myVideo = document.getElementById('myVideo');
  myVideo.currentTime = myVideo.currentTime + 3;
}

export async function displayVideo() {
  let data = await fetchVideos();
  let videoID = Number(/\?id=([^\?]+)/.exec(window.location.href)[1]);
  let video = await search(videoID, data.videos);
  console.log(video);

  let body = document.querySelector('body');

  let tengdMyndbond = element('section', {'class':'video row'}, null,
    element('h2', {'class': 'col'}, null, 'Tengd myndbönd')
  );

  video.related.forEach(id => {
    const value = search(id, data.videos);
    const daughter =
      element('div', { 'class': 'col col-4 col-12-sm video-card'}, { click: () => { goToVideo(value.id)} },
        element('div', { 'class': 'video-thumbnail' }, null,
          element('img', { 'class': 'video-image', 'src': value.poster, 'alt': ''}, null, 'hehe'),
          element('div', { 'class': 'video-timestamp' }, null, timeStamp(value.duration))
          ),
        element('div', { 'class': 'video-info' }, null,
          element('h3', { 'class': 'video-name'}, null, value.title),
          element('p', { 'class': 'video-uploadtime'}, null, `${value.created}`)
          )
        )
    ;
    tengdMyndbond.appendChild(daughter);
  });

  body.appendChild(
    el('main',
      element('section', { 'class': 'video-view grid' }, null, 
        el('h1', video.title),
        element('video', {'id': 'myVideo'}, null,
          element('source', { 'src': video.video, 'type': 'video/mp4' }, null, ' ')
        ),
        element('div', { 'class': 'video-controls' }, null,
          element('button', { 'class': 'video-controls__button' }, {click : rewind },
            element('img', { 'class':'video-controls__img', 'src':'img/back.svg', 'id': 'rewind'}, null, ' ')
          ),
          element('button', { 'class': 'video-controls__button' }, {click : playToggle },
            element('img', { 'class':'video-controls__img', 'src':'img/play.svg', 'id': 'play'}, null, " "),
            element('img', { 'class':'video-controls__img button__active', 'src':'img/pause.svg', 'id': 'pause'}, null, " ")
          ),
          element('button', { 'class': 'video-controls__button' }, {click : soundToggle },
            element('img', { 'class':'video-controls__img button__active', 'src':'img/unmute.svg', 'id': 'unmute'}, null, " "),
            element('img', { 'class':'video-controls__img', 'src':'img/mute.svg', 'id': 'mute'}, null, " ")
          ),
          element('button', { 'class': 'video-controls__button' }, {click : fullScreen },
            element('img', { 'class':'video-controls__img', 'src':'img/fullscreen.svg', 'id': 'fullScreen'}, null, ' ')
          ),
          element('button', { 'class': 'video-controls__button' }, {click : fastForward },
            element('img', { 'class':'video-controls__img', 'src':'img/next.svg', 'id': 'forward'}, null, ' ')
          )
        ),
        element('div', { 'class':'video-description'}, null, 
          el('p', video.description)
        )
      ),
      element('div', { 'class':'grid'}, null, tengdMyndbond)
    )
  );
  body.appendChild(
    el('footer', 
      element('a', { 'href':'index.html' }, null, 'Til baka')
    )
  );
  
  document.getElementById('myVideo').addEventListener('ended', () => {
    document.getElementById('pause').classList.add('button__active');
    document.getElementById('play').classList.remove('button__active');
  });
}