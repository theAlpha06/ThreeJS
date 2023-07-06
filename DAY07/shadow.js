import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
// renderer.setClearColor(0x000fff);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-10, 30, 30);
camera.lookAt(0, 0, 0);
orbit.update();


const helper = new THREE.AxesHelper(5);
scene.add(helper);
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);


const geo = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
const cube = new THREE.Mesh(geo, material);
scene.add(cube);

const sphereGeometry = new THREE.SphereGeometry(5, 100, 100);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  wireframe: true
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-10, 10, 0);
scene.add(sphere);
sphere.castShadow = true;

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(directionalLight);
directionalLight.position.set(-30, 50, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper);

const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dLightShadowHelper);

// const spotLight = new THREE.SpotLight(0xffffff);
// scene.add(spotLight);
// spotLight.position.set(-100, 100, 0);
// spotLight.angle = 0.15;
// spotLight.castShadow = true;

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);
plane.receiveShadow = true;


const gui = new dat.GUI();
const options = {
  color: 0xff0000,
  wireframe: true,
  speed: 0.01,
  angle: 0.2,
  penumbra: 0,
  intensity: 1,
}
gui.addColor(options, 'color').onChange((e) => {
  sphere.material.color.set(e);
});
gui.add(options, 'wireframe').onChange((e) => {
  sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1);
gui.add(options, 'angle', 0, 1);
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'intensity', 0, 1);

let step = 0;

const animate = (time) => {
  cube.rotation.x = time / 1000;
  cube.rotation.y = time / 1000;
  step += options.speed;
  // spotLight.intensity = options.intensity;
  // spotLight.angle = options.angle;
  // spotLight.penumbra = options.penumbra;
  // spotLightHelper.update();
  sphere.position.y = 10 * Math.abs(Math.sin(step));
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})