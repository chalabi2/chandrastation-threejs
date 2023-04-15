import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, useGLTF, Text, Line, Html } from "@react-three/drei";
import moonModel from "../blender/lune.glb"
import sunModel from "../blender/sun.glb"
import { BufferGeometry, Float32BufferAttribute, PointsMaterial, Color, TextureLoader, CanvasTexture } from 'three';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import earthTextureURL from '../blender/8k_earth_daymap.jpg'
import * as THREE from 'three';

const FlickeringText = () => {
  const textRef = useRef();
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setOpacity(Math.random() * 0.5 + 0.5); // Adjust the opacity range for more hologram-like flickering
    }, 10); // Reduce the interval for a faster flickering effect
    return () => clearInterval(flickerInterval);
  }, []);

  return (
    <Text
    letterSpacing={1}
      font='Futura'
      ref={textRef}
      position={[0, 2, -7.5]} // Adjust this to position the text closer to the Moon's surface
      rotation={[0, Math.PI, 0]} // Rotate the text around the Y-axis by 180 degrees
      fontSize={0.2} // Make the text smaller
      color="#00FFFF" // Saturated neon cyan color
      outlineWidth={0.001}
      outlineColor="#ffffff"
      anchorX="center"
      anchorY="middle"
      opacity={opacity}
    >
      CHANDRA STATION
    </Text>
  );
};

const CraterButton = ({ points, onClick, label }) => {
  const [hover, setHover] = useState(false);

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  return (
    <group
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <Line
        points={points}
        color={hover ? "cyan" : "white"}
        lineWidth={0.3}
        position={[-1, 0, 1]}
        rotation={[0, Math.PI, 0]}
      />
      {hover && (
        <Html center>
          <div
            style={{
              backgroundColor: "rgba(0, 255, 255, 0.7)",
              padding: "0.2rem",
              borderRadius: "5px",
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </group>
  );
};

const Moon = () => {
  const gltf = useGLTF(moonModel);
  useEffect(() => {
    gltf.scene.scale.set(3, 3, 3);
  }, [gltf]);

  const meshRef = useRef();

  
  const handleClick = () => {
    console.log('click')
  };

  const createCirclePoints = (radius, segments) => {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(theta);
      points.push(new THREE.Vector3(x, y, 0));
    }
    return points;
  };
  
  // Use the createCirclePoints function to create circle points
  const points = createCirclePoints(0.1, 32);

  return (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      position={[0, 0, -5]}
      scale={0.02}
    >
<CraterButton points={points} onClick={handleClick} label="Button" />

    </primitive>
    
  );
};

const Earth = () => {
  const textureLoader = new TextureLoader();
  const earthTexture = textureLoader.load(earthTextureURL);

  return (
    <mesh position={[0, 400, 2000]} scale={10}>
      <sphereBufferGeometry args={[5, 32, 32]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
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
    gltf.scene.scale.set(5, 5, 5);
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
        intensity={1}
        distance={5000}
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
      <PerspectiveCamera ref={cameraRef} makeDefault position={[-25, -15, 30]} far={50000} />
      <OrbitControls
        camera={cameraRef.current}
        target={[0, 0, -5]}
        enableZoom={true}
        enablePan={true}
        panSpeed={0.5}
        minDistance={5}
        maxDistance={400}
      />
      <Sun />
      <Moon />
      <FlickeringText/>
      <Earth/>
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
