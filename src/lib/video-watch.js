import { fetchVideos, search, timeStamp } from './videos';
import { el, element } from './utils'


function rewind() {

}

function playToggle() {

}

function soundToggle() {

}

function fullScreen() {

}

function fastForward() {

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
      element('div', { 'class': 'col col-4 col-12-sm video-card'}, null,
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
        el('video',
          element('source', { 'src': video.video, 'type': 'video/mp4' }, null, ' ')
        ),
        element('div', { 'class': 'video-controls' }, null,
          element('button', { 'class': 'video-controls__button' }, {click : rewind },
            element('img', { 'class':'video-controls__img', 'src':'img/back.svg'}, null, " ")
          ),
          element('button', { 'class': 'video-controls__button' }, {click : playToggle },
            element('img', { 'class':'video-controls__img button__active', 'src':'img/pause.svg'}, null, " "),
            element('img', { 'class':'video-controls__img button__unactive', 'src':'img/play.svg'}, null, " ")
          ),
          element('button', { 'class': 'video-controls__button' }, {click : soundToggle },
            element('img', { 'class':'video-controls__img button__active', 'src':'img/unmute.svg'}, null, " "),
            element('img', { 'class':'video-controls__img button__unactive', 'src':'img/mute.svg'}, null, " ")
          ),
          element('button', { 'class': 'video-controls__button' }, {click : fullScreen },
            element('img', { 'class':'video-controls__img', 'src':'img/fullscreen.svg'}, null, " ")
          ),
          element('button', { 'class': 'video-controls__button' }, {click : fastForward },
            element('img', { 'class':'video-controls__img', 'src':'img/next.svg'}, null, " ")
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
  )
}