import * as $ from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import checkTexture from './assets/check.png';
import * as dat from 'dat.gui';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

const canvas = document.querySelector('#canvas');
const renderer = new $.WebGL1Renderer({antialias: true, canvas});
RectAreaLightUniformsLib.init();
renderer.physicallyCorrectLights = true;
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new $.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(40, 40, 40);

const scene = new $.Scene();
const textureLoader = new $.TextureLoader();

// const color = 0xFFFFFF;
// const intensity = 1;
// const light = new $.AmbientLight(color, intensity);
// scene.add(light);

// const color = 0xffffff;
// const skyColor = 0xB1E1FF;
// const groundColor = 0xB97A20;
// const intensity = 1;
// const light = new $.HemisphereLight(skyColor, groundColor, intensity);
// scene.add(light);

// const color = 0xFFFFFF;
// const intensity = 1;
// const light = new $.DirectionalLight(color, intensity);
// light.position.set(0, 10, 0);
// light.target.position.set(-5, 0, 0);
// scene.add(light); 
// scene.add(light.target);

const light = new $.PointLight(0xffffff, 1);
light.power = 800;
light.decay = 2;
light.position.set(0, 10, 20);
light.distance = Infinity;
scene.add(light);
const lightHelper = new $.PointLightHelper(light);
scene.add(lightHelper);

// const light = new $.SpotLight(0xffffff, 1, 0, Math.PI * 0.25, 0.5);
// light.position.set(0, 10, 20);
// light.target.position.set(-5, 0, 0);
// scene.add(light);
// scene.add(light.target);
// const lightHelper = new $.SpotLightHelper(light);
// scene.add(lightHelper);

// const color = 0xFFFFFF;
// const intensity = 1;
// const width = 10;
// const height = 10;
// const light = new $.RectAreaLight(color, intensity, width, height);
// light.position.set(0, 10, 0);
// light.rotation.x = -0.5 * Math.PI;
// scene.add(light);
// const lightHelper = new RectAreaLightHelper(light);
// light.add(lightHelper);


const planeTextue = textureLoader.load(checkTexture);
planeTextue.magFilter = $.NearestFilter;
planeTextue.wrapS = $.RepeatWrapping;
planeTextue.wrapT = $.RepeatWrapping;
planeTextue.repeat.set(10, 10);
const planeGeo = new $.PlaneGeometry(40, 40);
const planeMate = new $.MeshStandardMaterial({
  map: planeTextue,
  side: $.DoubleSide
});
const plane = new $.Mesh(planeGeo, planeMate);
plane.rotation.x = 0.5 * Math.PI;
scene.add(plane);

const geo = new $.BoxGeometry(4, 4, 4);
const material = new $.MeshStandardMaterial({
  color: '#8AC',
});
const cube = new $.Mesh(geo, material);
cube.position.set(5, 2, 0);
scene.add(cube);

const sphereGeo = new $.SphereGeometry(3, 32, 16);
const sphereMate = new $.MeshStandardMaterial({
  color: '#CAB',
})
const sphere = new $.Mesh(sphereGeo, sphereMate);
sphere.position.set(-4, 5, 0);
scene.add(sphere);

const animate = () => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  plane.rotation.z += 0.01;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

requestAnimationFrame(animate);

const gui = new dat.GUI();

//Ambient Light

// gui.addColor(light, 'color', (e) => {
//   light.color.set(e);
// })
// gui.add(light, 'intensity', 0, 2, 0.01);

//Hemisphere Light

// gui.addColor(light, 'color', (e) => {
//   light.color.set(e);
// })
// gui.addColor(light, 'groundColor', (e) => {
//   light.groundColor.set(e);
// })
// gui.add(light, 'intensity', 0, 2, 0.01);

//Directional Light

// gui.addColor(light, 'color', (e) => {
//   light.color.set(e);
// })
// gui.add(light, 'intensity', 0, 2, 0.01);
// gui.add(light.position, 'x', -10, 10, 0.01);
// gui.add(light.position, 'y', -10, 10, 0.01);
// gui.add(light.position, 'z', -10, 10, 0.01);
// gui.add(light.target.position, 'x', -10, 10, 0.01);
// gui.add(light.target.position, 'y', -10, 10, 0.01);
// gui.add(light.target.position, 'z', -10, 10, 0.01);

// Point Light

gui.addColor(light, 'color', (e) => {
  light.color.set(e);
})
gui.add(light, 'intensity', 0, 2, 0.01);
gui.add(light.position, 'x', -10, 10, 0.01);
gui.add(light.position, 'y', -10, 10, 0.01);
gui.add(light.position, 'z', -10, 10, 0.01);

gui.add(light, 'power', 0, 2000, 1);
gui.add(light, 'decay', 0, 4, 0.01);

// Spot Light

// const lightHelperGUI = gui.addFolder('Light Helper');
// lightHelperGUI.add(lightHelper, 'visible');
// lightHelperGUI.open();
// const lightHelperUpdate = () => {
//   lightHelper.update();
//   requestAnimationFrame(lightHelperUpdate);
// }
// gui.addColor(light, 'color', (e) => {
//   light.color.set(e);
// })
// gui.add(light, 'intensity', 0, 2, 0.01);
// gui.add(light, 'distance', 0, 40, 0.01);
// gui.add(light, 'angle', 0, Math.PI * 0.5, 0.01).onChange(lightHelperUpdate);
// gui.add(light, 'penumbra', 0, 1, 0.01);
// gui.add(light.position, 'x', -10, 10, 0.01);
// gui.add(light.position, 'y', -10, 10, 0.01);
// gui.add(light.position, 'z', -10, 10, 0.01);
// gui.add(light.target.position, 'x', -10, 10, 0.01).onChange(lightHelperUpdate);
// gui.add(light.target.position, 'y', -10, 10, 0.01).onChange(lightHelperUpdate);
// gui.add(light.target.position, 'z', -10, 10, 0.01).onChange(lightHelperUpdate);

// Rect Area Light

// const lightHelperGUI = gui.addFolder('Light Helper');
// lightHelperGUI.add(lightHelper, 'visible');
// lightHelperGUI.open();
// const lightHelperUpdate = () => {
//   lightHelper.update();
//   requestAnimationFrame(lightHelperUpdate);
// }
// gui.addColor(light, 'color', (e) => {
//   light.color.set(e);
// })
// gui.add(light, 'intensity', 0, 2, 0.01);
// gui.add(light, 'width', 0, 40, 0.01);
// gui.add(light, 'height', 0, 40, 0.01);
// gui.add(light.position, 'x', -10, 10, 0.01);
// gui.add(light.position, 'y', -10, 10, 0.01);
// gui.add(light.position, 'z', -10, 10, 0.01);
// gui.add(light.rotation, 'x', -Math.PI * 0.5, Math.PI * 0.5, 0.01);

const orbitControls = new OrbitControls(camera, canvas);
orbitControls.update();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
});