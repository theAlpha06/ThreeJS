import * as $ from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('#canvas');
const renderer = new $.WebGL1Renderer({
  antialias: true,
  logarithmicDepthBuffer: true,  
  canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new $.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.0000001,
  100000
);
camera.position.set(10, 10, 30);


const scene = new $.Scene();

const sphereRadius = 3;
const sphereWidthDivision = 32;
const sphereHeightDivision = 16;
const sphereGeo = new $.SphereGeometry(sphereRadius, sphereWidthDivision, sphereHeightDivision);
const numSpheres = 200;

for ( let i = 0; i < numSpheres; ++i) {
  const sphereMate = new $.MeshBasicMaterial();
  sphereMate.color.setHSL(i * .73, 1, 0.5);
  const mesh = new $.Mesh(sphereGeo, sphereMate);
  mesh.position.set(-sphereRadius - 1, sphereRadius + 2, i * sphereRadius * -2.2);
  scene.add(mesh);
}

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

requestAnimationFrame(animate);

const orbitControls = new OrbitControls(camera, canvas);
orbitControls.update();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
});