import * as THREE from "https://unpkg.com/three@0.120.1/build/three.module.js";
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.120.1/examples/jsm/controls/OrbitControls.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("main"),
});
// document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);



const crystalGeometry = new THREE.CubeGeometry(10 , 10 ,10);
const texture = new THREE.TextureLoader().load('logo2.png');
// const shinyMaterial = new THREE.MeshStandardMaterial({
//   color: 0x4086f4,
//   metalness: 0.1,
//   roughness: 0.2,
//   shininess: 0.9,
//   // transparent: true,
//   // opacity: 0.7,
// });
const shinyMaterial = new THREE.MeshStandardMaterial({
  map : texture
 });
const cube = new THREE.Mesh(crystalGeometry, shinyMaterial);
scene.add(cube);

const light = new THREE.PointLight( 0xffffff);
light.position.set( 8, 10, 15 );
scene.add( light );

const ambloght = new THREE.AmbientLight(0xffffff)
scene.add( ambloght)

const helper3 = new THREE.PointLightHelper( light );
const gridhelp = new THREE.GridHelper(200,50);
scene.add( helper3  );

const control = new OrbitControls(camera , renderer.domElement);

function addstar(){
const geometry = new THREE.SphereGeometry(0.25 , 24 , 24);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff  });
const star = new THREE.Mesh(geometry,material)

const[x,y,z]=Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(200));

star.position.set(x,y,z)
scene.add(star)

}

Array(400).fill().forEach(addstar)
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
control.update();
  renderer.render(scene, camera);
}

animate();
