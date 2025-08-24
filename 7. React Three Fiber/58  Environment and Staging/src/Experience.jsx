import { useFrame } from '@react-three/fiber'
import {Stage, Lightformer, Environment, Sky, BakeShadows, useHelper, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from "three"
import {useControls} from "leva"

export default function Experience()
{
    const directionalLightRef = useRef()
    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1)
    const cube = useRef()

    const {envMapHeight, envMapRadius, envMapScale, envMapIntensity} = useControls('evniornmentMap', {
        envMapIntensity: {value: 3.5, min: 0, max: 12},
        envMapHeight: { value: 7, min: 0, max: 100 },
        envMapRadius: { value: 28, min: 10, max: 1000 },
        envMapScale: { value: 100, min: 10, max: 1000 },
    })
    
    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
    })

    return <>

        {/* <Environment 
            preset="sunset"
            ground={{
                height: envMapHeight,
                radius: envMapRadius,
                scale: envMapScale

            }}
        >
            <color args={['#000000']} attach="background"/>
            <Lightformer 
                position-z={-5} 
                scale={10}
                color="red"
                intensity={10}
                form="ring"
            />
            <mesh position-z={-5} scale={10}>
                <planeGeometry />
                <meshBasicMaterial color={[100, 0, 0]}/>
            </mesh>
        </Environment> */}


        {/* <BakeShadows /> */}

        {/* <color args={['ivory']} attach="background"/> */}

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* <directionalLight 
            ref={directionalLightRef} 
            position={ [ 1, 2, 3 ] } 
            intensity={ 1.5 } 
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-top={5}
            shadow-camera-right={5}
            shadow-camera-bottom={-5}
            shadow-camera-left={-5}
            shadow-camera-near={1}
            shadow-camera-far={10}
        />
        <ambientLight intensity={ 0.5 } />

        <Sky /> */}

        {/* <mesh position-y={1} castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
        </mesh>

        <mesh position-y={1} castShadow ref={ cube } position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial envMapIntensity={envMapIntensity} color="mediumpurple" />
        </mesh> */}
        
        <Stage
            contactShadow={{opacity: 0.2, blur: 3}}
            environment="sunset"
            preset="portrait"
            intensity={2}
        >
            <mesh position-y={1} castShadow position-x={ - 2 }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
            </mesh>

            <mesh position-y={1} castShadow ref={ cube } position-x={ 2 } scale={ 1.5 }>
                <boxGeometry />
                <meshStandardMaterial envMapIntensity={envMapIntensity} color="mediumpurple" />
            </mesh>
        </Stage>

    </>
}