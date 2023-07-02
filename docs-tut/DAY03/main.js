import * as $ from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('#c');
const renderer = new $.WebGL1Renderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new $.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 30;


const scene = new $.Scene();

const geo = new $.SphereGeometry(2, 100, 100);
const material = new $.MeshStandardMaterial({
  color: 0xff0000,
  // flatShading: true,
  roughness: 0.5
});
const sphere = new $.Mesh(geo, material);
scene.add(sphere);

const boxGoemetry = new $.BoxGeometry(2, 2, 2);
const boxMaterial = [
  new $.MeshBasicMaterial({
    color: 'blue',
    side: $.DoubleSide
  }),
  new $.MeshBasicMaterial({
    color: 'green',
    side: $.DoubleSide
  }),
  new $.MeshBasicMaterial({
    color: 'red',
    side: $.DoubleSide
  }),
  new $.MeshBasicMaterial({
    color: 'yellow',
    side: $.DoubleSide
  }),
  new $.MeshBasicMaterial({
    color: 'pink',
    side: $.DoubleSide
  }),
  new $.MeshBasicMaterial({
    color: 'white',
    side: $.DoubleSide
  }),
];

const cube = new $.Mesh(boxGoemetry, boxMaterial);
cube.position.x = 10;
scene.add(cube);

const animate = () => {
  sphere.rotation.x += 0.01;
  cube.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  cube.rotation.y += 0.01;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

const light = new $.DirectionalLight(0xffffff, 1);
scene.add(light);
light.position.set(0, 10, 10);

requestAnimationFrame(animate);

const orbitControls = new OrbitControls(camera, canvas);
orbitControls.update();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
});