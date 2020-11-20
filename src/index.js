import { makeVideos } from './lib/videos';
import { displayVideo } from './lib/video-watch';

document.addEventListener('DOMContentLoaded', async () => {
  let url = /[^/]*$/.exec(window.location.href)[0];

  if (/^video.html/.test(url)) {
    await displayVideo();
  }
  else {
    await makeVideos();    
  }
});
