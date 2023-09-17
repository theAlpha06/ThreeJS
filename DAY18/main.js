import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui';

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

const gui = new dat.GUI();

const options = {
    'Main': 0x2F3130,
    'Main light': 0x7C7C7C,
    'Main dark': 0x0A0A0A,
    'Hooves': 0x0F0B0D,
    'Hair': 0x0A0A0A,
    'Muzzle': 0x0B0804,
    'Eye dark': 0x020202,
    'Eye white': 0xBEBEBE
}

assetLoader.load(fileUrl.href, function(gltf) {
    const model = gltf.scene;
    scene.add(model);

    gui.addColor(options, 'Main').onChange(function(e) {
        model.getObjectByName('Cube').material.color.setHex(e);
    });
    gui.addColor(options, 'Main light').onChange(function(e) {
        model.getObjectByName('Cube_1').material.color.setHex(e);
    });
    gui.addColor(options, 'Main dark').onChange(function(e) {
        model.getObjectByName('Cube_2').material.color.setHex(e);
    });
    gui.addColor(options, 'Hooves').onChange(function(e) {
        model.getObjectByName('Cube_3').material.color.setHex(e);
    });
    gui.addColor(options, 'Hair').onChange(function(e) {
        model.getObjectByName('Cube_4').material.color.setHex(e);
    });
    gui.addColor(options, 'Muzzle').onChange(function(e) {
        model.getObjectByName('Cube_5').material.color.setHex(e);
    });
    gui.addColor(options, 'Eye dark').onChange(function(e) {
        model.getObjectByName('Cube_6').material.color.setHex(e);
    });
    gui.addColor(options, 'Eye white').onChange(function(e) {
        model.getObjectByName('Cube_7').material.color.setHex(e);
    });

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