import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { PointLight, TextureLoader, MeshPhongMaterial, MeshBasicMaterial, SphereGeometry, HemisphereLight, DirectionalLight  } from "three";
import moonText from "../textures/8k_moon.jpg"
import sunText from "../textures/8k_sun.jpg"
import { BufferGeometry, Float32BufferAttribute, PointsMaterial, Points } from 'three';

const Moon = () => {
  const meshRef = useRef();
  const textureURL = moonText;
  const displacementURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/ldem_3_8bit.jpg";

  const texture = useMemo(() => new TextureLoader().load(textureURL), [textureURL]);
  const displacementMap = useMemo(() => new TextureLoader().load(displacementURL), [displacementURL]);

  const material = new MeshPhongMaterial({
  color: 0xffffff,
  map: texture,
  displacementMap: displacementMap,
  displacementScale: 0.06,
  bumpMap: displacementMap,
  bumpScale: 0.04,
  reflectivity: 0,
  shininess: 0,
  emissive: 0xffffff, // Makes the material self-illuminate
  emissiveIntensity: 0.5, // Controls the strength of the self-illumination
});

  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.002;
    meshRef.current.rotation.x = 3.1415 * 0.02;
  });

  return (
    <mesh ref={meshRef} material={material}>
      <sphereGeometry args={[2, 60, 60]} />
    </mesh>
  );
};


const Stars = () => {
  const particleCount = 50000;
  const radius = 10000;

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

  const material = new PointsMaterial({
    size: 5,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 1
  });

  const starsRef = useRef();
  const lights = useMemo(() => [], []);

  useEffect(() => {
    for (let i = 0; i < particleCount; i++) {
      const light = new PointLight(0xffffff, 1, 1000);
      lights.push(light);
      starsRef.current.add(light);
    }
  }, []);

  return (
    <group ref={starsRef}>
      <points geometry={geometry} material={material} />
    </group>
  );
};


const CustomDirectionalLight = () => {
  const { scene } = useThree();
  const light = new DirectionalLight(0xffffff, 0.5);
  light.position.set(1, 1, 1);
  scene.add(light);
  return null;
};


// Custom HemisphereLight component
const CustomHemisphereLight = (props) => {
  const { scene } = useThree();
  const light = new HemisphereLight(0xffffff, 0xffffff, 0.05);
  scene.add(light);

  return null;
};


const Sun = () => {
  const textureURL = sunText;
  const texture = useMemo(() => new TextureLoader().load(textureURL), [textureURL]);

  const meshRef = useRef();

  useFrame(({ clock }) => {
    meshRef.current.rotation.x += 0.001;
    meshRef.current.rotation.y += 0.002;
  });

  const material = new MeshPhongMaterial({
    map: texture,
    emissive: 0xffffff,
    emissiveMap: texture,
    emissiveIntensity: 1,
    shininess: 100,
  });

  return (
    <>
      <mesh ref={meshRef} position={[0, 0, -10000]}>
        <sphereGeometry args={[500, 64, 64]} />
        <meshPhongMaterial {...material} />
      </mesh>
      <pointLight color={0xffffff} intensity={1} distance={5000} position={[0, 0, -10000]} />
    </>
  );
};

const MoonScene = () => {
  return (
    <Canvas
      style={{ position: "absolute", top: 0, left: 0 }}
      useSetBackgroundColor
      size={{ width: window.innerWidth, height: window.innerHeight }}
      onCreated={({ gl }) => {
        gl.setClearColor("black");
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <OrbitControls enableZoom={true} enablePan={true} panSpeed={0.5} />
      <CustomDirectionalLight />
      <CustomHemisphereLight />
      <Sun />
      <Moon />
      <Stars />
    </Canvas>
  );
};

export default MoonScene;
