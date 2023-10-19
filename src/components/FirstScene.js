import React from 'react';
// ** react-three-fiber
// import { createRoot } from 'react-dom/client';
import { PerspectiveCamera, CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export default function FirstScene() {
  return (
    <div>
      <Canvas
        camera={{ position: [5, 5, 0] }}
        style={{ width: '100%', height: '50vh', background: 'blue' }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight color='yellow' position={[0.0, 1, 0]} />
        <PerspectiveCamera position={[0.0, 4]} />
        <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.6} />

        <mesh>
          <boxGeometry args={[4, 4, 4]} position={[0, 5, 0]} />
          <meshStandardMaterial color='aqua' />
        </mesh>
      </Canvas>
    </div>
  );
}
// createRoot(document.getElementById('root')).render(<FirstScene />);
// App으로 해당 컴포넌트가 전달되고,
// index.js에서 이미 createRoot를 통해 render하고 있으므로 필요 없음음
