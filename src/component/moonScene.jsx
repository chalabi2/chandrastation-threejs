import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, useGLTF, Text, Line, Stats, Cylinder } from "@react-three/drei";
import moonModel from "../blender/lune.glb"
import sunModel from "../blender/sun.glb"
import { BufferGeometry, Float32BufferAttribute, PointsMaterial, Color, TextureLoader, CanvasTexture, CircleBufferGeometry, MeshBasicMaterial, DoubleSide, Vector3, Box3 } from 'three';
import { EffectComposer, Bloom, DepthOfField, Noise, Vignette, Glitch } from '@react-three/postprocessing';
import earthTextureURL from '../blender/8k_earth_daymap.jpg'
import * as THREE from 'three';
import { gsap } from "gsap";
import LoadingScreen from "./loading/loading";
import { useNavigate } from 'react-router-dom';

function ccccc(children, color) {
  const scalingFactor = 6
  const fontSize = 150 * scalingFactor

  const canvas = document.createElement('canvas')
  canvas.width = 2048 * scalingFactor;
  canvas.height = 2048 * scalingFactor;
  const context = canvas.getContext('2d')

  context.fillStyle = "transparent"
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillStyle = color
  context.fillText(children, 1024* scalingFactor, canvas.height / 2)
  return canvas

}

function TextRing({ children }) {

  const canvas = useMemo(() => {
    return ccccc(children, "cyan")
  }, [children])


  const texture = useRef()

  useFrame(({ clock }) => {
    texture.current.offset.x = clock.getElapsedTime() / 8
  })
  

  const cylArgs = [1, 1, 1, 64, 1, true]

  return (
    <group rotation-y={Math.PI / 2} scale={[2.5, 2.5, 2.5]} position={[0,2,-5]}>
      {/* <primitive object={target.texture} ref={texture} wrapS={THREE.RepeatWrapping} wrapT={THREE.RepeatWrapping} repeat={[1, 1]} /> */}

      <Cylinder args={cylArgs} side={THREE.FrontSide}>
        <meshStandardMaterial transparent attach="material" depthWrite={false} depthTest={true}     blendEquation={THREE.AddEquation}
    blendSrc={THREE.SrcAlphaFactor}
    blendDst={THREE.OneMinusSrcAlphaFactor}>
          <canvasTexture
            attach="map"
            repeat={[2, 1]}
            image={canvas}
            premultiplyAlpha
            ref={texture}
            wrapS={THREE.RepeatWrapping}
            wrapT={THREE.RepeatWrapping}
            onUpdate={(s) => (s.needsUpdate = true)}
          />
        </meshStandardMaterial>
      </Cylinder>
    </group>
  )
}


const CraterButtonBlog = ({ points, onClick, label }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate('/blog');
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
      onClick={handleClick}
    >
      <Line
        points={points}
        color={hover ? "cyan" : "white"}
        lineWidth={2}
      />
      <mesh
        geometry={geometry}
        material={material}
        position={center.toArray()}
      />
      {hover && (
        <Text
        color="#00FFFF"
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
  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate('/contact');
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
      onClick={handleClick}
    >
      <Line
        points={points}
        color={hover ? "cyan" : "white"}
        lineWidth={2}
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
        color="#00FFFF"
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
  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate('/about');
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
      onClick={handleClick}
    >
      <Line
        points={points}
        color={hover ? "cyan" : "white"}
        lineWidth={2}
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
        color="#00FFFF"
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
  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate('/services');
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
      onClick={handleClick}
    >
      <Line
        points={points}
        color={hover ? "cyan" : "white"}
        lineWidth={2}
      />
      <mesh
        geometry={geometry}
        material={material}
        position={center.toArray()}
      />
      {hover && (
        <Text
        color="#00FFFF"
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
  const particleCount = 4000;
  const radius = 8000;

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
      <primitive object={gltf.scene} position={[0, 0, 5000]} />
      <pointLight
        castShadow
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
      const intermediatePosition = new THREE.Vector3(-300, 0, 5);
      const endPosition = new THREE.Vector3(0, 0, 5);

      cameraRef.current.position.copy(startPosition);

      gsap
      .to(cameraRef.current.position, {
        duration: 10,
        x: intermediatePosition.x,
        y: intermediatePosition.y,
        z: intermediatePosition.z,
        onUpdate: () => {
          cameraRef.current.updateProjectionMatrix();
        },
      })
      .then(() => {
        gsap.to(cameraRef.current.position, {
          duration: 10,
          x: endPosition.x,
          y: endPosition.y,
          z: endPosition.z,
          onUpdate: () => {
            cameraRef.current.updateProjectionMatrix();
          },
        });
      });
  }
});

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 5]}
      far={50000}
    />
  );
};

const MoonScene = () => {
  const cameraRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Change this value to control the duration of the loading screen

    return () => {
      clearTimeout(timer);
    };
  }, []);


  return (
    <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      pointerEvents: loading ? "auto" : "none",
      transform: loading ? "scale(1)" : "scale(1.1)",
      transition: "opacity 8s cubic-bezier(0.23, 1, 0.32, 1), transform 8s cubic-bezier(0.23, 1, 0.32, 1)",
    }}
  >
<LoadingScreen />

    <Canvas
      style={{ position: "absolute", top: 0, left: 0 }}
      useSetBackgroundColor
      size={{ width: window.innerWidth, height: window.innerHeight }} 
      gl={{ antialias: true }}
      onCreated={({ gl }) => {
        gl.setClearColor("black");
      }}
    >
<AnimatedCamera/>
      <OrbitControls
        camera={cameraRef.current}
        target={[0, 0, -5]}
        enableZoom={true}
        enablePan={true}
        panSpeed={0.5}
        minDistance={5}
        maxDistance={2000}
      />
      <Sun />
      <Moon />
      <Earth/>
      <Starz />
      <TextRing>CHANDRA STATION</TextRing>
      <Stats />
      <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={500} />
        <Noise opacity={0.1} />
        <Vignette eskil={false} offset={0.1} darkness={0.9} />
        <Glitch delay={[2, 30]} duration={[0.6, 0.8]}  />
      </EffectComposer>
    </Canvas>
    </div>
  );
};


export default MoonScene;
