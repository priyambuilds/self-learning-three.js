import * as THREE from 'three'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { GUI } from 'lil-gui'

// Texture Loader
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const colorTexture = textureLoader.load('./src/textures/door/color.jpg')
const alphaTexture = textureLoader.load('./src/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('./src/textures/door/height.jpg')
const normalTexture = textureLoader.load('./src/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('./src/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('./src/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('./src/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./src/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('./src/textures/gradients/3.jpg')
const environmentMapTexture = cubeTextureLoader.load(
  ['./src/textures/environmentMaps/0/px.jpg', 
    './src/textures/environmentMaps/0/nx.jpg', 
    './src/textures/environmentMaps/0/py.jpg', 
    './src/textures/environmentMaps/0/ny.jpg', 
    './src/textures/environmentMaps/0/pz.jpg', 
    './src/textures/environmentMaps/0/nz.jpg'])


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

// Material
// const material = new THREE.MeshBasicMaterial()
// const material = new THREE.MeshNormalMaterial()
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture
// const material = new THREE.MeshDepthMaterial()
// const material = new THREE.MeshLambertMaterial()
// const material = new THREE.MeshPhongMaterial()
// const material = new THREE.MeshToonMaterial()
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
// material.map = colorTexture
// material.aoMap = ambientOcclusionTexture
// material.displacementMap = heightTexture
// material.displacementScale = 0.2
// material.metalnessMap = metalnessTexture
// material.roughnessMap = roughnessTexture
// material.normalMap = normalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = alphaTexture
material.envMap = environmentMapTexture

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material)
sphere.position.x = -1.3
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 64, 128), material)
torus.position.x = 1.5
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))
scene.add(sphere, plane, torus)

//Lightinng
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// GUI Actions
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
gui.add(material, 'metalness').min(0).max(1).step(0.01).name('Metalness')
gui.add(material, 'roughness').min(0).max(1).step(0.01).name('Roughness')
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.01).name('AO Intensity')
gui.add(material, 'displacementScale').min(0).max(1).step(0.01).name('Displacement Scale')
gui.add(params, 'spin').name('Spin Torus')
// Axes Helper
scene.add(new THREE.AxesHelper(2))

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

// Fullscreen toggle
window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})

// Resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Animation
const clock = new THREE.Clock()
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
