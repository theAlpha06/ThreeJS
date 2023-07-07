import * as $ from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import dat from 'dat.gui';

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

const planeGeo = new $.PlaneGeometry(10, 10);
const planeMat = new $.MeshBasicMaterial();
const plane = new $.Mesh(planeGeo, planeMat);
scene.add(plane);

scene.fog = new $.Fog(0x000000, 1, 15);
scene.background = new $.Color(0x000000);

// scene.fog = new $.FogExp2(0x000000, 0.1);

const geo = new $.BoxGeometry(2, 2, 2);
const material = new $.MeshBasicMaterial({

});
const cube = new $.Mesh(geo, material);
scene.add(cube);

const animate = () => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
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