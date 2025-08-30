import { shaderMaterial, Sparkles, Center, useTexture, useGLTF, OrbitControls } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import portalVertexShader from './shaders/portal/vertex.js'
import portalFragmentShader from './shaders/portal/fragment.js'

const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color(0xffffff),
        uColorEnd: new THREE.Color(0x000000)
    },
    portalVertexShader,
    portalFragmentShader
)

// Add key for hot reload
PortalMaterial.key = THREE.MathUtils.generateUUID()

extend({ PortalMaterial })

export default function Experience()
{
    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false
    const { nodes } = useGLTF('./model/portal.glb')
    
    // Create ref for the portal material
    const portalMaterialRef = useRef()
    
    // Update uTime uniform each frame
    useFrame((state) => {
        if (portalMaterialRef.current) {
            portalMaterialRef.current.uTime = state.clock.elapsedTime
        }
    })

    return <>
        <color args={['#201919']} attach="background"/>
        <Center>
            <OrbitControls makeDefault />

            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedTexture}/>
            </mesh>

            <mesh geometry={nodes.poleLightA.geometry} position={nodes.poleLightA.position}>
                <meshBasicMaterial color="#ffffe5"/>
            </mesh>
            
            <mesh geometry={nodes.poleLightB.geometry} position={nodes.poleLightB.position}>
                <meshBasicMaterial color="#ffffe5"/>
            </mesh>
            
            <mesh geometry={nodes.portalLight.geometry} position={nodes.portalLight.position} rotation={nodes.portalLight.rotation}>
                <portalMaterial 
                    ref={portalMaterialRef}
                    key={PortalMaterial.key}
                />
            </mesh>

            <Sparkles 
                size={6}
                scale={[4, 2, 4]}
                position-y={1}
                speed={0.2}
                count={40}
            />
        </Center>
    </>
}
