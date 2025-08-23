import {MeshReflectorMaterial, Float, Text, Html, PivotControls, TransformControls, OrbitControls} from '@react-three/drei'
import { useRef } from 'react'

export default function Experience()
{
    const cubeRef = useRef()
    const sphereRef = useRef()

    return <>

        <OrbitControls makeDefault />


        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <PivotControls anchor={[0, 0, 0]} depthTest={false} lineWidth={3} fixed={true} scale={100}>
            <mesh ref={sphereRef} position-x={ - 2 }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
                <Html 
                    position={[1, 1, 0]}
                    wrapperClass='label'
                    center
                    distanceFactor={6}
                    occlude={[sphereRef, cubeRef]}
                >That's a sphere 👍</Html>
            </mesh>
        </PivotControls>
        
        <mesh ref={cubeRef} position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <TransformControls object={cubeRef} mode="translate"/>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            {/* <meshStandardMaterial color="greenyellow" /> */}
            <MeshReflectorMaterial 
                resolution={512} 
                blur={[1000, 1000]} 
                mixBlur={1} 
                mirror={0.75}
                color="greenyellow"
            />
        </mesh>

        <Float speed={5} floatIntensity={2}>
            <Text
                font='./bangers-v20-latin-regular.woff'
                fontSize={1}
                color="salmon"
                position-y={2}
                maxWidth={2}
                textAlign='center'
            >I Love R3F</Text>
        </Float>

    </>
}