import { chromium } from 'playwright';
import { createServer } from 'vite';
import { mkdir, writeFile } from 'node:fs/promises';

const server=await createServer({configFile:false,server:{host:'127.0.0.1',port:5188}});
await server.listen();
const browser=await chromium.launch({args:['--enable-unsafe-swiftshader']});
try {
  const page=await browser.newPage({viewport:{width:1920,height:1080}});
  page.on('pageerror',e=>console.error(e));
  await page.goto(`${server.resolvedUrls.local[0]}scripts/hero-video.html`);
  await page.waitForFunction(()=>window.ready);
  await mkdir('screenshots',{recursive:true});
  await mkdir('public/videos',{recursive:true});
  await page.evaluate(()=>{window.estate=window.createEstateScene();});
  await page.screenshot({path:'screenshots/hero-video-scene.png'});
  const poster=await page.evaluate(()=>window.estate.renderer.domElement.toDataURL('image/jpeg',.9).split(',')[1]);
  await writeFile('public/videos/shri-sidhanath-estate-poster.jpg',Buffer.from(poster,'base64'));
  await page.exposeFunction('renderProgress',value=>console.log(value));
  for(const size of [[3840,2160,'4k',14000000],[1920,1080,'1080p',4500000]]) {
    const encoded=await page.evaluate(async ([width,height,label,bitrate])=>{
      // Native WebCodecs renders every frame at an exact timestamp; no realtime frame drops.
      const estate=window.estate;
      estate.renderer.setSize(width,height);
      const config={codec:'vp09.00.40.08',width,height,bitrate,framerate:30,latencyMode:'realtime'};
      const supported=await VideoEncoder.isConfigSupported(config);
      if(!supported.supported)throw new Error('VP9 encoder unavailable');
      const chunks=[];
      let failure;
      const encoder=new VideoEncoder({output:chunk=>{
        const bytes=new Uint8Array(chunk.byteLength);chunk.copyTo(bytes);
        chunks.push({bytes,time:Math.round(chunk.timestamp/1000),key:chunk.type==='key'});
      },error:e=>{failure=e;}});
      encoder.configure(config);
      for(let frame=0;frame<900;frame++) {
        estate.render(frame/30);
        const videoFrame=new VideoFrame(estate.renderer.domElement,{timestamp:Math.round(frame*1000000/30),duration:Math.round(1000000/30)});
        encoder.encode(videoFrame,{keyFrame:frame%60===0}); videoFrame.close();
        if(encoder.encodeQueueSize>4)await encoder.flush();
        if(failure)throw failure;
        if(frame%90===0)await window.renderProgress(`${label}: ${Math.round(frame/9)}%`);
      }
      await encoder.flush();encoder.close();
      // Compact WebM muxer: finite segment, duration, one VP9 track, two-second clusters.
      const concat=parts=>{const out=new Uint8Array(parts.reduce((n,p)=>n+p.length,0));let o=0;for(const p of parts){out.set(p,o);o+=p.length;}return out;};
      const hex=s=>new Uint8Array(s.match(/../g).map(h=>parseInt(h,16)));
      const uint=n=>{let s=Math.round(n).toString(16);if(s.length%2)s='0'+s;return hex(s);};
      const vint=n=>{let len=1;while(n>=2**(7*len)-1)len++;const a=new Uint8Array(len);for(let i=len-1;i>=0;i--){a[i]=n%256;n=Math.floor(n/256);}a[0]|=1<<(8-len);return a;};
      const elem=(id,data)=>concat([hex(id),vint(data.length),data]);
      const number=(id,n)=>elem(id,uint(n));
      const str=(id,s)=>elem(id,new TextEncoder().encode(s));
      const float=(id,n)=>{const a=new Uint8Array(8);new DataView(a.buffer).setFloat64(0,n);return elem(id,a);};
      const header=elem('1a45dfa3',concat([number('4286',1),number('42f7',1),number('42f2',4),number('42f3',8),str('4282','webm'),number('4287',4),number('4285',2)]));
      const info=elem('1549a966',concat([number('2ad7b1',1000000),float('4489',30000),str('4d80','Shri Sidhanath'),str('5741','Shri Sidhanath architectural visualization')]));
      const track=elem('1654ae6b',elem('ae',concat([number('d7',1),number('73c5',1),number('83',1),str('86','V_VP9'),number('23e383',33333333),elem('e0',concat([number('b0',width),number('ba',height)]))])));
      const clusters=[];
      for(let start=0;start<chunks.length;start+=60){
        const group=chunks.slice(start,start+60),base=group[0].time;
        const blocks=group.map(c=>{
          const relative=c.time-base;
          return elem('a3',concat([new Uint8Array([0x81,(relative>>8)&255,relative&255,c.key?0x80:0]),c.bytes]));
        });
        clusters.push(elem('1f43b675',concat([number('e7',base),...blocks])));
      }
      const bytes=concat([header,elem('18538067',concat([info,track,...clusters]))]);
      let binary='';for(let i=0;i<bytes.length;i+=32768)binary+=String.fromCharCode(...bytes.subarray(i,i+32768));
      return {base64:btoa(binary),frames:chunks.length};
    },size);
    const path=`public/videos/shri-sidhanath-estate-${size[2]}.webm`;
    await writeFile(path,Buffer.from(encoded.base64,'base64'));
    console.log(`Saved ${path}: ${encoded.frames} frames, 30 seconds, ${size[0]}x${size[1]}`);
  }
} finally {await browser.close();await server.close();}
