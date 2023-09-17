import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas });
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


const loader = new OBJLoader();
const mtlLoader = new MTLLoader();

mtlLoader.setPath('./models/');
mtlLoader.load('Donkey.mtl', function(loadedMesh){
    loader.materials = loadedMesh;
    loader.load('models/Donkey.obj', function (object) {
        scene.add(object);
    },
        function (xhr) {
            console.log(xhr.loaded / xhr.total * 100)
        },
        function (error) {
    
            console.log('An error happened');
    
        })
})

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