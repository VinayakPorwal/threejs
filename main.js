import * as THREE from "https://unpkg.com/three@0.120.1/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.120.1/examples/jsm/controls/OrbitControls.js";
// import {TimeLineMax} from "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js";
// import TWEEN from "https://cdnjs.cloudflare.com/ajax/libs/tween.js/16.3.5/Tween.min.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

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

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x00daff);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// camera.position.z= 110;
camera.position.setY(8);

//side view
// camera.rotation.y = 11;
// camera.position.x = -22;
//CAMERA helper
const camhelper = new THREE.CameraHelper(camera);
// scene.add( camhelper );

//----BACKGROUND
const texture2 = new THREE.TextureLoader().load("./images/sky.jpg");
scene.background = texture2;

// CUBE
const geometry = new THREE.BoxGeometry(19, 35, 23);
// const texture4 = new THREE.TextureLoader().load("./resume.png");
const loader = new THREE.TextureLoader();
const cubeMaterials = [
  new THREE.MeshBasicMaterial({ map: loader.load("./imagesresume.png") }), //right side
  new THREE.MeshBasicMaterial({ map: loader.load("./images/logo2.png") }), //front side
  new THREE.MeshBasicMaterial({ map: loader.load("./images/resume.png") }), //left side
  new THREE.MeshBasicMaterial({ map: loader.load("./images/logo2.png") }), //bottom side
  new THREE.MeshBasicMaterial({ map: loader.load("./images/resume.png") }), //top side
  new THREE.MeshBasicMaterial({ map: loader.load("./images/logo2.png") }), //back side
];

// const material = new THREE.MeshStandardMaterial({  wireframe : false , map: texture4});
const cube = new THREE.Mesh(geometry, cubeMaterials);
cube.castShadow = true;
scene.add(cube);
cube.position.z = -30;
cube.rotation.y = -7;
cube.position.x = 25;
cube.position.y = 18;

//CUBE2
const geometry2 = new THREE.BoxGeometry(15, 25, 19);
const texture42 = new THREE.TextureLoader().load("./images/333.png");
const material2 = new THREE.MeshStandardMaterial({
  wireframe: false,
  map: texture42,
});
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.castShadow = true;
scene.add(cube2);
cube2.position.z = -60;
cube2.rotation.y = 7;
cube2.position.x = -22;
cube2.position.y = 12.5;
cube2.rotation.y = -7;
cube2.position.x = 25;
cube2.position.y = 12.5;

//CUBE3
const cube3 = cube2.clone();
scene.add(cube3);
cube3.position.z = -120;
cube3.rotation.y = 7;
cube3.position.x = -22;
cube3.position.y = 12.5;
cube3.rotation.y = -7;
cube3.position.x = 25;
cube3.position.y = 12.5;

//CUBE4
const cube4 = cube.clone();
scene.add(cube4);
cube4.position.z = -90;
cube4.rotation.y = -7;
cube4.position.x = 25;
cube4.position.y = 12.5;
cube4.rotation.y = -7;
cube4.position.x = 25;
cube4.position.y = 12.5;

