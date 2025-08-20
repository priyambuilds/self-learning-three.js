import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import fireworkVertexShader from './shaders/firework/vertex.glsl'
import fireworkFragmentShader from './shaders/firework/fragment.glsl'
import gsap from 'gsap'

/**
 * Base
 */
// Debug
const gui = new GUI({ width: 340 })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Loaders
const textureLoader = new THREE.TextureLoader()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
}
sizes.resolution = new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height  * sizes.pixelRatio)

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)
    sizes.resolution = new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height  * sizes.pixelRatio)

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(sizes.pixelRatio)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1.5, 0, 6)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(sizes.pixelRatio)

const textures = [
    textureLoader.load('./static/particles/1.png'),
    textureLoader.load('./static/particles/2.png'),
    textureLoader.load('./static/particles/3.png'),
    textureLoader.load('./static/particles/4.png'),
    textureLoader.load('./static/particles/5.png'),
    textureLoader.load('./static/particles/6.png'),
    textureLoader.load('./static/particles/7.png'),
    textureLoader.load('./static/particles/8.png'),
]

// Fireworks
const createFirework = (count, position, size, texture, radius, color) => {
    // Geometry
    const positionsArray = new Float32Array(count * 3)
    const sizesArray = new Float32Array(count)

    for(let i = 0; i < count; i++) {
        const i3 = i*3

        const spherical = new THREE.Spherical(
            radius * (0.75 + Math.random() * 0.25),
            Math.random() * Math.PI,
            Math.random() * Math.PI * 2
        )

        const position = new THREE.Vector3()
        position.setFromSpherical(spherical)

        positionsArray[i3] = position.x
        positionsArray[i3 + 1] = position.y
        positionsArray[i3 + 2] = position.z

        sizesArray[i] = Math.random()
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3))
    geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizesArray, 1))

    // Material
    texture.flipY = false
    const material = new THREE.ShaderMaterial({
        vertexShader: fireworkVertexShader,
        fragmentShader: fireworkFragmentShader,
        uniforms: {
            uSize: new THREE.Uniform(size),
            uResolution: new THREE.Uniform(sizes.resolution),
            uTexture: new THREE.Uniform(texture),
            uColor: new THREE.Uniform(color),
            uProgress: new THREE.Uniform(0)
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    })

    // Points
    const firework = new THREE.Points(geometry, material)
    firework.position.copy(position)
    scene.add(firework)

    // Destroy
    const destroy = () => {
        scene.remove(firework)
        geometry.dispose()
        material.dispose()
    }

    // Animate
    gsap.to(
        material.uniforms.uProgress,
        {value: 1, duration: 3, ease: 'linear', onComplete: destroy}
    )
}

createFirework(
    100, // count
    new THREE.Vector3(), // position
    0.5, // size
    textures[7], // textures
    1, // radius
    new THREE.Color('#8affff'), // Color
)

window.addEventListener('click', () => {
    createFirework(
    100, // count
    new THREE.Vector3(), // position
    0.5, // size
    textures[7], // textures
    1, // radius
    new THREE.Color('#8affff'), // Color
)
})

/**
 * Animate
 */
const tick = () =>
{
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()