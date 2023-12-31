import * as $ from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const gui = new dat.GUI();
const canvas = document.querySelector('#canvas');
const renderer = new $.WebGL1Renderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new $.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 10);


const scene = new $.Scene();
const textureLoader = new $.TextureLoader();

const planeTexture = new $.TextureLoader().load('https://threejs.org/manual/resources/images/mip-low-res-enlarged.png');

// planeTexture.wrapS = $.RepeatWrapping;
// planeTexture.wrapT = $.RepeatWrapping;
planeTexture.magFilter = $.NearestFilter;
// planeTexture.repeat.set(14, 14);
// planeTexture.rotation = $.MathUtils.degToRad(45);
const light = new $.DirectionalLight(0xffffff, 1);
light.position.set(0, 5, 10);
scene.add(light);

const planeGeo = new $.PlaneGeometry(5, 5);
const planeMat = new $.MeshStandardMaterial({
  map: planeTexture,
  side: $.DoubleSide,
});
const plane = new $.Mesh(planeGeo, planeMat);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

const BoxTexture = textureLoader.load('https://threejs.org/examples/textures/uv_grid_opengl.jpg');
const BoxTexture2 = textureLoader.load('https://threejs.org/examples/textures/uv_grid_opengl.jpg');
BoxTexture.minFilter = $.NearestFilter;

const geo = new $.BoxGeometry(1, 1, 1);
const material = new $.MeshStandardMaterial({
  map: BoxTexture
});
const material2 = new $.MeshStandardMaterial({
  map: BoxTexture2
});
const cube = new $.Mesh(geo, material);
const cube2 = new $.Mesh(geo, material2);
cube.position.set(1, 1, 0);
cube2.position.set(-1, 1, 0);
scene.add(cube2);
scene.add(cube);

const animate = () => {
  cube.rotation.x += 0.001;
  cube.rotation.y += 0.001;
  cube2.rotation.x += 0.001;
  cube2.rotation.y += 0.001;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

requestAnimationFrame(animate);

const orbitControls = new OrbitControls(camera, canvas);
orbitControls.update();


gui.add(planeTexture.repeat, 'x', 0, 20, 0.01);
gui.add(planeTexture.repeat, 'y', 0, 20, 0.01);
gui.add(planeTexture, 'rotation', 0, Math.PI * 2, 0.01);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
});