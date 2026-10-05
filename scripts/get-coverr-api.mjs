const searchUrl = 'https://coverr.co/api/videos?query=city%20skyline&page=1';
const res = await fetch(searchUrl, {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
});
const data = await res.json();
for (const hit of data.hits.slice(0, 10)) {
  console.log({
    title: hit.title,
    base_filename: hit.base_filename,
    mp4: `https://cdn.coverr.co/videos/${hit.base_filename}/1080p.mp4`,
    original: `https://cdn.coverr.co/videos/${hit.base_filename}/original.mp4`,
    poster: hit.poster
  });
}
