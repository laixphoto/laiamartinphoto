const API = {
  key: "2562f30c269835c6fdd965d0a9ecf7e6",
  user: "194529610%40N05",
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