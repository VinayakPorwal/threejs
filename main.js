import * as THREE from "https://unpkg.com/three@0.120.1/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.120.1/examples/jsm/controls/OrbitControls.js";
// import { searchForWorkspaceRoot } from "vite";
import logo from "./earth.jpg";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
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

const crystalGeometry = new THREE.SphereGeometry(10,100,100);
const texture = new THREE.TextureLoader().load(logo);
// const shinyMaterial = new THREE.MeshStandardMaterial({
//   color: 0x4086f4,
//   metalness: 0.1,
//   roughness: 0.2,
//   shininess: 0.9,
//   // transparent: true,
//   // opacity: 0.7,
// });
const shinyMaterial = new THREE.MeshStandardMaterial({
  map: texture,
});
const cube = new THREE.Mesh(crystalGeometry, shinyMaterial);
const cube2  = cube.clone();
 
cube2.position.set(20 , -50 , 10)

cube.position.set(30, 5, -60);
scene.add(cube, cube2);

const light = new THREE.PointLight(0xffffff);
light.position.set(15, 15, 15);
scene.add(light);

const ambloght = new THREE.AmbientLight(0xffffff);
scene.add(ambloght);

const helper3 = new THREE.PointLightHelper(light);
const gridhelp = new THREE.GridHelper(200, 50);
// scene.add( gridhelp  );

const control = new OrbitControls(camera, renderer.domElement);

function addstar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  // const texture = new THREE.TextureLoader().load();
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(400).fill().forEach(addstar);

// const texture2 = new THREE.TextureLoader().load(logo);
// scene.background=texture2;

// function moveCamera() {
//   const t = document.body.getBoundingClientRect().top;

//   camera.position.z = t * -0.01;
//   camera.position.x = t * -0.002;
//   camera.rotation.y = t * -0.002;
// }

// document.body.onscroll = moveCamera;
// moveCamera();

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  cube2.rotation.x += 0.01;
  // cube2.rotation.y += 0.01;
  control.update();
  renderer.render(scene, camera);
}

animate();
