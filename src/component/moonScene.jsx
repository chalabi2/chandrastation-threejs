import React, { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { CircleBufferGeometry, MeshBasicMaterial, DoubleSide, Vector3, Box3 } from "three";
import { PerspectiveCamera, OrbitControls, useGLTF, Text, Line } from "@react-three/drei";
import moonModel from "../blender/lune.glb"
import sunModel from "../blender/sun.glb"
import { BufferGeometry, Float32BufferAttribute, PointsMaterial, Color, TextureLoader, CanvasTexture } from 'three';
import { EffectComposer, Bloom, DepthOfField, Noise, Vignette } from '@react-three/postprocessing';
import earthTextureURL from '../blender/8k_earth_daymap.jpg'
import * as THREE from 'three';
import { gsap } from "gsap";
import { useContext } from "react";

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
      position={[0, 2, -2]} // Adjust this to position the text closer to the Moon's surface
      rotation={[0, 0, 0]} // Rotate the text around the Y-axis by 180 degrees
      fontSize={0.3} // Make the text smaller
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


const CraterButtonBlog = ({ points, onClick, label }) => {
  const [hover, setHover] = useState(false);

  // Define the spherical coordinates
  const moonRadius = -1.02; // The moon's radius + some offset to make the items hug the moon
  const polarAngle = Math.PI / 1; // In radians
  const azimuthalAngle = Math.PI / 1; // In radians

  // Convert the spherical coordinates to Cartesian coordinates
  const position = new THREE.Vector3(
    moonRadius * Math.sin(polarAngle) * Math.cos(azimuthalAngle),
    moonRadius * Math.sin(polarAngle) * Math.sin(azimuthalAngle),
    moonRadius * Math.cos(polarAngle)
  );

  const textOffset = new THREE.Vector3(0, 0, 0.01);

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  const boundingBox = new Box3().setFromPoints(points);
  const center = boundingBox.getCenter(new Vector3());
  const size = boundingBox.getSize(new Vector3());
  const radius = Math.max(size.x, size.y) / 2;

  const geometry = new CircleBufferGeometry(radius, 32);
  const material = new MeshBasicMaterial({
    color: "grey",
    transparent: true,
    opacity: 0.001,
    side: DoubleSide,
  });

  return (
    <group
      position={position.toArray()}
      onPointerEnter={onMouseEnter}
      onPointerLeave={onMouseLeave}
      onClick={onClick}
    >
      <Line
        points={points}
        color={hover ? "cyan" : "white"}
        lineWidth={0.8}
      />
      <mesh
        geometry={geometry}
        material={material}
        position={center.toArray()}
      />
      {hover && (
        <Text
          position={center.clone().add(textOffset).toArray()} // Add the offset to the text's position
          fontSize={0.015}
          letterSpacing={1}
          anchorX="center"
          anchorY="middle"
        >
          BLOG
        </Text>
      )}
    </group>
  );
};

const CraterButtonContact = ({ points, onClick, label }) => {
  const [hover, setHover] = useState(false);

  // Define the spherical coordinates
  const moonRadius = 1.01; // The moon's radius + some offset to make the items hug the moon
  const polarAngle = Math.PI * 0.49; // In radians, adjusted for the bottom position
  const azimuthalAngle = 1.55; // In radians, adjusted for the bottom position

  // Convert the spherical coordinates to Cartesian coordinates
  const position = new THREE.Vector3(
    moonRadius * Math.sin(polarAngle) * Math.cos(azimuthalAngle),
    moonRadius * Math.sin(polarAngle) * Math.sin(azimuthalAngle),
    moonRadius * Math.cos(polarAngle)
  );

  const textOffset = new THREE.Vector3(0, 0.01, 0);

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  const boundingBox = new Box3().setFromPoints(points);
  const center = boundingBox.getCenter(new Vector3());
  const size = boundingBox.getSize(new Vector3());
  const radius = Math.max(size.x, size.y) / 2;

  const geometry = new CircleBufferGeometry(radius, 32);
  const material = new MeshBasicMaterial({
    color: "grey",
    transparent: true,
    opacity: 0.001,
    side: DoubleSide,
  });

  return (
    <group
      position={position.toArray()}
      onPointerEnter={onMouseEnter}
      onPointerLeave={onMouseLeave}
      onClick={onClick}
    >
      <Line
        points={points}
        color={hover ? "cyan" : "white"}
        lineWidth={0.8}
        rotation={[4.7,0,0]}
      />
      <mesh
        geometry={geometry}
        material={material}
        position={center.toArray()}
        rotation={[4.7,0,0]}
      />
      {hover && (
        <Text
          position={center.clone().add(textOffset).toArray()}
          fontSize={0.015}
          letterSpacing={1}
          anchorX="center"
          anchorY="middle"
          rotation={[4.7,0,0]} // Rotate the text around the X-axis by 180 degrees (Math.PI radians)
        >
          CONTACT
        </Text>
      )}
    </group>
  );
};

const CraterButtonAbout = ({ points, onClick, label }) => {
  const [hover, setHover] = useState(false);

  // Define the spherical coordinates
  const moonRadius = -1.01; // The moon's radius + some offset to make the items hug the moon
  const polarAngle = Math.PI * 0.49; // In radians, adjusted for the bottom position
  const azimuthalAngle = 1.55; // In radians, adjusted for the bottom position

  // Convert the spherical coordinates to Cartesian coordinates
  const position = new THREE.Vector3(
    moonRadius * Math.sin(polarAngle) * Math.cos(azimuthalAngle),
    moonRadius * Math.sin(polarAngle) * Math.sin(azimuthalAngle),
    moonRadius * Math.cos(polarAngle)
  );

  const textOffset = new THREE.Vector3(0, -0.01, 0);

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  const boundingBox = new Box3().setFromPoints(points);
  const center = boundingBox.getCenter(new Vector3());
  const size = boundingBox.getSize(new Vector3());
  const radius = Math.max(size.x, size.y) / 2;

  const geometry = new CircleBufferGeometry(radius, 32);
  const material = new MeshBasicMaterial({
    color: "grey",
    transparent: true,
    opacity: 0.001,
    side: DoubleSide,
  });

  return (
    <group
      position={position.toArray()}
      onPointerEnter={onMouseEnter}
      onPointerLeave={onMouseLeave}
      onClick={onClick}
    >
      <Line
        points={points}
        color={hover ? "cyan" : "white"}
        lineWidth={0.8}
        rotation={[4.7,0,0]}
      />
      <mesh
        geometry={geometry}
        material={material}
        position={center.toArray()}
        rotation={[4.7,0,0]}
      />
      {hover && (
        <Text
          position={center.clone().add(textOffset).toArray()}
          fontSize={0.015}
          letterSpacing={1}
          anchorX="center"
          anchorY="middle"
          rotation={[-4.7,0,0]} // Rotate the text around the X-axis by 180 degrees (Math.PI radians)
        >
          ABOUT
        </Text>
      )}
    </group>
  );
};


const CraterButtonServices = ({ points, onClick, label }) => {
  const [hover, setHover] = useState(false);

  // Define the spherical coordinates
  const moonRadius = 1.02; // The moon's radius + some offset to make the items hug the moon
  const polarAngle = Math.PI / 1; // In radians
  const azimuthalAngle = Math.PI / 1.5; // In radians

  // Convert the spherical coordinates to Cartesian coordinates
  const position = new THREE.Vector3(
    moonRadius * Math.sin(polarAngle) * Math.cos(azimuthalAngle),
    moonRadius * Math.sin(polarAngle) * Math.sin(azimuthalAngle),
    moonRadius * Math.cos(polarAngle)
  );

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };
  const textOffset = new THREE.Vector3(0, 0, -0.01);
  const boundingBox = new Box3().setFromPoints(points);
  const center = boundingBox.getCenter(new Vector3());
  const size = boundingBox.getSize(new Vector3());
  const radius = Math.max(size.x, size.y) / 2;

  const geometry = new CircleBufferGeometry(radius, 32);
  const material = new MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    side: DoubleSide,
  });

  return (
    <group
      position={position.toArray()}
      onPointerEnter={onMouseEnter}
      onPointerLeave={onMouseLeave}
      onClick={onClick}
    >
      <Line
        points={points}
        color={hover ? "cyan" : "white"}
        lineWidth={0.8}
      />
      <mesh
        geometry={geometry}
        material={material}
        position={center.toArray()}
      />
      {hover && (
        <Text
        position={center.clone().add(textOffset).toArray()}
          fontSize={0.015}
          letterSpacing={1}
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI, 0]}
        >
          SERVICES
        </Text>
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

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = -0.5;
      meshRef.current.rotation.x = -0.5;
    }
  }, [meshRef]);


  useFrame(({ clock }) => {
   meshRef.current.rotation.y += 0.0005;
   
   meshRef.current.rotation.x += 0.0005;
  });

  
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
<CraterButtonBlog points={points} onClick={handleClick} label="Blog" />
<CraterButtonServices points={points} onClick={handleClick} label="Services" />
<CraterButtonContact points={points} onClick={handleClick} label="Contact" />
<CraterButtonAbout points={points} onClick={handleClick} label="About" />

    </primitive>
    
  );
};

