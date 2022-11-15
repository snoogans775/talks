import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D } from '@react-three/drei'
import font from './assets/Poor-Story_Regular.json'
import { RadiansToDegrees } from './utils/Objects'
import { normalizeMousePosition } from './utils/Browser'
import useMouse from './hooks/useMouse'
import NextButton from './NextButton'

function ImpressiveText({ zoomOnLoad, setShowLightSwitch, ...props }) {
  const ref = useRef()
  const [clicked, click] = useState(false)
  const [zPosition, setZPosition] = useState(-100)

  useFrame((state, delta) => {
    // Zoom in text!
    if (zoomOnLoad && zPosition < 0) setZPosition(zPosition + 1)

    // Rotate when clicked!
    if (clicked) {
      ref.current.rotation.x += 0.05
      if (RadiansToDegrees(ref.current.rotation.x) > 360) {
        setShowLightSwitch(true)
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
      Touch me
      <meshStandardMaterial color={'#992288'} />
    </Text3D>

  )
}

function Lightswitch({ clicked, ...props }) {
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
      <meshStandardMaterial color={lightswitchColor} />
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

export default function Intro() {
  const [isLightOn, setIsLightOn] = useState(false)
  const [showLightswitch, setShowLightSwitch] = useState(false)
  const [showNextButton, setShowNextButton] = useState(false)
  const mousePos = useMouse()
  const { mouseX, mouseY } = normalizeMousePosition(mousePos)

  function handleLightswitchClick() {
    setIsLightOn(!isLightOn)
    if (showNextButton === false) setShowNextButton(true)
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Canvas>
        <ambientLight
          color={'#a33'}
          position={[0, 0, 20]}
          intensity={1}
        />
        <pointLight
          color={'#ff4'}
          position={[mouseX * 10 - 5, mouseY * 10 - 5, 20]}
          intensity={isLightOn ? 5 : 0}
        />
        <ImpressiveText
          zoomOnLoad
          setShowLightSwitch={setShowLightSwitch}
        />
        {showLightswitch &&
          <Lightswitch
            onClick={handleLightswitchClick}
            clicked={isLightOn}
            position={[2, 0, 0]}
          />
        }
        {showNextButton && <NextButton to='/one' position={[1, 1, 1]} />}
      </Canvas>
    </div>
  )
}
