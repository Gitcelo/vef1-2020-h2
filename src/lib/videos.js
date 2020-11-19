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

export async function makeVideos() {
  const data = await fetchVideos();
  if(data === null) {
    return;
  }
  const mum = document.querySelector('.bigmomma');
  const daughter = "";
  const cat = data.categories;
  const vids = data.videos;
  cat.forEach((category) => {
    mum.appendChild(
      element('h2', { 'class': 'col' }, null, category.title)
      );
    const vid = category.videos;
    vid.forEach(video => {
      vids.forEach(videos => {
        /*if(video === videos.id) {
          daughter.appendChild(
            el()
          )*/
          console.log(videos.id);
        });
    });
  });
}
