import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";
import planetTexture from "./4k_ceres_fictional.jpeg";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 42;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const minimumDistance = 26;
controls.minDistance = minimumDistance;

var loader = new THREE.TextureLoader();
let sphere: THREE.Mesh = new THREE.Mesh();

loader.load(planetTexture, function (texture) {
  const geometry = new THREE.SphereGeometry(15, 32, 16);
  const material = new THREE.MeshBasicMaterial({
    // color: 0xffff00,
    wireframe: false,
    map: texture,
  });
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
});

// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "z", minimumDistance, 70);
cameraFolder.close();
gui.close();

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.005;
  render();
  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
