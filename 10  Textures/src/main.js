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

// Texture
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
    console.log('⏳ Loading started')
}
loadingManager.onLoad = () => {
    console.log('✅ Loading finished')
}
loadingManager.onProgress = () => {
    console.log('⏳ Loading progressing')
}
loadingManager.onError = () => {
    console.log('❌ Loading error')
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('./src/textures/door/color.jpg')
// const alphaTexture = textureLoader.load('./src/textures/door/alpha.jpg')
// const heightTexture = textureLoader.load('./src/textures/door/height.jpg')
// const normalTexture = textureLoader.load('./src/textures/door/normal.jpg')
// const ambientOcclusionTexture = textureLoader.load('./src/textures/door/ambientOcclusion.jpg')
// const metalnessTexture = textureLoader.load('./src/textures/door/metalness.jpg')
// const roughnessTexture = textureLoader.load('./src/textures/door/roughness.jpg')

// colorTexture.repeat.set(2, 2)
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.minFilter = THREE.NearestFilter
// colorTexture.magFilter = THREE.NearestFilter

// Material & Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// GUI Actions
const params = {
    spin: () => {
        gsap.to(mesh.rotation, {
            y: mesh.rotation.y + Math.PI * 2,
            duration: 1,
            ease: 'power2.inOut'
        })
    }
}

gui.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('Position X')
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('Position Y')
gui.add(mesh.position, 'z').min(-3).max(3).step(0.01).name('Position Z')
gui.add(mesh, 'visible').name('Visible')
gui.add(material, 'wireframe').name('Wireframe')
gui.addColor(material, 'color').name('Cube Color')
gui.add(params, 'spin').name('Spin')


// Axes Helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Fullscreen on double click
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

// Animation Loop
const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
