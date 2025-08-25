import { Center, useMatcapTexture, Text3D, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import {  useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from "three"

const tourusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience()
{
    // const donutsGroup = useRef

    const donuts = useRef([])

    const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)
    
    useEffect(() => {
        matcapTexture.encoding = THREE.sRGBEncoding
        matcapTexture.needsUpdate = true
        
        material.matcap = matcapTexture
        material.needsUpdate = true
    }, [])
    // const [tourusGeometry, setTourusGeometry] = useState()
    // const [material, setMaterial] = useState()

    useFrame((state, delta) => {
        for(const donut of donuts.current) {
            donut.rotation.y += delta * 0.1
        }
    })

    
    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* <torusGeometry ref={setTourusGeometry} args={[1, 0.6, 16, 32]}/> */}
        {/* <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}

        <Center>
            <Text3D 
                material={material}
                font="./fonts/helvetiker_regular.typeface.json"
                size={0.75}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                HELLO R3F
            </Text3D>
        </Center>

        
        {/* <group ref={donutsGroup}> */}
        {[...Array(100)].map((value, index) =>
        <mesh
            ref={(element) => {
                donuts.current[index] = element
            }}
            key={index}
            geometry={tourusGeometry}
            material={material}
            position={[
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                0
            ]}
        />
        )}
        {/* </group> */}
    </>
}