import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Text3D } from '@react-three/drei'
import font from './assets/Poor-Story_Regular.json'

export default function NextButton({to, ...props}) {
  const navigate = useNavigate()
  return (
    <Text3D
      {...props}
      font={font}
      onClick={() => navigate(to, {replace: true})}
      scale={0.5}
    >
      Next
      <meshStandardMaterial color={'#fff'} />
    </Text3D>
  )
}