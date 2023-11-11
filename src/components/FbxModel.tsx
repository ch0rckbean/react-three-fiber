import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, CameraControls } from '@react-three/drei';

const myWidth: number = window.innerWidth;
const myHeight: number = window.innerHeight;
console.log(myWidth, myHeight);

const Scene = () => {
    // material load
    const txtLoader = new THREE.TextureLoader();
    const txt = txtLoader.load('/asset/images/Toad_tex.png');

    // fbx load
    const fbx = useLoader(FBXLoader, '/asset/images/Mush.fbx');
    fbx.position.set(0, -150, 0);

    // add material to fbx model
    fbx.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            const mesh: any = child as THREE.Mesh;
            mesh.material.map = txt;
        }
    });

    return <primitive object={fbx} scale={5} />;
};

// add animation
const AddAnimation = () => {
    const fbx = useLoader(FBXLoader, '/asset/images/Mush.fbx');
    const ref = useRef<any>();

    useEffect(() => {
        ref.current = fbx; //참조할 현재 상태에 모델 할당
        console.log(ref.current);
    }, []);

    // animation part
    useFrame((state, delta: number) => {
        ref.current.rotation.y += delta * 4;
    });

    return (
        <>
            <group dispose={null}>
                {' '}
                {/* 언마운트될 때 자원 해제 수행 : 자원 관리 */}
                <Suspense fallback={'Lodaing...'}>
                    {/* 3D 리소스 기다림 */}
                    {/* fallback: 데이터 로드 시 보여줄 대체 컨텐츠 */}
                    <Scene />
                    <OrbitControls />
                </Suspense>
            </group>
        </>
    );
};

// Basic Setting
export default function FbxModel() {
    return (
        <>
            <Canvas
                style={{
                    width: '100%',
                    height: '35vh',
                    background: '#9681eb',
                }}
                camera={{ position: [0, 50, 270] }}
            >
                <CameraControls
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 0.5}
                />
                <ambientLight intensity={2.8} />
                <directionalLight color="#FFF" position={[0, 1, 0]} />

                <PerspectiveCamera
                    fov={40}
                    near={10}
                    far={1000}
                    position={[0, 0, 350]} // 카메라 위치 조정
                />
                <AddAnimation />
            </Canvas>
        </>
    );
}
