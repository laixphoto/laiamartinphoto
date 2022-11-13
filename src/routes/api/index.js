const API = {
  key: import.meta.env.VITE_KEY,
  user: import.meta.env.VITE_USER,
};

export async function post({ body }) {
  const { album_id } = await body;

  const URL = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${API.key}&photoset_id=${album_id}&user_id=${API.user}&format=json&nojsoncallback=1`;
  const req = await fetch(URL);
  const data = await req.json();

  return {
    body: data,
  };
}