const Earth = () => {
  const textureLoader = new TextureLoader();
  const earthTexture = textureLoader.load(earthTextureURL);
  

  return (
    <mesh position={[0, 0, -2000]} scale={10}>
      <sphereBufferGeometry args={[5, 32, 32]} />
      <meshStandardMaterial map={earthTexture} />
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
      <primitive object={gltf.scene} position={[0, 0, 3000]} />
      <pointLight
        color={0xffffff}
        intensity={1}
        distance={10000}
        decay={2}
        position={[0, 0, 190]}
      />
    </>
  );
};

const AnimatedCamera = () => {
  const cameraRef = useRef();
  const [animationInitialized, setAnimationInitialized] = useState(false);

  useFrame(() => {
    if (cameraRef.current && !animationInitialized) {
      setAnimationInitialized(true);

      const startPosition = new THREE.Vector3(100, 200, -400);
      const endPosition = new THREE.Vector3(0, 0, 10);

      cameraRef.current.position.copy(startPosition);

      gsap.to(cameraRef.current.position, {
        duration: 8,
        x: endPosition.x,
        y: endPosition.y,
        z: endPosition.z,
        onUpdate: () => {
          cameraRef.current.updateProjectionMatrix();
        },
      });
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 10]}
      far={50000}
    />
  );
};

