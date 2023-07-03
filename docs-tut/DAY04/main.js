import * as $ from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('#canvas');
const renderer = new $.WebGL1Renderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new $.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const scene = new $.Scene();
const textureLoader = new $.TextureLoader();

const geo = new $.BoxGeometry(1, 1, 1);
const material = new $.MeshBasicMaterial({
  map: textureLoader.load('https://threejs.org/manual/resources/images/mip-low-res-enlarged.png')
});
const materials = [
  new $.MeshBasicMaterial({color: 'blue'}),
  new $.MeshBasicMaterial({color: 'red'}),
  new $.MeshBasicMaterial({color: 'green'}),
  new $.MeshBasicMaterial({color: 'orange'}),
  new $.MeshBasicMaterial({color: 'lavander'}),
  new $.MeshBasicMaterial({color: 'yellow'}),
]
const cube = new $.Mesh(geo, material);
const cube2 = new $.Mesh(geo, materials);
cube2.position.x = 2;
scene.add(cube2);
scene.add(cube);

const animate = () => {
  cube.rotation.x += 0.001;
  cube.rotation.y += 0.001;
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