import * as $ from 'three';

const canvas = document.querySelector('#canvas');
const renderer = new $.WebGL1Renderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new $.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 10);

const scene = new $.Scene();


const rtWidth = 512;
const rtHeight = 512;
const renderTarget = new $.WebGLRenderTarget(rtWidth, rtHeight);
const rtFov = 75;
const rtAspect = rtWidth / rtHeight;
const rtNear = 0.1;
const rtFar = 5;
const rtCamera = new $.PerspectiveCamera(rtFov, rtAspect, rtNear, rtFar);
rtCamera.position.z = 2;
const rtScene = new $.Scene();
rtScene.background = new $.Color('red');

{
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new $.PointLight(color, intensity);
  light.position.set(0, 0, 10);
  light.lookAt(0, 0, 0);
  scene.add(light);
}
{
  const color = 0xfdfdfdfd;
  const intensity = 10;
  const light = new $.DirectionalLight(color, intensity);
  light.position.set(0, 0, 10);
  light.lookAt(0, 0, 0);
  rtScene.add(light);
}

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new $.BoxGeometry(boxWidth, boxHeight, boxDepth);
 
function makeInstance(geometry, color, x) {
  const material = new $.MeshPhongMaterial({color});
  const cube = new $.Mesh(geometry, material);
  rtScene.add(cube);
  cube.position.x = x;
  return cube;
}
 
const rtCubes = [
  makeInstance(geometry, 0x44aa88,  0),
  makeInstance(geometry, 0x8844aa, -2),
  makeInstance(geometry, 0xaa8844,  2),
];

const material = new $.MeshPhongMaterial({
  map: renderTarget.texture,
});
const cube = new $.Mesh(geometry, material);
scene.add(cube);

function render(time) {
  time *= 0.001;

  // rotate all the cubes in the render target scene
  rtCubes.forEach((cube) => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  });
  
  // draw render target scene to render target
  renderer.setRenderTarget(renderTarget);
  renderer.render(rtScene, rtCamera);
  renderer.setRenderTarget(null);
    // rotate the cube in the scene
    cube.rotation.x = time;
    cube.rotation.y = time * 1.1;
   rtCamera.updateProjectionMatrix();
    // render the scene to the canvas
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}


requestAnimationFrame(render);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
});