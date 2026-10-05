const res = await fetch('https://coverr.co/videos/a-glass-building-in-lisbon-rmrp71ns2g', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
});
const html = await res.text();
const matches = [...new Set(html.match(/https:\/\/[^"'<>\s]+\.(mp4|webm)[^"'<>\s]*/g) || [])];
console.log('Matches:', matches);
