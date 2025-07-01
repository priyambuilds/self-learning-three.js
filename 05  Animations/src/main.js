import * as THREE from 'three';
import './style.css'
import gsap from 'gsap'
// Scene
console.log(gsap)
const scene = new THREE.Scene()

// Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: '#ff0000' })
const mesh = new THREE.Mesh(geometry, material) 
scene.add(mesh)

// Axes Helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//Clock
//const clock = new THREE.Clock()

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2})
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0})

// Animations
const tick = () => {
     
    // Time
    //const currentTime = Date.now()
    //const deltaTime = currentTime - time
    //time = currentTime

    // Clock
    //const elapsedTime = clock.getElapsedTime()
    // mesh.rotation.y = elapsedTime * Math.PI * 2
    // mest.position.y = Math.sin(elapsedTime)
    // mesh.position.x = Math.cos(elapsedTime)

    // Update Objects
    //mesh.position.x += 0.01
    //mesh.rotation.y += 0.002 * deltaTime

    // Renderer
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}
tick()