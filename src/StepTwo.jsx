import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text3D, TransformControls, OrbitControls } from '@react-three/drei'
import font from './assets/Poor-Story_Regular.json'
import mockData from './assets/someData.json'
import { EyeColorMap } from './utils/Maps'
import { RadiansToDegrees } from './utils/Objects'

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
      <meshLambertMaterial />
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
        item.latitude - state.camera.position.x,
        item.longitude - state.camera.position.z
      )
      ref.current.rotation.y = rotationInRadians
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
          color={item.eyeColor}
        />
        <group>
          {item.friends.map(friend => {
            return (
              <Text3D key={friend.id} font={font} scale={0.2} position={[0, 1 + friend.id * 0.3, 0]}>
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