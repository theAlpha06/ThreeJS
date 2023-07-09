import * as $ from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('#canvas');
const renderer = new $.WebGL1Renderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new $.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 10;

const scene = new $.Scene();

// const light = new $.PointLight('red', 1);
// scene.add(light);
// light.position.set(0, 0, 10);

const vertices = [
  // front
  { pos: [-1, -1, 1], norm: [0, 0, 1], uv: [0, 0], color: [255, 0, 0] }, // 0
  { pos: [1, -1, 1], norm: [0, 0, 1], uv: [1, 0], color: [255, 0, 0] }, // 1
  { pos: [-1, 1, 1], norm: [0, 0, 1], uv: [0, 1], color: [255, 0, 0] }, // 2

  { pos: [1, 1, 1], norm: [0, 0, 1], uv: [1, 1], color: [255, 0, 0] }, // 3
  // right
  { pos: [1, -1, 1], norm: [1, 0, 0], uv: [0, 0], color: [0, 255, 0] }, // 4
  { pos: [1, -1, -1], norm: [1, 0, 0], uv: [1, 0], color: [0, 255, 0] }, // 5

  { pos: [1, 1, 1], norm: [1, 0, 0], uv: [0, 1], color: [0, 255, 0] }, // 6
  { pos: [1, 1, -1], norm: [1, 0, 0], uv: [1, 1], color: [0, 255, 0] }, // 7
  // back
  { pos: [1, -1, -1], norm: [0, 0, -1], uv: [0, 0], color: [0, 0, 255] }, // 8
  { pos: [-1, -1, -1], norm: [0, 0, -1], uv: [1, 0], color: [0, 0, 255] }, // 9

  { pos: [1, 1, -1], norm: [0, 0, -1], uv: [0, 1], color: [0, 0, 255] }, // 10
  { pos: [-1, 1, -1], norm: [0, 0, -1], uv: [1, 1], color: [0, 0, 255] }, // 11
  // left
  { pos: [-1, -1, -1], norm: [-1, 0, 0], uv: [0, 0], color: [255, 0, 0] }, // 12
  { pos: [-1, -1, 1], norm: [-1, 0, 0], uv: [1, 0], color: [255, 0, 0] }, // 13

  { pos: [-1, 1, -1], norm: [-1, 0, 0], uv: [0, 1], color: [255, 0, 0] }, // 14
  { pos: [-1, 1, 1], norm: [-1, 0, 0], uv: [1, 1], color: [255, 0, 0] }, // 15
  // top
  { pos: [1, 1, -1], norm: [0, 1, 0], uv: [0, 0], color: [0, 255, 0] }, // 16
  { pos: [-1, 1, -1], norm: [0, 1, 0], uv: [1, 0], color: [0, 255, 0] }, // 17

  { pos: [1, 1, 1], norm: [0, 1, 0], uv: [0, 1], color: [0, 255, 0] }, // 18
  { pos: [-1, 1, 1], norm: [0, 1, 0], uv: [1, 1], color: [0, 255, 0] }, // 19
  // bottom
  { pos: [1, -1, 1], norm: [0, -1, 0], uv: [0, 0], color: [0, 0, 255] }, // 20
  { pos: [-1, -1, 1], norm: [0, -1, 0], uv: [1, 0], color: [0, 0, 255] }, // 21

  { pos: [1, -1, -1], norm: [0, -1, 0], uv: [0, 1], color: [0, 0, 255] }, // 22
  { pos: [-1, -1, -1], norm: [0, -1, 0], uv: [1, 1], color: [0, 0, 255] }, // 23
];

const positions = [];
const normals = [];
const uvs = [];
const colors = [];
for (const vertex of vertices) {
  positions.push(...vertex.pos);
  normals.push(...vertex.norm);
  uvs.push(...vertex.uv);
  colors.push(...vertex.color);
}

const geometry = new $.BufferGeometry();
geometry.setAttribute(
  'position',
  new $.BufferAttribute(new Float32Array(positions), 3)
);
geometry.setAttribute(
  'normal',
  new $.BufferAttribute(new Float32Array(normals), 3)
);
geometry.setAttribute(
  'uv',
  new $.BufferAttribute(new Float32Array(uvs), 2)
);
geometry.setAttribute(
  'color',
  new $.BufferAttribute(new Float32Array(colors), 3)
);
// geometry.setIndex([
//   0, 1, 2, 2, 1, 3,  // front
//   4, 5, 6, 6, 5, 7,  // right
//   8, 9, 10, 10, 9, 11,  // back
//   12, 13, 14, 14, 13, 15,  // left
//   16, 17, 18, 18, 17, 19,  // top
//   20, 21, 22, 22, 21, 23,  // bottom
// ]);

const material = new $.MeshNormalMaterial();
let geometry1 = new $.BufferGeometry()
const points = [
    new $.Vector3(-1, 1, -1), //c
    new $.Vector3(-1, -1, 1), //b
    new $.Vector3(1, 1, 1), //a

    new $.Vector3(1, 1, 1), //a
    new $.Vector3(1, -1, -1), //d
    new $.Vector3(-1, 1, -1), //c

    new $.Vector3(-1, -1, 1), //b
    new $.Vector3(1, -1, -1), //d
    new $.Vector3(1, 1, 1), //a

    new $.Vector3(-1, 1, -1), //c
    new $.Vector3(1, -1, -1), //d
    new $.Vector3(-1, -1, 1), //b
]

geometry1.setFromPoints(points)
geometry1.computeVertexNormals()

const mesh = new $.Mesh(geometry1, material)
scene.add(mesh)

const cube = new $.Mesh(
  geometry, 
  new $.MeshBasicMaterial({color: 'red'})
)
// scene.add(cube);

// const light = new $.PointLight(0xffffff, 1);
// scene.add(light);

const animate = () => {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  mesh.rotation.z += 0.01;
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