import * as THREE from 'three';
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

// Cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
})

// Scene
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
camera.position.z = 3
// camera.position.x = 2
// camera.position.y = 2
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//Clock
// const clock = new THREE.Clock()

// Animations
const tick = () => {
     
    // Time
    //const currentTime = Date.now()
    //const deltaTime = currentTime - time
    //time = currentTime

    // Clock
    // const elapsedTime = clock.getElapsedTime()
    // mesh.rotation.y = elapsedTime * Math.PI * 2

    // Update Objects
    //mesh.position.x += 0.01
    //mesh.rotation.y += 0.002 * deltaTime
    // Update Camera
    // camera.position.x = Math.sin(cursor.x*10 *Math.PI *2)*3
    // camera.position.z = Math.cos(cursor.x*10 *Math.PI *2)*3
    // camera.position.y = cursor.y*5
    // camera.lookAt(mesh.position)

    //Update COntrols
    controls.update()
    // Renderer
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}
tick()