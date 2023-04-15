import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, useGLTF } from "@react-three/drei";
import { CanvasTexture } from "three";
import moonModel from "../blender/moon.glb"
import sunModel from "../blender/sun.glb"
import { BufferGeometry, Float32BufferAttribute, PointsMaterial } from 'three';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import { Color } from "three";

const Moon = () => {
  const gltf = useGLTF(moonModel);
  useEffect(() => {
    gltf.scene.scale.set(0.11, 0.11, 0.11);
  }, [gltf]);

  const meshRef = useRef();

  useFrame(({ clock }) => {
    meshRef.current.rotation.y += 0.0005;
    meshRef.current.rotation.x += 0.0005;
  });
  

  return (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      position={[0, 0, -5]}
      scale={0.02}
    />
  );
};

const createRoundTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.1, 'rgba(255, 255, 255, 0.9)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new CanvasTexture(canvas);
};

const Starz = () => {
  const particleCount = 2000;
  const radius = 5000;

  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colorOptions = [
    { r: 1, g: 0.5, b: 0 }, // Orange
    { r: 1, g: 1, b: 0 },   // Yellow
    { r: 0, g: 0.5, b: 1 }, // Blue
  ];

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const x = (Math.random() - 0.5) * radius;
    const y = (Math.random() - 0.5) * radius;
    const z = (Math.random() - 0.5) * radius;
    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    const chosenColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    colors[i3] = chosenColor.r;
    colors[i3 + 1] = chosenColor.g;
    colors[i3 + 2] = chosenColor.b;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

  const texture = createRoundTexture();

  const material = new PointsMaterial({
    size: 6,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 1,
    map: texture,
  });

  const starsRef = useRef();

  return (
    <group ref={starsRef}>
      <points geometry={geometry} material={material} />
    </group>
  );
};

const Sun = () => {
  const gltf = useGLTF(sunModel);

  useEffect(() => {
    gltf.scene.rotation.x = Math.PI;
    gltf.scene.scale.set(4, 4, 4);
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.material.emissive = new Color(0xffee88);
        child.material.emissiveIntensity = 5;
      }
    });
  }, [gltf]);

  return (
    <>
      <primitive object={gltf.scene} position={[0, 0, -2000]} />
      <pointLight
        color={0xffffff}
        intensity={2}
        distance={500}
        decay={2}
        position={[0, 0, -190]}
      />
       <EffectComposer>
        <Bloom
          kernelSize={3}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.5}
          intensity={1.5}
        />
        <DepthOfField
          focusDistance={0.02}
          focalLength={0.5}
          bokehScale={2}
          height={480}
        />
      </EffectComposer>
    </>
  );
};


const MoonScene = () => {
  const cameraRef = useRef();
  

  return (
    <Canvas
      style={{ position: "absolute", top: 0, left: 0 }}
      useSetBackgroundColor
      size={{ width: window.innerWidth, height: window.innerHeight }}
      onCreated={({ gl }) => {
        gl.setClearColor("black");
      }}
    >
      <PerspectiveCamera ref={cameraRef} makeDefault position={[120, 10, 100]} far={50000} />
      <OrbitControls
        camera={cameraRef.current}
        target={[0, 0, -5]}
        enableZoom={true}
        enablePan={true}
        panSpeed={0.5}
        minDistance={10}
        maxDistance={400}
      />
      <Sun />
      <Moon />
      <Starz />
      <EffectComposer>
        <Bloom
          kernelSize={3}
          luminanceThreshold={0.1}
          luminanceSmoothing={0.5}
          intensity={1.5}
        />
        <DepthOfField
          focusDistance={0.02}
          focalLength={0.5}
          bokehScale={2}
          height={480}
        />
      </EffectComposer>
    </Canvas>
  );
};


export default MoonScene;
