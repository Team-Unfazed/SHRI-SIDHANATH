import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Original architectural visualization; signage belongs to this fictional estate.
export function createEstateScene(width = 3840, height = 2160) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  document.body.replaceChildren(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#d6c6ad');
  scene.fog = new THREE.Fog('#d6c6ad', 150, 450);
  const camera = new THREE.PerspectiveCamera(47, width / height, 0.1, 1000);
  scene.add(new THREE.HemisphereLight('#d8ecff', '#655644', 2.8));
  const sun = new THREE.DirectionalLight('#ffe0af', 4);
  sun.position.set(-65, 85, 35); scene.add(sun);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048,2048);
  Object.assign(sun.shadow.camera,{left:-140,right:140,top:140,bottom:-140,near:1,far:350});
  sun.shadow.bias = -.0002;
  sun.shadow.normalBias = .12;
  const sky = new THREE.Mesh(new THREE.SphereGeometry(480,32,16), new THREE.ShaderMaterial({
    side: THREE.BackSide, uniforms: {},
    vertexShader: 'varying vec3 pos; void main(){pos=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: 'varying vec3 pos; void main(){float h=normalize(pos).y;vec3 c=mix(vec3(.91,.72,.52),vec3(.32,.53,.69),smoothstep(-.05,.85,h));float d=max(0.,dot(normalize(pos),normalize(vec3(-.8,.35,-.5))));float s=.18*pow(d,80.)+pow(d,1800.);gl_FragColor=vec4(c+s*vec3(1.,.65,.3),1.);}',
  })); scene.add(sky);
  const stone = new THREE.MeshStandardMaterial({color:'#dfd8c9',roughness:.72});
  const darkStone = new THREE.MeshStandardMaterial({color:'#55534b',roughness:.7});
  const bronze = new THREE.MeshStandardMaterial({color:'#9e8055',metalness:.5,roughness:.38});
  const glass = new THREE.MeshStandardMaterial({color:'#517b89',metalness:.55,roughness:.22});
  const paving = new THREE.MeshStandardMaterial({color:'#bdb8a8',roughness:.95});
  const grass = new THREE.MeshStandardMaterial({color:'#61735a',roughness:1});
  const water = new THREE.MeshStandardMaterial({color:'#4a9099',metalness:.6,roughness:.15});
  function box(w,h,d,x,y,z,mat,parent=scene) {
    const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);parent.add(m);return m;
  }
  box(650,1,650,0,-1,0,grass);
  box(130,.35,110,0,0,0,paving);
  box(220,.25,13,0,.2,68,darkStone);
  box(220,.3,1.5,0,.4,59,stone);
  box(220,.3,1.5,0,.4,77,stone);
  for(let x=-110;x<110;x+=9) box(4,.04,.15,x,.36,68,stone);
  box(22,.12,36,0,.28,20,water);
  box(26,.15,1,0,.3,1.5,stone);box(26,.15,1,0,.3,38.5,stone);
  box(1,.15,38,-12.5,.3,20,stone);box(1,.15,38,12.5,.3,20,stone);
  function sign(text, w, h, x, y, z, parent, rotation=0) {
    const canvas=document.createElement('canvas');canvas.width=2048;canvas.height=256;
    const c=canvas.getContext('2d'); c.fillStyle='#252c2b';c.fillRect(0,0,2048,256);
    c.strokeStyle='#c6ad75';c.lineWidth=4;c.strokeRect(16,16,2016,224);
    c.fillStyle='#f6e6bc';c.font='500 150px Georgia';c.textAlign='center';c.textBaseline='middle';c.fillText(text,1024,132);
    const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=8;
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex}));
    mesh.position.set(x,y,z);mesh.rotation.y=rotation;parent.add(mesh);
  }
  function tower(x,z,w,d,h,variant=0) {
    const group=new THREE.Group();group.position.set(x,0,z);scene.add(group);
    box(w+5,4,d+5,0,2,0,stone,group);
    box(w,h,d,0,h/2+4,0,glass,group);
    const floors=Math.floor(h/3.6);
    for(let i=0;i<=floors;i++) {
      const yy=4+i*3.6;
      box(w+1,.32,d+1,0,yy,0,i%4===0?stone:bronze,group);
      if(i%5===0) {
        box(w+2,.18,2.4,0,yy,d/2+1.1,stone,group);
        box(w+2,.7,.16,0,yy+.5,d/2+2.3,glass,group);
      }
    }
    for(let xx=-w/2;xx<=w/2;xx+=3.4) {
      box(.22,h,.3,xx,h/2+4,d/2+.2,bronze,group);
      box(.22,h,.3,xx,h/2+4,-d/2-.2,bronze,group);
    }
    for(let zz=-d/2;zz<=d/2;zz+=3.4) {
      box(.3,h,.22,w/2+.2,h/2+4,zz,bronze,group);
      box(.3,h,.22,-w/2-.2,h/2+4,zz,bronze,group);
    }
    // Tall cream piers and cantilevered crowns frame the blue glass.
    for(const xx of [-w/2,w/2])box(1.5,h+2,d+1,xx,h/2+4,0,stone,group);
    box(w+3,2,d+3,0,h+5,0,stone,group);
    box(w*.6,3,d*.5,0,h+7,0,darkStone,group);
    sign('Shri Sidhanath',w*.88,w*.11,0,h-3,d/2+.5,group);
    sign('Shri Sidhanath',d*.88,d*.11,w/2+.82,h-3,0,group,Math.PI/2);
    // Warm apartment interiors, deterministic so repeated renders match.
    for(let i=0;i<floors;i++)for(let j=0;j<Math.floor(w/3.4);j++){
      if((i*7+j*11+variant)%9<3)box(2.3,1.65,.03,-w/2+1.8+j*3.4,5.6+i*3.6,d/2+.17,
        new THREE.MeshBasicMaterial({color:(i+j)%2?'#d9bc87':'#ead5a4'}),group);
    }
  }
  tower(-29,-14,23,21,68,1);tower(7,-30,25,23,84,2);tower(42,-13,22,22,60,3);
  tower(-57,-47,22,21,54,4);tower(43,-55,23,20,78,5);
  // Low-rise sales gallery, also branded.
  box(26,7,12,-35,3.5,34,glass);box(29,.8,15,-35,7.5,34,stone);
  sign('Shri Sidhanath',22,2.75,-35,5.2,40.05,scene);
  for(let i=0;i<26;i++){
    const xx=-145+(i%13)*24,zz=-110-Math.floor(i/13)*40;
    const hh=20+((i*17)%45);
    box(13,hh,14,xx,hh/2,zz,i%2?stone:darkStone);
    for(let f=5;f<hh;f+=4)box(13.15,.7,14.15,xx,f,zz,glass);
  }
  const foliage = new THREE.MeshStandardMaterial({color:'#385846',roughness:1});
  const trunk = new THREE.MeshStandardMaterial({color:'#74634c',roughness:1});
  function tree(x,z,s=1){
    const t=new THREE.Mesh(new THREE.CylinderGeometry(.22*s,.35*s,3.6*s,7),trunk);t.position.set(x,1.8*s,z);scene.add(t);
    for(let j=0;j<3;j++){
      const leaf=new THREE.Mesh(new THREE.IcosahedronGeometry((1.6-j*.25)*s,1),foliage);
      leaf.position.set(x+Math.sin(j*2)*.65*s,(3.8+j*.9)*s,z+Math.cos(j*2)*.5*s);scene.add(leaf);
    }
  }
  for(let x=-85;x<90;x+=8){tree(x,55,1.2);tree(x,82,1.25);}
  for(let z=-55;z<48;z+=9){tree(-70,z,1.1);tree(66,z,1.1);}
  for(let z=6;z<40;z+=9){tree(-17,z,.8);tree(17,z,.8);}
  for(let x=-65;x<65;x+=16){
    box(.13,6,.13,x,3,58,bronze);box(2,.12,.35,x+.7,6,58,bronze);
  }
  // Batch static architecture by material so 4K renders do not need thousands of draw calls.
  scene.updateMatrixWorld(true);
  const batches=new Map();const originals=[];
  scene.traverse(mesh=>{
    if(!mesh.isMesh || mesh===sky)return;
    const mat=mesh.material;
    const key=[mat.type,mat.color?.getHex(),mat.roughness,mat.metalness,mat.map?.uuid].join(':');
    if(!batches.has(key))batches.set(key,{material:mat,geometries:[]});
    batches.get(key).geometries.push(mesh.geometry.clone().applyMatrix4(mesh.matrixWorld));
    originals.push(mesh);
  });
  for(const mesh of originals)mesh.removeFromParent();
  for(const batch of batches.values()){
    const mesh=new THREE.Mesh(mergeGeometries(batch.geometries),batch.material);
    mesh.castShadow=true;mesh.receiveShadow=true;scene.add(mesh);
    for(const geometry of batch.geometries)geometry.dispose();
  }
  // Continuous orbit returns to precisely the opening view for a quiet loop.
  function render(seconds){
    const phase=seconds/30*Math.PI*2;
    camera.position.set(102+16*Math.sin(phase),50+6*Math.sin(phase),133+13*Math.cos(phase));
    camera.lookAt(0,32,-10);
    renderer.render(scene,camera);
  }
  render(0);
  return {renderer,render};
}
