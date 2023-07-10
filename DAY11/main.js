import * as $ from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('#canvas');
const renderer = new $.WebGL1Renderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new $.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(-60, 0, 0);
camera.lookAt(0, 0, 0);
let objects = [];
let cuboidId = [];

const cameraRotate = new $.Object3D();

const scene = new $.Scene();
scene.background = new $.Color(0xffffff);

scene.add(cameraRotate);
cameraRotate.add(camera);


const geo = new $.BoxGeometry(1, 1, 1);
const material = new $.MeshBasicMaterial({
  color: 'red'
});
const cube = new $.Mesh(geo, material);
scene.add(cube);
cube.position.set(0,10,0);
objects.push(cube);
const cubeId = cube.id;

const cuboidGenerator = (length, width, height, x, y, z) => {
  const rgb = [
    Math.floor(Math.random() * (255- 100) + 100),
    Math.floor(Math.random() * (255- 100) + 100),
    Math.floor(Math.random() * (255- 100) + 100)
  ];
  const color = new $.Color(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
  const geo = new $.BoxGeometry(length, width, height);
  const material = new $.MeshBasicMaterial({
    color: color,
  });
  const cuboid = new $.Mesh(geo, material);
  cuboid.position.set(x, y, z);
  scene.add(cuboid);
  objects.push(cuboid)
  cuboidId.push(cuboid.id);
}

{
  for (let i = 0; i < 100; i++) {
    cuboidGenerator((Math.random() * 2), (Math.random() * 2), (Math.random() * 2), (Math.random() * 25), (Math.random() * 25), (Math.random() * 25));
}
for (let i = 0; i < 100; i++) {
  cuboidGenerator((Math.random() * 2), (Math.random() * 2), (Math.random() * 2), -(Math.random() * 25), (Math.random() * 25), (Math.random() * 25));
}
for (let i = 0; i < 100; i++) {
  cuboidGenerator((Math.random() * 2), (Math.random() * 2), (Math.random() * 2), (Math.random() * 25), -(Math.random() * 25), (Math.random() * 25));
}
for (let i = 0; i < 100; i++) {
  cuboidGenerator((Math.random() * 2), (Math.random() * 2), (Math.random() * 2), (Math.random() * 25), (Math.random() * 25), -(Math.random() * 25));
}
for (let i = 0; i < 100; i++) {
  cuboidGenerator((Math.random() * 2), (Math.random() * 2), (Math.random() * 2), -(Math.random() * 25), -(Math.random() * 25), (Math.random() * 25));
}
for (let i = 0; i < 100; i++) {
  cuboidGenerator((Math.random() * 2), (Math.random() * 2), (Math.random() * 2), -(Math.random() * 25), (Math.random() * 25), -(Math.random() * 25));
}
for (let i = 0; i < 100; i++) {
  cuboidGenerator((Math.random() * 2), (Math.random() * 2), (Math.random() * 2), (Math.random() * 25), -(Math.random() * 25), -(Math.random() * 25));
}
for (let i = 0; i < 100; i++) {
  cuboidGenerator((Math.random() * 2), (Math.random() * 2), (Math.random() * 2), -(Math.random() * 25), -(Math.random() * 25), -(Math.random() * 25));
}
}

const mousePositon = new $.Vector2();

window.addEventListener('mousemove', (e) => {
  mousePositon.x = (e.clientX / window.innerWidth) * 2 - 1;
  mousePositon.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

const raycaster = new $.Raycaster();

const animate = () => {
  cameraRotate.rotation.x += 0.003;
  cameraRotate.rotation.y += 0.003; 
  cameraRotate.rotation.z += 0.003;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  raycaster.setFromCamera(mousePositon, camera);
  const intersects = raycaster.intersectObjects(objects);
  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.id === cubeId) {
      intersects[i].object.material.color.set('blue');
    } else if (cuboidId.includes(intersects[i].object.id)) {
      const rgb = [
        Math.floor(Math.random() * (200)),
        Math.floor(Math.random() * (200)),
        Math.floor(Math.random() * (200))
      ];
      const color = new $.Color(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
      intersects[i].object.material.color.set(color);
    }
  }
}

requestAnimationFrame(animate);

const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
orbitControls.enablePan = false;
orbitControls.enableZoom = false;
orbitControls.update();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
});