const AnimatedEffects = ({ noiseOpacity, vignetteDarkness }) => {
  return (
    <>
      <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
      <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      <Noise opacity={noiseOpacity} />
      <Vignette eskil={false} offset={0.3} darkness={vignetteDarkness} />
    </>
  );
};

const Effects = () => {
  const [noiseOpacity, setNoiseOpacity] = useState(1);
  const [vignetteDarkness, setVignetteDarkness] = useState(3);
  const startTime = useRef(Date.now());

  const initialNoiseOpacity = 1;
  const initialVignetteDarkness = 3;
  const animationDuration = 7000; // in milliseconds

  const animateOpacity = useCallback((delta) => {
    const elapsedTime = Date.now() - startTime.current;
    const progress = Math.min(elapsedTime / animationDuration, 1);

    setNoiseOpacity(initialNoiseOpacity - progress * (initialNoiseOpacity - 0.05));
    setVignetteDarkness(initialVignetteDarkness - progress * (initialVignetteDarkness - 1.1));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      startTime.current = null;
    }, animationDuration);

    return () => clearTimeout(timer);
  }, []);

  useEffect(animateOpacity);

  return <AnimatedEffects noiseOpacity={noiseOpacity} vignetteDarkness={vignetteDarkness} />;
};

const MoonScene = () => {
  const cameraRef = useRef();

  return (
    <Canvas
      style={{ position: "absolute", top: 0, left: 0 }}
      useSetBackgroundColor
      size={{ width: window.innerWidth, height: window.innerHeight }}
      antialias 
      onCreated={({ gl }) => {
        gl.setClearColor("black");
      }}
    >
      <Effects/>
<AnimatedCamera/>
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

    </Canvas>
  );
};


export default MoonScene;
