import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, CameraControls } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';

export default function LoadHBGModel(props) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF('/hamburger-draco.glb');
  return (
    <>
      <Canvas
        style={{ width: '100%', height: '100vh', background: 'orangered' }}
        camera={{ position: [20, 10, 0] }}
      >
        <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 0.5} />
        <ambientLight intensity={0.1} />
        <directionalLight color='#FFF' position={[0, 1, 0]} />

        <PerspectiveCamera
          fov={40}
          near={10}
          far={1000}
          position={[10, 0, 50]}
        />
        <group ref={groupRef} {...props} dispose={null}>
          <mesh
            geometry={nodes.bottomBun.geometry}
            material={materials.BunMaterial}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.meat.geometry}
            material={materials.SteakMaterial}
            position={[0, 2.82, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.cheese.geometry}
            material={materials.CheeseMAterial}
            position={[0, 3.03, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.topBun.geometry}
            material={materials.BunMaterial}
            position={[0, 1.77, 0]}
          />
        </group>
      </Canvas>
    </>
  );
}
useGLTF.preload('/hamburger.glb');
