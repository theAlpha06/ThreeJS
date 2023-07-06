import * as $ from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import texture from './assets/930_lights_baseColor.png';
import shadowTexture from './assets/shadowTexture.png';

// ThreeJS uses shadow maps to cast shadow, for every light that casts shadows all objects marked to cast shadows are rendered from the point of view of the light.

const canvas = document.querySelector('#canvas');
const renderer = new $.WebGL1Renderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new $.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(40,30,50);

const scene = new $.Scene();
// scene.background = new $.Color('white');

const loader = new $.TextureLoader();
const planeTex = loader.load(texture);
planeTex.wrapS = $.RepeatWrapping;
planeTex.wrapT = $.RepeatWrapping;
planeTex.repeat.set(10, 10);

const shadowTex = loader.load(shadowTexture);

const sphereShadowBases = [];

const sphereRadius = 1;
const sphereWidthDivisions = 32;
const sphereHeightDivisions = 16;
const sphereGeo = new $.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);

const planeSize = 1;
const shadowGeo = new $.PlaneGeometry(planeSize, planeSize);

const numSpheres = 15;
for (let i = 0; i < numSpheres; ++i) {
  // make a base for the shadow and the sphere
  // so they move together.
  const base = new $.Object3D();
  scene.add(base);
 
  // add the shadow to the base
  // note: we make a new material for each sphere
  // so we can set that sphere's material transparency
  // separately.
  const shadowMat = new $.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,    // so we can see the ground
    depthWrite: false,    // so we don't have to sort
  });
  const shadowMesh = new $.Mesh(shadowGeo, shadowMat);
  shadowMesh.position.y = 0.001;  // so we're above the ground slightly
  shadowMesh.rotation.x = Math.PI * -.5;
  const shadowSize = sphereRadius * 4;
  shadowMesh.scale.set(shadowSize, shadowSize, shadowSize);
  base.add(shadowMesh);
 
  // add the sphere to the base
  const u = i / numSpheres;   // goes from 0 to 1 as we iterate the spheres.
  const sphereMat = new $.MeshPhongMaterial();
  sphereMat.color.setHSL(u, 1, .75);
  const sphereMesh = new $.Mesh(sphereGeo, sphereMat);
  sphereMesh.position.set(0, sphereRadius + 2, 0);
  base.add(sphereMesh);
 
  // remember all 3 plus the y position
  sphereShadowBases.push({base, sphereMesh, shadowMesh, y: sphereMesh.position.y});
}

const skyColor = 0xB1E1FF;  // light blue
const groundColor = 0xB97A20;  // brownish orange
const intensity = 2;
const lightHemispherical = new $.HemisphereLight(skyColor, groundColor, intensity);
scene.add(lightHemispherical);

const color = 0xFFFFFF;
const light = new $.DirectionalLight(color, 1);
light.position.set(0, 10, 5);
light.target.position.set(-5, 0, 0);
scene.add(light);
scene.add(light.target);

const planeGeo = new $.PlaneGeometry(40, 40);
const planeMat = new $.MeshBasicMaterial({
  // map:  planeTex,
  side: $.DoubleSide
})
planeMat.color.setRGB(1.5, 1.5, 1.5);
const plane = new $.Mesh(planeGeo, planeMat);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);



const animate = (time) => {
  time *= 0.001;
  sphereShadowBases.forEach((sphereShadowBase, ndx) => {
    const {base, sphereMesh, shadowMesh, y} = sphereShadowBase;
 
    // u is a value that goes from 0 to 1 as we iterate the spheres
    const u = ndx / sphereShadowBases.length;
 
    // compute a position for the base. This will move
    // both the sphere and its shadow
    const speed = time * 0.2;
    const angle = speed + u * Math.PI * 2 * (ndx % 1 ? 1 : -1);
    const radius = Math.sin(speed - ndx) * 10;
    base.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
 
    // yOff is a value that goes from 0 to 1
    const yOff = Math.abs(Math.sin(time * 2 + ndx));
    // move the sphere up and down
    sphereMesh.position.y = y + $.MathUtils.lerp(-2, 2, yOff);
    // fade the shadow as the sphere goes up
    shadowMesh.material.opacity = $.MathUtils.lerp(1, .25, yOff);
  });
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