//SPEHERE
const sphereGeometry = new THREE.SphereGeometry(2, 100, 100);
const texture5 = new THREE.TextureLoader().load("./images/soccer.jpg");
const sphereMaterial = new THREE.MeshStandardMaterial({ map: texture5 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
// scene.add( sphere );
sphere.position.y = 10;
sphere.position.z = -50;

//ball
const ball = sphere.clone();
ball.position.y = -2;
scene.add(ball);

//PLANE
const planeGeometry = new THREE.PlaneGeometry(300, 300, 1, 1);
const landtexture = new THREE.TextureLoader().load("./images/ground.jpg");
const normalTexture = new THREE.TextureLoader().load("./images/ground.jpg");
const planeMaterial = new THREE.MeshStandardMaterial({
  map: landtexture,
  side: THREE.DoubleSide,
  color: 0x429dff,
  normalMap: normalTexture,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
plane.position.z = -150;
scene.add(plane);

//road for camera
const planeGeometry2 = new THREE.PlaneGeometry(20, 300, 32, 32);
const roadtexture = new THREE.TextureLoader().load("./images/road2.jpg");
const planeMaterial2 = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: roadtexture,
});
const plane2 = new THREE.Mesh(planeGeometry2, planeMaterial2);
plane2.receiveShadow = true;
plane2.rotation.x = -Math.PI / 2;
plane2.position.z = -150;
plane2.position.y = 0.1;
scene.add(plane2);

//white line on road
const planeGeometry3 = new THREE.PlaneGeometry(1, 300, 32, 32);
const planeMaterial3 = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane3 = new THREE.Mesh(planeGeometry3, planeMaterial3);
plane3.receiveShadow = true;
plane3.rotation.x = -Math.PI / 2;
plane3.position.z = -150;
plane3.position.y = 0.1;
// scene.add( plane3 );

//3d car
// const loader2 = new GLTFLoader();

// loader2.load( 'car.glb', function ( gltf ) {
// // loader.position.y = 32;
// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );

//CAR
var bool = false;
const cartopgeometry = new THREE.BoxGeometry(4, 6, 4.5);
const cartoptexture = new THREE.TextureLoader().load("./images/trucktop.png");
const carmaterial = [
  new THREE.MeshBasicMaterial({ map: loader.load("./images/trucktop2.png") }), //right side
  new THREE.MeshBasicMaterial({ map: loader.load("./images/trucktop.png") }), //left side
  new THREE.MeshBasicMaterial({ map: loader.load("./images/resume.png") }), //top side
  new THREE.MeshBasicMaterial({ map: loader.load("./images/logo2.png") }), //bottom side
  new THREE.MeshBasicMaterial({ map: loader.load("./images/logo2.png") }), //front side
  new THREE.MeshBasicMaterial({ map: loader.load("./images/logo2.png") }), //back side
];
// const carmaterial = new THREE.MeshStandardMaterial({ map :  cartoptexture,  wireframe : bool , color : 0xf10b0b});
const cartop = new THREE.Mesh(cartopgeometry, carmaterial);
cartop.castShadow = true;
scene.add(cartop);
cartop.position.y = 4;
cartop.position.z = -10;

const carbackgeometry = new THREE.BoxGeometry(4, 2, 7);
// const texture42 = new THREE.TextureLoader().load("./333.png");
const carbackmaterial = new THREE.MeshStandardMaterial({
  wireframe: true,
  color: 0xf10b0b,
});
const carback = new THREE.Mesh(carbackgeometry, carbackmaterial);
carback.castShadow = true;
scene.add(carback);
carback.position.y = 2;
carback.position.z = -8;

//WHEELS
const wheelgeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.5, 100);
const wheeltexture = new THREE.TextureLoader().load("./images/wheel2.png");
const rightwheelmaterial = [
  new THREE.MeshBasicMaterial({ map: loader.load("./images/tyreside.png") }), //left side
  new THREE.MeshBasicMaterial({ map: loader.load("./images/logo2.png") }), //top side
  new THREE.MeshBasicMaterial({ map: loader.load("./images/wheel2.png") }), //right side
  // new THREE.MeshBasicMaterial({ map: loader.load('logo2.png')}), //bottom side
  // new THREE.MeshBasicMaterial({ map: loader.load('logo2.png')}), //front side
  // new THREE.MeshBasicMaterial({ map: loader.load('logo2.png')}), //back side
];
const leftwheelmaterial = [
  new THREE.MeshBasicMaterial({ map: loader.load("./images/tyreside.png") }), //left side
  new THREE.MeshBasicMaterial({ map: loader.load("./images/wheel2.png") }), //right side
  new THREE.MeshBasicMaterial({ map: loader.load("./images/logo2.png") }), //top side
  // new THREE.MeshBasicMaterial({ map: loader.load('logo2.png')}), //bottom side
  // new THREE.MeshBasicMaterial({ map: loader.load('logo2.png')}), //front side
  // new THREE.MeshBasicMaterial({ map: loader.load('logo2.png')}), //back side
];
// const wheelmaterial = new THREE.MeshBasicMaterial( {  map: wheeltexture , wireframe : bool,color: 0xffffff, side: THREE.DoubleSide } );
const wheel = new THREE.Mesh(wheelgeometry, leftwheelmaterial);
scene.add(wheel);
wheel.castShadow = true;
wheel.position.z = -6;
wheel.position.y = 1.5;
wheel.position.x = 2.5;
wheel.rotation.x = -Math.PI / 2;
wheel.rotation.z = -Math.PI / 2;

// const wheel2geometry = new THREE.CylinderGeometry(1,1,0.5,50 );
// const wheel2material = new THREE.MeshBasicMaterial( {  map: wheeltexture ,wireframe : bool,color: 0xffffff, side: THREE.DoubleSide } );
const wheel2 = new THREE.Mesh(wheelgeometry, rightwheelmaterial);
scene.add(wheel2);
wheel2.castShadow = true;
wheel2.position.z = -6;
wheel2.position.y = 1.5;
wheel2.position.x = -2.5;
wheel2.rotation.x = -Math.PI / 2;
wheel2.rotation.z = -Math.PI / 2;

// const wheel3geometry = new THREE.CylinderGeometry(1,1,0.5,50 );
// const wheel3material = new THREE.MeshBasicMaterial( {  map: wheeltexture ,wireframe : bool,color: 0xffffff, side: THREE.DoubleSide } );
const wheel3 = new THREE.Mesh(wheelgeometry, leftwheelmaterial);
scene.add(wheel3);
wheel3.castShadow = true;
wheel3.position.z = -10;
wheel3.position.y = 1.5;
wheel3.position.x = 2.5;
wheel3.rotation.x = -Math.PI / 2;
wheel3.rotation.z = -Math.PI / 2;

// const wheel4geometry = new THREE.CylinderGeometry(1,1,0.5,50 );
// const wheel4material = new THREE.MeshBasicMaterial( {  map: wheeltexture ,wireframe : bool,color: 0xffffff, side: THREE.DoubleSide } );
const wheel4 = new THREE.Mesh(wheelgeometry, rightwheelmaterial);
scene.add(wheel4);
wheel4.castShadow = true;

wheel4.position.z = -10;
wheel4.position.y = 1.5;
wheel4.position.x = -2.5;
wheel4.rotation.x = -Math.PI / 2;
wheel4.rotation.z = -Math.PI / 2;

//LIGHT
const light = new THREE.PointLight(0xffffff, 1, 300);
light.position.set(0, 150, -150);
light.castShadow = true;
scene.add(light);
//----
const light2 = new THREE.PointLight(0xffffff, 1, 300);
light2.position.set(0, 150, -200);
// light2.rotation.y = (10);
// light2.target = cube2 ;
light2.castShadow = true;
// scene.add(light2);
//----
const ambloght = new THREE.AmbientLight(0xffffff);
scene.add(ambloght);
// ambloght.castShadow = true;

//LIGHT HELPER
const helper = new THREE.CameraHelper(light.shadow.camera);
const helper2 = new THREE.CameraHelper(light2.shadow.camera);
scene.add(helper);
scene.add(helper2);

//GRID HELPER
const gridhelp = new THREE.GridHelper(200, 50);
// scene.add( gridhelp  );

// const phelper = new THREE.PlaneHelper( plane, 1 , 0xffffff );
// scene.add( phelper );

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// SCROLL MOVING CAMERA
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  var z = t * 0.02;
  ball.position.z = z - 14;
  wheel.position.z = z - 14.5;
  wheel2.position.z = z - 8;
  wheel3.position.z = z - 8;
  wheel4.position.z = z - 14.5;

  wheel.rotation.x = t * 0.008;
  wheel2.rotation.x = t * 0.008;
  wheel3.rotation.x = t * 0.008;
  wheel4.rotation.x = t * 0.008;

  cartop.position.z = z - 15;
  carback.position.z = z - 9;

  ball.rotation.x = t * 0.008;
  camera.position.z = t * 0.02 + 10;

  // camera.position.z = (t * 0.02 ) + -20; // SIDE view
}
document.body.onscroll = moveCamera;
moveCamera();

// this.tl =  new TimeLineMax().delay(.3);
// this.tl =  new TimeLineMax({paused : true});
// this.tl.to(this.camera.position ,1, { z:-20 , ease :Expo.easeout})

function cameraZoomIn() {
  // camera.position.z = -20;
  requestAnimationFrame(cameraZoomIn);
  sphere.position.y = 20;
  renderer.render(scene, camera);
}

function hide() {
  ball.position.y = 2;
  wheel4.position.y = -1.5;
  wheel3.position.y = -1.5;
  wheel2.position.y = -1.5;
  wheel.position.y = -1.5;
  cartop.position.y = -4;
  carback.position.y = -2;
}
function show() {
  ball.position.y = -2;
  wheel4.position.y = 1.5;
  wheel3.position.y = 1.5;
  wheel2.position.y = 1.5;
  wheel.position.y = 1.5;
  cartop.position.y = 4;
  carback.position.y = 2;
}
document.getElementById("ball").onclick = hide;
document.getElementById("car").onclick = show;

// const control = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  // sphere.rotation.x += 0.005;
  // sphere.rotation.y += 0.001;
  renderer.render(scene, camera);
  window.addEventListener("resize", onWindowResize);
  // control.update();
}
animate();
