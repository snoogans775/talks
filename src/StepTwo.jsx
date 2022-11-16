import React, { useRef, useState } from 'react'
import { Vector3 } from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text3D, TransformControls, OrbitControls } from '@react-three/drei'
import font from './assets/Poor-Story_Regular.json'
import mockData from './assets/someData.json'
import { EyeColorMap } from './utils/Maps'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color={props.color} />
    </mesh>
  )
}

function Boxes(props) {
  return mockData.map(item => {
    const [hide, setHide] = useState(false)
    const [hovered, hover] = useState(false)
    const ref = useRef()

    // Rotate groups toward camera
    useFrame((state, delta) => {
      const rotationInRadians = Math.atan2(
        item.latitude - state.camera.position.z,
        item.longitude - state.camera.position.x,
      )
      ref.current.rotation.y = -(rotationInRadians + Math.PI / 2)
    })

    return (
      <group
        key={item._id}
        ref={ref}
        position={[item.longitude, 0, item.latitude]}
        onClick={() => setHide(!hide)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      >
        <Box
          color={EyeColorMap.get(item.eyeColor)}
        />
        <group>
          {item.friends.map(friend => {
            return (
              <Text3D
                key={friend.id}
                font={font}
                scale={0.5}
                position={[0, 1.5 + friend.id * 0.5, 0]}
              >
                {friend.name}
                <meshStandardMaterial color={'#999'} />
              </Text3D>
            )
          })}
        </group>
      </group>
    )
  })
}

export default function StepOne() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Boxes />
      <TransformControls mode="translate" />
      <OrbitControls makeDefault />
    </Canvas>
  )
}