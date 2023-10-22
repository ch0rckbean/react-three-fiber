import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, CameraControls } from '@react-three/drei';
// obj Model
import { Mesh } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

function LoadObjModel({ args, pst }) {
  const hat = useLoader(OBJLoader, '/MagicHat.obj');
  useEffect(() => {
    const mtlLoader = new MTLLoader();
    mtlLoader.load('/MagicHat.mtl', (mtl) => {
      mtl.preload();
      console.log(mtl.materials);
      console.log(hat.material);
      for (const material of Object.values(hat.material)) {
        if (material instanceof Mesh) {
          material.material = mtl.materials[material.name];
        }
      }
    });
  }, []);

  return (
    <>
      <primitive object={hat} args={args} position={pst} />
      {/* <meshStandardMaterial /> */}
    </>
  );
}

export default function ObjModel() {
  return (
    <>
      <Canvas
        style={{ width: '100%', height: '100vh', background: 'purple' }}
        camera={{ position: [0, 5, 0] }}
      >
        <PerspectiveCamera position={[0, 4]} />
        <CameraControls minPolarAngle={0} maxPolarAngle={Math.PI / 0.5} />
        <ambientLight intensity={0.1} />
        <directionalLight color='#F5EEC8' position={[0, 1, 0]} />
        <LoadObjModel args={[4, 4, 4]} pst={[0, 0, 0]} />
      </Canvas>
    </>
  );
}
