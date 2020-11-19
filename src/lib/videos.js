const info = './videos.json';

export async function fetchVideos(){
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
