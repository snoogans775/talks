import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Text3D } from '@react-three/drei'
import font from './assets/Poor-Story_Regular.json'
import { radiansToDegrees } from './utils/Objects'
import { normalizeMousePosition } from './utils/Browser'
import useMouse from './hooks/useMouse'

function ImpressiveText({ zoomOnLoad, ...props }) {
  const ref = useRef()
  const [clicked, click] = useState(false)
  const [zPosition, setZPosition] = useState(-100)

  useFrame((state, delta) => {
    if (zoomOnLoad && zPosition < 0) setZPosition(zPosition + 1)
    if (clicked) {
      ref.current.rotation.x += 0.05
      if (radiansToDegrees(ref.current.rotation.x) > 360) {
        click(false)
        ref.current.rotation.x = 0
      }
    }
  })

  return (
    <Text3D
      {...props}
      font={font}
      ref={ref}
      onClick={() => click(!clicked)}
      scale={1}
      position={[-4, 0, zPosition]}
    >
      Welcome
      <meshStandardMaterial color={'#992288'} />
    </Text3D>

  )
}

function LightSwitch({ clicked, ...props }) {
  const flipperPosition = [
    props.position[0] - 0.1,
    props.position[1] + clicked ? 0.3 : -0.3,
    props.position[2] + 1
  ]
  const xRotation = clicked ? 1 : -1;
  const lightswitchColor = '#3391d1';
  return (<>
    <mesh
      {...props}
    >
      <boxGeometry args={[1, 2, 0.3]}
      />
      <meshStandardMaterial color={lightswitchColor}/>
    </mesh>

    <mesh
      {...props}
      scale={0.4}
      rotation={[xRotation, 0, 0]}
      position={flipperPosition}
    >
      <boxGeometry args={[1, 2, 1]}
      />
      <meshStandardMaterial color={lightswitchColor} />
    </mesh>
  </>)
}

function NextButton(props) {
  const navigate = useNavigate()
  return (
    <Text3D
      {...props}
      font={font}
      onClick={() => navigate('one')}
      scale={1}
    >
      Next
      <meshStandardMaterial color={'#992288'} />
    </Text3D>
  )
}

export default function Intro() {
  const [isLightOn, setIsLightOn] = useState(false)
  const [showLightswitch, setShowLightSwitch] = useState(true)
  const mousePos = useMouse()
  const { mouseX, mouseY } = normalizeMousePosition(mousePos)

  function toggleLight() {
    setIsLightOn(!isLightOn)
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <NextButton />
      <Canvas>
        <ambientLight
          color={'#a33'}
          position={[0,0, 20]}
          intensity={1}
        />
        <pointLight
          color={'#ff4'}
          position={[mouseX * 10 - 5, mouseY * 10 - 5, 20]}
          intensity={isLightOn ? 5 : 0}
        />
        <ImpressiveText zoomOnLoad />
        {showLightswitch &&
          <LightSwitch
            onClick={toggleLight}
            clicked={isLightOn}
            position={[2, 0, 0]}
          />
        }
      </Canvas>
    </div>
  )
}
