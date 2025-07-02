import * as THREE from 'three'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { GUI } from 'lil-gui'

// Debug UI
const gui = new GUI({
    width: 300,
    title: 'Debug UI',
    closeFolders: true
})
gui.close()

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()

// Material (shared)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false })

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material)
sphere.position.x = -1.3

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), material)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

// GUI Actions (control torus for demo)
const params = {
    spin: () => {
        gsap.to(torus.rotation, {
            y: torus.rotation.y + Math.PI * 2,
            duration: 1,
            ease: 'power2.inOut'
        })
    }
}

gui.add(torus.position, 'x').min(-3).max(3).step(0.01).name('Torus X')
gui.add(torus.position, 'y').min(-3).max(3).step(0.01).name('Torus Y')
gui.add(torus.position, 'z').min(-3).max(3).step(0.01).name('Torus Z')
gui.add(torus, 'visible').name('Torus Visible')
gui.add(material, 'wireframe').name('Wireframe')
gui.addColor(material, 'color').name('Material Color')
gui.add(params, 'spin').name('Spin Torus')

// Axes Helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
camera.position.z = 3
camera.lookAt(torus.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Fullscreen on double-click
window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})

// Handle Resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
const clock = new THREE.Clock()

// Animation Loop
const tick = () => {
  const elementTime = clock.getElapsedTime()
  sphere.rotation.y += 0.01 * elementTime
  plane.rotation.y += 0.01* elementTime
  torus.rotation.y += 0.01* elementTime

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
