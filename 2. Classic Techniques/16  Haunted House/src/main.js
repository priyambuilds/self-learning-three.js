import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/addons/objects/Sky.js'


/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Textures
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('./src/static/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./src/static/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./src/static/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./src/static/door/height.jpg')
const doorNormalTexture = textureLoader.load('./src/static/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./src/static/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./src/static/door/roughness.jpg')
const floorAlphaTexture = textureLoader.load('./src/static/floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./src/static/floor/coast_sand_rocks_02_diff_1k.jpg')
const floorARMTexture = textureLoader.load('./src/static/floor/coast_sand_rocks_02_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./src/static/floor/coast_sand_rocks_02_nor_gl_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./src/static/floor/coast_sand_rocks_02_disp_1k.jpg')

const brickArmTexture = textureLoader.load('./src/static/bricks/castle_brick_broken_06_arm_1k.jpg')
const brickColorTexture = textureLoader.load('./src/static/bricks/castle_brick_broken_06_diff_1k.jpg')
const brickNorTexture = textureLoader.load('./src/static/bricks/castle_brick_broken_06_nor_gl_1k.jpg')

const roofArmTexture = textureLoader.load('./src/static/roof/roof_slates_02_arm_1k.jpg')
const roofColorTexture = textureLoader.load('./src/static/roof/roof_slates_02_diff_1k.jpg')
const roofNorTexture = textureLoader.load('./src/static/roof/roof_slates_02_nor_gl_1k.jpg')

const grassArmTexture = textureLoader.load('./src/static/grass/leaves_forest_ground_arm_1k.jpg')
const grassColorTexture = textureLoader.load('./src/static/grass/leaves_forest_ground_diff_1k.jpg')
const grassNorTexture = textureLoader.load('./src/static/grass/leaves_forest_ground_nor_gl_1k.jpg')

const graveArmTexture = textureLoader.load('./src/static/Grave/plastered_stone_wall_arm_1k.jpg')
const graveColorTexture = textureLoader.load('./src/static/Grave/plastered_stone_wall_diff_1k.jpg')
const graveNorTexture = textureLoader.load('./src/static/Grave/plastered_stone_wall_nor_gl_1k.jpg')

floorColorTexture.colorSpace = THREE.SRGBColorSpace
brickColorTexture.colorSpace = THREE.SRGBColorSpace
roofColorTexture.colorSpace = THREE.SRGBColorSpace
grassColorTexture.colorSpace = THREE.SRGBColorSpace
graveColorTexture.colorSpace = THREE.SRGBColorSpace
doorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8,8)
floorARMTexture.repeat.set(8,8)
floorNormalTexture.repeat.set(8,8)
floorDisplacementTexture.repeat.set(8,8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapS = floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapS = floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapS = floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = floorDisplacementTexture.wrapT = THREE.RepeatWrapping

roofColorTexture.repeat.set(3,1)
roofArmTexture.repeat.set(3,1)
roofNorTexture.repeat.set(3,1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofArmTexture.wrapS = THREE.RepeatWrapping
roofNorTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.repeat.set(2,1)
grassArmTexture.repeat.set(2,1)
grassNorTexture.repeat.set(2,1)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassArmTexture.wrapS = THREE.RepeatWrapping
grassNorTexture.wrapS = THREE.RepeatWrapping

graveColorTexture.repeat.set(0.3, 0.4)
graveArmTexture.repeat.set(0.3, 0.4)
graveNorTexture.repeat.set(0.3, 0.4)

graveColorTexture.wrapS = THREE.RepeatWrapping
graveArmTexture.wrapS = THREE.RepeatWrapping
graveNorTexture.wrapS = THREE.RepeatWrapping

/**
 * House
 */

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.2
  })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementBias')

// House Container
const house = new THREE.Group()
scene.add(house)

//Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: brickColorTexture,
    aoMap: brickArmTexture,
    roughnessMap: brickArmTexture,
    metalnessMap: brickArmTexture,
    normalMap: brickNorTexture
  })
)
walls.position.y = 2.5 / 2
house.add(walls)

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofArmTexture,
    roughnessMap: roofArmTexture,
    metalnessMap: roofArmTexture,
    normalMap: roofNorTexture
  })
)
roof.position.y = 2.5 + 0.5
roof.rotation.y = Math.PI * 0.25
house.add(roof)
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Doorlight
const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)

// Ghosts
const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add(ghost1, ghost2, ghost3)

// Door 
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    roughnessMap: doorRoughnessTexture,
    metalnessMap: doorMetalnessTexture,
    normalMap: doorNormalTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.15,
    displacementBias: - 0.04
  })
)
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

// Bushes
const bushesGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushesMaterial = new THREE.MeshStandardMaterial({
  color: '#ccffcc',
  map: grassColorTexture,
  aoMap: grassArmTexture,
  roughnessMap: grassArmTexture,
  metalnessMap: grassArmTexture,
  normalMap: grassNorTexture
})

const bush1 = new THREE.Mesh(bushesGeometry, bushesMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x = -0.75

const bush2 = new THREE.Mesh(bushesGeometry, bushesMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)
bush2.rotation.x = -0.75

const bush3 = new THREE.Mesh(bushesGeometry, bushesMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)
bush3.rotation.x = -0.75

const bush4 = new THREE.Mesh(bushesGeometry, bushesMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)
bush4.rotation.x = -0.75
scene.add(bush1, bush2, bush3, bush4)

//Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  aoMap: graveArmTexture,
  roughnessMap: graveArmTexture,
  metalnessMap: graveArmTexture,
  normalMap: graveNorTexture,
})
const graves = new THREE.Group()
house.add(graves)
for(let i=0;i<30;i++) {
  //Mesh
  const angle = Math.random() * Math.PI * 2
  const radius = 3 + Math.random() * 4
  //Position
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius
  const y = Math.random() * 0.4
  const grave = new THREE.Mesh(graveGeometry, graveMaterial)
  //Position
  grave.position.set(x, y, z)
  // Rotation
  grave.rotation.x = (Math.random() -0.5 )* 0.4
  grave.rotation.y = (Math.random() -0.5 )* 0.4
  grave.rotation.z = (Math.random() -0.5 )* 0.4
  // Add graves to the scene
  graves.add(grave)
}

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//Shadows

// Renderer
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

//Cast and receive
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true
walls.castShadow = true
roof.castShadow = true
floor.receiveShadow = true
walls.receiveShadow = true

for(const grave of graves.children)
{
    grave.castShadow = true
    grave.receiveShadow = true
}

// Mapping
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

//Sky
const sky = new Sky()
sky.scale.set(100, 100, 100)
scene.add(sky)
sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

//Fog
scene.fog = new THREE.FogExp2('#02323f', 0.1)

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Ghosts
    const GhostAngel = elapsedTime * 0.5
    ghost1.position.x = Math.cos(GhostAngel) * 4
    ghost1.position.z = Math.sin(GhostAngel) * 4
    ghost1.position.y = Math.sin(GhostAngel) * Math.sin(GhostAngel * 2.34) * Math.sin(GhostAngel * 3.45)

    const GhostAngel2 = - elapsedTime * 0.38
    ghost2.position.x = Math.cos(GhostAngel2) * 5
    ghost2.position.z = Math.sin(GhostAngel2) * 5
    ghost2.position.y = Math.sin(GhostAngel2) * Math.sin(GhostAngel2 * 2.34) * Math.sin(GhostAngel2 * 3.45)

    const GhostAngel3 = - elapsedTime * 0.18
    ghost3.position.x = Math.cos(GhostAngel3) * 5
    ghost3.position.z = Math.sin(GhostAngel3) * 5
    ghost3.position.y = Math.sin(GhostAngel3) * Math.sin(GhostAngel3 * 2.34) * Math.sin(GhostAngel3 * 3.45)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()