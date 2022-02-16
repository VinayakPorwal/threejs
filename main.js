import * as THREE from "https://unpkg.com/three@0.120.1/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.120.1/examples/jsm/controls/OrbitControls.js";
// import {TimeLineMax} from "https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js";


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
renderer.setClearColor(0xffff, 0.5);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// camera.position.setZ(40);
camera.position.setY(10);


//----BACKGROUND
// const texture2 = new THREE.TextureLoader().load({color:0x00ff00});
// scene.background=texture2;

// CUBE
const geometry = new THREE.BoxGeometry(15,25,15);
const texture4 = new THREE.TextureLoader().load("./333.png");
const material = new THREE.MeshStandardMaterial({  wireframe : false , map: texture4});
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
scene.add(cube);
cube.position.z = -30;
cube.rotation.y = -12;
cube.position.x = 22;
cube.position.y = 12.5;

//CUBE2
const geometry2 = new THREE.BoxGeometry(15,25,15);
const texture42 = new THREE.TextureLoader().load("./logo2.png");
const material2 = new THREE.MeshStandardMaterial({  wireframe : false , map: texture42});
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.castShadow = true;
scene.add(cube2);
cube2.position.z = -60;
cube2.rotation.y = 7;
cube2.position.x = -22;
cube2.position.y = 12.5;



//SPEHERE
const sphereGeometry = new THREE.SphereGeometry( 2, 100, 100);
const texture5 = new THREE.TextureLoader().load("./earth.jpg");

const sphereMaterial = new THREE.MeshStandardMaterial( { map : texture5 } );

const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
scene.add( sphere );
sphere.position.y = 10;
sphere.position.z = -50;

//PLANE 
const planeGeometry = new THREE.PlaneGeometry( 100, 100, 32, 32 );
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff, side: THREE.DoubleSide} )
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
plane.position.z = -50;
scene.add( plane );

//road for camera
const planeGeometry2 = new THREE.PlaneGeometry( 20, 100, 32, 32 );
const planeMaterial2 = new THREE.MeshStandardMaterial( { color: 0x000000, side: THREE.DoubleSide} )
const plane2 = new THREE.Mesh( planeGeometry2, planeMaterial2 );
plane2.receiveShadow = true;
plane2.rotation.x = -Math.PI / 2;
plane2.position.z = -50;
scene.add( plane2 );


const light = new THREE.PointLight(0xffffff , 2 ,100);
light.position.set(15, 50,-10 );
light.castShadow = true; 
scene.add(light);


const light2 = new THREE.PointLight(0xffffff, 2 ,100);
light2.position.set(-15,25,-55);
// light2.castShadow = true; 
scene.add(light2);
// light.shadow.mapSize.width = 512; // default
// light.shadow.mapSize.height = 512; // default
// light.shadow.camera.near = 0.5; // default
// light.shadow.camera.far = 500; // default

const helper = new THREE.CameraHelper( light.shadow.camera );
const helper2 = new THREE.CameraHelper( light2.shadow.camera );
scene.add( helper );
scene.add(  helper2 );

const gridhelp = new THREE.GridHelper(200, 50);
// scene.add( gridhelp  );

// const phelper = new THREE.PlaneHelper( plane, 1 , 0xffffff );
// scene.add( phelper );
const ambloght = new THREE.AmbientLight(0xffffff);
scene.add(ambloght);
// ambloght.castShadow = true; 


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}


// SCROLL MOVING CAMERA
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * 0.01;
  // camera.position.x = t * -0.002;
  // camera.rotation.y = t * -0.002;
}
document.body.onscroll = moveCamera;
moveCamera();

// this.tl =  new TimeLineMax().delay(.3);
// this.tl =  new TimeLineMax({paused : true});
// this.tl.to(this.camera.position ,1, { z:-20 , ease :Expo.easeout})

function cameraZoomIn(){
camera.position.z = -20;
}

document.getElementById('click').onclick = cameraZoomIn;

// const control = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.005;
  sphere.rotation.y += 0.001;
  renderer.render(scene, camera);
  window.addEventListener("resize", onWindowResize);
  // control.update();
}
animate();
