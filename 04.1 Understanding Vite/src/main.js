import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvas = document.getElementById('canvas')

// 1. Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#F0F0F0')

// 2. Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

// 3. Object
const geometry = new THREE.DodecahedronGeometry()
const material = new THREE.MeshBasicMaterial({ color: '#468585', emissive: '#468585'})
const mesh = new THREE.Mesh(geometry, material)

const bocGeometry = new THREE.BoxGeometry(2, 0.1, 2)
const boxMaterial = new THREE.MeshBasicMaterial({ color: '#B4B4B3'})
const boxMesh = new THREE.Mesh(bocGeometry, boxMaterial)
boxMesh.position.y = -1.5

scene.add(mesh, boxMesh)

// 4. Light
const light = new THREE.SpotLight(0x006769, 100)
light.position.set(1, 1, 1)
scene.add(light)

// 5. Renderer
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(devicePixelRatio)

// 6. Add Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.enableZoom = true
controls.enablePan = true

// 7. Animation Loop
function animate() {
    requestAnimationFrame(animate)
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
    boxMesh.rotation.y += 0.05
    controls.update()
    renderer.render(scene, camera)
}
animate()