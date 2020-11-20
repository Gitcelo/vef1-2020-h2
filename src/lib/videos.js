import { el, element } from './utils'

const info = './videos.json';

async function fetchVideos(){
  let result;
  try {
    result = await fetch(info);
  } catch (e) {
    console.error('Error', e);
    return null;
  }
  if (result.ok) {
    return await result.json();
  }
  return null;
}

function hour(time) {
  return time/3600;
}

function search(video, videos){
  for(let i = 0; i<videos.length;i+=1) {
    if (video === videos[i].id) return videos[i];
  }
}

export async function makeVideos() {
  const data = await fetchVideos();
  if(data === null) {
    return;
  }
  const mum = document.querySelector('.grid');
  const elem = document.createElement('section');
  elem.setAttribute('class', 'video row');
  mum.appendChild(element('section', { 'class': 'video row'}, null, ''))
  const cat = data.categories;
  const vids = data.videos;
  cat.forEach((category) => {
    console.log(category);
    elem.appendChild(element('h2', { 'class': 'col' }, null, category.title));
    const vid = category.videos;
    vid.forEach((video) => {
      const value = search(video, vids)
          const daughter =
            element('div', { 'class': 'col col-4 col-12-sm video-card'}, null,
              element('div', { 'class': 'video-thumbnail' }, null,
                element('img', { 'class': 'video-image', 'src': value.poster, 'alt': ''}, null, 'hehe'),
                element('div', { 'class': 'video-timestamp' }, null, `${hour(value.duration)}`)
                ),
              element('div', { 'class': 'video-info' }, null,
                element('h3', { 'class': 'video-name'}, null, value.title),
                element('p', { 'class': 'video-uploadtime'}, null, `${value.created}`)
                )
              )
          ;
          elem.appendChild(daughter);
  });

});
mum.appendChild(elem);
}
