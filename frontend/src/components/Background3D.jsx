import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Icosahedron } from '@react-three/drei';

function FloatingShape({ position, color, scale, speed }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(time * speed) * 0.2;
    meshRef.current.rotation.y = Math.cos(time * speed * 0.5) * 0.2;
  });

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2}>
      <Icosahedron args={[1, 0]} position={position} scale={scale} ref={meshRef}>
        <meshStandardMaterial color={color} wireframe />
      </Icosahedron>
    </Float>
  );
}

const Background3D = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -1, background: 'linear-gradient(to bottom, #0f1c15, #000000)' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Floating "Seeds" or abstract nature shapes */}
        <FloatingShape position={[-3, 2, -5]} color="#4ade80" scale={0.8} speed={1.5} />
        <FloatingShape position={[3, -2, -4]} color="#a3e635" scale={1.2} speed={1} />
        <FloatingShape position={[0, 3, -8]} color="#22c55e" scale={0.6} speed={2} />
        <FloatingShape position={[-4, -3, -6]} color="#15803d" scale={1.5} speed={0.8} />
        <FloatingShape position={[4, 1, -10]} color="#86efac" scale={1} speed={1.2} />

        {/* Ambient Particles */}
        <Sparkles 
          count={150} 
          scale={12} 
          size={4} 
          speed={0.4} 
          opacity={0.6}
          color="#84cc16"
        />
        <Sparkles 
          count={50} 
          scale={10} 
          size={6} 
          speed={0.2} 
          opacity={0.4}
          color="#fbbf24"
        />
      </Canvas>
    </div>
  );
};

export default Background3D;