import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, CameraControls } from '@react-three/drei';

function AddAnimation({ args, pst }) {
  // Mesh Object로 직접 접근하게 함
  const ref = useRef();
  // 이벤트를 위한 useState
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  // 애니메이션을 위한 useFrame
  useFrame((state, delta) => (ref.current.rotation.y += delta));
  console.log(hovered);
  return (
    <>
      {/* Object Setting*/}
      <mesh
        ref={ref}
        scale={clicked ? 6 : 4}
        style={hovered ? { background: 'aqua' } : { background: 'blue' }}
        onClick={(e) => setClicked(!clicked)}
        onPointerEnter={(e) => setHovered(true)}
        onPointerOut={(e) => setHovered(false)}
      >
        <boxGeometry args={args} position={pst} />
        <meshPhongMaterial color='#687EFF' />
      </mesh>
    </>
  );
}

export default function AddAnimationContainer() {
  return (
    <div>
      <Canvas
        style={{ width: '100%', height: '50vh', background: 'yellow' }}
        camera={{ position: [0, 5, 0] }}
      >
        {/* Basic Setting */}
        <PerspectiveCamera position={[0.0, 4]} />
        <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 0.5} />
        <ambientLight intensity={0.1} />
        <directionalLight color='#F5EEC8' position={[0, 1, 0]} />

        {/* import Object Component */}
        <AddAnimation args={[4, 4, 4]} pst={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}
