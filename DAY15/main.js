import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.set(0, 5, 10);


const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

const planeGeo = new THREE.PlaneGeometry(10, 10, 30, 30);
const planeMat = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    wireframe: true
});
const planeMesh = new THREE.Mesh(planeGeo, planeMat);
scene.add(planeMesh);


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const mouse = new THREE.Vector2();
const intersectionPoint = new THREE.Vector3();
const planeNormal = new THREE.Vector3();
const plane = new THREE.Plane();
const raycaster = new THREE.Raycaster();

window.addEventListener('mousemove', function (e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    planeNormal.copy(camera.position).normalize();
    // plane.setFromNormalAndCoplanarPoint(planeNormal, new THREE.Vector3(0, 0, 0)); //unitVector, originPoint
    plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, intersectionPoint);
})

const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.81, 0),
});

const groundMaterial = new CANNON.Material();

const groundBody = new CANNON.Body({
    shape: new CANNON.Box(new CANNON.Vec3(5, 5, 0.01)),
    type: CANNON.Body.STATIC,
    material: groundMaterial,
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);




window.addEventListener('click', function (e) {
    const sphereGeo = new THREE.SphereGeometry(0.125, 30, 30);
    const sphereMat = new THREE.MeshBasicMaterial({
        color: 0xFFEA00
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphereMesh);
    sphereMesh.position.copy(intersectionPoint);
    world.addBody(sphereBody)
})


const timeStep = 1 / 60;

function animate() {

    world.step(timeStep);
    planeMesh.position.copy(groundBody.position);
    planeMesh.quaternion.copy(groundBody.quaternion);


    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})



