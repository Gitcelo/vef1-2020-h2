import { fetchVideos } from './lib/videos';


async function now() {
  const data = await fetchVideos();
  console.log(data.categories);
}



document.addEventListener('DOMContentLoaded', async () => {
  now();
});
