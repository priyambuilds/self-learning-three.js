import { OrbitControls } from '@react-three/drei'
import {button, useControls} from 'leva'
import { Perf } from 'r3f-perf'

export default function Experience()
{

    const {position, color, visible} = useControls('sphere', {
        position: {
            value: {x: -2, y: 0},
            step: 0.01,
            joystick: 'invertY'
        },
        color: '#ff0000',
        visible: true,
        myInterval:{
            min: 0,
            max: 10,
            calue: [4, 5]
        },
        clickMe: button(() => {
            console.log('ok')
        }),
        choice: {options: ['a', 'b', 'c']}
    })

    const {scale} = useControls('cube', {
        scale: {
            value: 1.5,
            step: 0.01,
            min: 0,
            max: 5
        }
    })

    return <>

        <Perf />

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh visible={visible} position={[position.x, position.y, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color={color}/>
        </mesh>

        <mesh scale={scale} position-x={ 2 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}