import * as THREE from 'three';
// Scene
const scene = new THREE.Scene()

// Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: '#ff0000' })
const mesh = new THREE.Mesh(geometry, material) 
scene.add(mesh)
mesh.position.set(0.7, -0.6, 1)

//Scale
mesh.scale.set(2, 0.5, 0.5)

// Rotation
mesh.rotation.reorder('YXZ')
mesh.rotation.set(Math.PI * 0.25, Math.PI * 0.25, 0)

// Groups
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    THREE.MeshGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
group.add(cube1)

const cube2 = new THREE.Mesh(
    THREE.MeshGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#ffebebff' })
)
cube2.position.x = -2
group.add(cube2)

const cube3 = new THREE.Mesh(
    THREE.MeshGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#0fba1eff' })
)
cube3.position.x = 2
group.add(cube3)

group.position.y = 1
group.scale.y = 2
group.rotation.y = 1

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
camera.lookAt(mesh.position)

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
