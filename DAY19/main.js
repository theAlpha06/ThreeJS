import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const fileUrl = new URL('./models/Donkey.gltf', import.meta.url);

const ctrlBtns = document.getElementsByClassName('ctrl_btn');

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

let mixer;
assetLoader.load(fileUrl.href, function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    console.log(model);
    mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;

    ctrlBtns[0].addEventListener('click', () => {
        const clip = THREE.AnimationClip.findByName(clips, 'Gallop');
        const action = mixer.clipAction(clip);
        action.play();
    });

    ctrlBtns[1].addEventListener('click', () => {
        const clip = THREE.AnimationClip.findByName(clips, 'Walk');
        const action = mixer.clipAction(clip);
        action.play();
    });

    ctrlBtns[2].addEventListener('click', () => {
        const clip = THREE.AnimationClip.findByName(clips, 'Attack_Headbutt');
        const action = mixer.clipAction(clip);
        action.play();
    });

    ctrlBtns[3].addEventListener('click', () => {
        const clip = THREE.AnimationClip.findByName(clips, 'Attack_Kick');
        const action = mixer.clipAction(clip);
        action.play();
    });

    ctrlBtns[4].addEventListener('click', () => {
        const clip = THREE.AnimationClip.findByName(clips, 'Death');
        const action = mixer.clipAction(clip);
        action.play();
    });

    ctrlBtns[5].addEventListener('click', () => {
        const clip = THREE.AnimationClip.findByName(clips, 'Gallop_Jump');
        const action = mixer.clipAction(clip);
        action.play();
    });

    ctrlBtns[6].addEventListener('click', () => {
        const clip = THREE.AnimationClip.findByName(clips, 'Idle_2');
        const action = mixer.clipAction(clip);
        action.play();
    });

    ctrlBtns[7].addEventListener('click', () => {
        const clip = THREE.AnimationClip.findByName(clips, 'Idle_Headlow');
        const action = mixer.clipAction(clip);
        action.play();
    });

    ctrlBtns[8].addEventListener('click', () => {
        const clip = THREE.AnimationClip.findByName(clips, 'Idle_HitReact1');
        const action = mixer.clipAction(clip);
        action.play();
    });

    ctrlBtns[9].addEventListener('click', () => {
        const clip = THREE.AnimationClip.findByName(clips, 'Idle_HitReact2');
        const action = mixer.clipAction(clip);
        action.play();
    });

    ctrlBtns[10].addEventListener('click', () => {
        const clip = THREE.AnimationClip.findByName(clips, 'Jump_toldle');
        const action = mixer.clipAction(clip);
        action.play();
    });

    ctrlBtns[11].addEventListener('click', () => {
        const clip = THREE.AnimationClip.findByName(clips, 'Idle');
        const action = mixer.clipAction(clip);
        action.play();
    });

    ctrlBtns[12].addEventListener('click', () => {
        const clip = THREE.AnimationClip.findByName(clips, 'Eating');
        const action = mixer.clipAction(clip);
        action.play()
    });

    // Plays all animations at once
    // clips.forEach(function(clip) {
    //     const action = mixer.clipAction(clip);
    //     action.play();
    // });

}, undefined, function (error) {
    console.error(error);
});

const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);


const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

const clock = new THREE.Clock();

function animate() {
    if (mixer)
        mixer.update(clock.getDelta());
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});