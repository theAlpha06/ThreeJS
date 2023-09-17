import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const fileUrl = new URL('./models/Donkey.gltf', import.meta.url);

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xA3A3A3);


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xededed, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
scene.add(directionalLight);
directionalLight.position.set(10, 11, 7);


camera.position.set(6, 8, 14);
orbit.update();

const assetLoader = new GLTFLoader();

assetLoader.load(fileUrl.href, function(gltf) {
    const model = gltf.scene;
    scene.add(model);
    console.log(model.getObjectByName('Cube_1'));
    model.getObjectByName('Cube_1').material.color.setHex(0x00ff00)
}, undefined, function(error) {
    console.error(error);
});

const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);


const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});