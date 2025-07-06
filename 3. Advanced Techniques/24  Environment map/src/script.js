import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js'
import {EXRLoader} from 'three/examples/jsm/loaders/EXRLoader.js'
import {GroundedSkybox} from 'three/examples/jsm/objects/GroundedSkybox.js'

//Loader
const gltfLoader = new GLTFLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const rgbeLoader = new RGBELoader()
const exrLoader = new EXRLoader()
/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Enviornment Map
scene.environmentIntensity = 1
scene.environmentBlurriness = 0
scene.backgroundBlurriness = 0
scene.backgroundIntensity = 1

gui.add(scene, 'environmentIntensity').min(0).max(10).step(0.001).name('envMap Intensity')
gui.add(scene, 'environmentBlurriness').min(0).max(1).step(0.001).name('envMap Blurriness')
gui.add(scene, 'backgroundBlurriness').min(0).max(1).step(0.001).name('background Blurriness')
gui.add(scene, 'backgroundIntensity').min(0).max(10).step(0.001).name('background Intensity')

//LDR Cube texture
// const environmentMap = cubeTextureLoader.load([
//     './src/static/environmentMaps/0/px.png',
//     './src/static/environmentMaps/0/nx.png',
//     './src/static/environmentMaps/0/py.png',
//     './src/static/environmentMaps/0/ny.png',
//     './src/static/environmentMaps/0/pz.png',
//     './src/static/environmentMaps/0/nz.png',
// ])
// scene.environment = environmentMap
// scene.background = environmentMap

// HDR (RGBE) Equirectangular
// rgbeLoader.load('./src/static/environmentMaps/blender2k2.hdr', 
//     (environmentMap) => {
//         environmentMap.mapping = THREE.EquirectangularReflectionMapping
//         scene.background = environmentMap
//         scene.environment = environmentMap
//     }
// )

// HDR (EXR) Equirectangular
// exrLoader.load('./src/static/environmentMaps/nvidiaCanvas-4k.exr',
//     (environmentMap) => {
//         environmentMap.mapping = THREE.EquirectangularReflectionMapping
//         scene.background = environmentMap
//         scene.environment = environmentMap
//     })

// LDR Equirectangular
// const environmentMap = textureLoader.load('./src/static/environmentMaps/blockadesLabsSkybox/anime_art_style_japan_streets_with_cherry_blossom_.jpg',
//     () => {
//         environmentMap.mapping = THREE.EquirectangularReflectionMapping
//         environmentMap.colorSpace = THREE.SRGBColorSpace
//         scene.background = environmentMap
//         scene.environment = environmentMap
//     }
// )

// Ground projected skybox
rgbeLoader.load('./src/static/environmentMaps/2/2k.hdr',
    (environmentMap) => {
        environmentMap.mapping = THREE.EquirectangularReflectionMapping
        scene.environment = environmentMap

        //Skybox
        const skybox = new GroundedSkybox(environmentMap, 15, 70)
        skybox.position.y = 15
        scene.add(skybox)

    }
)

/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
    new THREE.MeshStandardMaterial({
        metalness: 1,
        roughness: 0.2,
        color: 0xaaaaaa,
    })
)
scene.add(torusKnot)
torusKnot.position.y = 4
torusKnot.position.x = -4
scene.add(torusKnot)

// models
gltfLoader.load(
    './src/static/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) => {
        gltf.scene.scale.set(10, 10, 10)
        scene.add(gltf.scene)
    },
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 5, 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () =>
{
    // Time
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()