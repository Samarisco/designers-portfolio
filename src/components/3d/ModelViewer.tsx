'use client'

import { Suspense, useRef, useState, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  useGLTF,
  Center,
  Float,
  ContactShadows,
  Grid,
  Preload,
} from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import type { ModelViewerProps } from '@/types'
import { THREE_CONFIG } from '@/config'

// ============================================================
// GLTF MODEL
// ============================================================
function Model({ url, wireframe = false }: { url: string; wireframe?: boolean }) {
  const { scene } = useGLTF(url)

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true
      child.receiveShadow = true
      if (child.material instanceof THREE.MeshStandardMaterial) {
        child.material.wireframe = wireframe
        child.material.envMapIntensity = 1.2
      }
    }
  })

  return (
    <Center>
      <primitive object={scene} dispose={null} />
    </Center>
  )
}

// ============================================================
// PROCEDURAL PLACEHOLDER
// ============================================================
function PlaceholderModel({ autoRotate }: { autoRotate: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y = t * 0.15
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.3
      torusRef.current.rotation.z = t * 0.2
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.4
      innerRef.current.rotation.z = t * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={torusRef} castShadow>
        <torusGeometry args={[1.4, 0.06, 16, 100]} />
        <meshStandardMaterial color="#e8e8e8" metalness={0.95} roughness={0.05} envMapIntensity={2} />
      </mesh>
      <mesh ref={innerRef} castShadow>
        <torusGeometry args={[0.9, 0.04, 16, 100]} />
        <meshStandardMaterial color="#ff4500" metalness={0.8} roughness={0.1} emissive="#ff4500" emissiveIntensity={0.3} />
      </mesh>
      <mesh castShadow>
        <sphereGeometry args={[0.35, 64, 64]} />
        <meshStandardMaterial color="#0d0d0d" metalness={1} roughness={0} envMapIntensity={3} />
      </mesh>
      <mesh castShadow>
        <octahedronGeometry args={[0.55]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} transparent opacity={0.4} envMapIntensity={2} />
      </mesh>
    </group>
  )
}

// ============================================================
// SCENE LIGHTING
// ============================================================
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-5, 5, 5]} intensity={0.8} color={THREE_CONFIG.lights.point1.color} />
      <pointLight position={[5, -5, -5]} intensity={0.4} color={THREE_CONFIG.lights.point2.color} />
      <spotLight position={[0, 8, 0]} intensity={0.6} angle={0.5} penumbra={0.8} castShadow />
    </>
  )
}

// ============================================================
// CAMERA PARALLAX
// ============================================================
function CameraParallax({ enabled = true }: { enabled: boolean }) {
  const { camera } = useThree()
  const targetRef = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    if (!enabled) return
    const { pointer } = state
    targetRef.current.x += (pointer.x * 0.3 - targetRef.current.x) * 0.05
    targetRef.current.y += (pointer.y * 0.2 - targetRef.current.y) * 0.05
    camera.position.x += (targetRef.current.x - camera.position.x) * 0.05
    camera.position.y += (targetRef.current.y - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })

  return null
}

// ============================================================
// LOADING FALLBACK
// ============================================================
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border border-pulse/30 rounded-full animate-ping" />
          <div className="absolute inset-2 border border-pulse/60 rounded-full animate-spin-slow" />
          <div className="absolute inset-4 bg-pulse rounded-full animate-pulse" />
        </div>
        <span className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase">
          Cargando modelo
        </span>
      </div>
    </div>
  )
}

// ============================================================
// MAIN VIEWER
// ============================================================
export function ModelViewer({
  url,
  environment = 'studio',
  autoRotate = true,
  enableOrbit = true,
  enableBloom = true,
  wireframe = false,
  className = '',
  onLoad,
}: ModelViewerProps) {
  const [mounted, setMounted] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const handleCreated = useCallback(() => {
    setLoaded(true)
    onLoad?.()
  }, [onLoad])

  if (!mounted) return <div className={`relative w-full h-full bg-obsidian ${className}`} />

  return (
    <div className={`relative w-full h-full bg-obsidian ${className}`}>
      {!loaded && <LoadingFallback />}

      <motion.div
        className="absolute inset-0"
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <Canvas
          dpr={THREE_CONFIG.dpr}
          camera={{
            fov: THREE_CONFIG.camera.fov,
            near: THREE_CONFIG.camera.near,
            far: THREE_CONFIG.camera.far,
            position: THREE_CONFIG.camera.position,
          }}
          shadows
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          onCreated={handleCreated}
          performance={{ min: 0.5 }}
        >
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['#000000', 8, 30]} />

          <SceneLighting />
          <CameraParallax enabled={!isInteracting} />
          <Environment preset={environment as Parameters<typeof Environment>[0]['preset']} />

          <Float
            speed={autoRotate ? 1.5 : 0}
            rotationIntensity={autoRotate ? 0.3 : 0}
            floatIntensity={autoRotate ? 0.4 : 0}
          >
            <Suspense fallback={null}>
              {url ? (
                <Model url={url} wireframe={wireframe} />
              ) : (
                <PlaceholderModel autoRotate={autoRotate && !isInteracting} />
              )}
            </Suspense>
          </Float>

          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#000000" />
          <Grid
            position={[0, -2.01, 0]}
            args={[20, 20]}
            cellSize={0.5}
            cellThickness={0.3}
            cellColor="#1a1a1a"
            sectionSize={2}
            sectionThickness={0.5}
            sectionColor="#222222"
            fadeDistance={12}
            fadeStrength={2}
          />

          {enableOrbit && (
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={2}
              maxDistance={12}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 1.5}
              autoRotate={autoRotate && !isInteracting}
              autoRotateSpeed={0.5}
              onStart={() => setIsInteracting(true)}
              onEnd={() => setIsInteracting(false)}
              dampingFactor={0.05}
              enableDamping
            />
          )}

          {enableBloom && (
            <EffectComposer multisampling={4}>
              <Bloom intensity={0.4} luminanceThreshold={0.8} luminanceSmoothing={0.9} />
              <Vignette eskil={false} offset={0.1} darkness={0.6} />
            </EffectComposer>
          )}

          <Preload all />
        </Canvas>
      </motion.div>

      {enableOrbit && loaded && (
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full glass"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="font-mono text-[9px] text-zinc-600 tracking-widest uppercase">
            Arrastrar para rotar · Scroll para zoom
          </span>
        </motion.div>
      )}
    </div>
  )
}

// ============================================================
// HERO VIEWER — with SSR guard
// ============================================================
export function HeroViewer({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return <div className={`w-full h-full bg-black ${className}`} />

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ fov: 50, near: 0.1, far: 100, position: [0, 0, 5] }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
        }}
        shadows
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={['#000000']} />

        <ambientLight intensity={0.15} />
        <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
        <pointLight position={[-5, 5, 5]} intensity={1} color="#a8d8f0" />
        <pointLight position={[5, -5, -5]} intensity={0.5} color="#ff4500" />

        <Environment preset="studio" />

        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
          <PlaceholderModel autoRotate={true} />
        </Float>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.4}
          dampingFactor={0.08}
          enableDamping
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
        />

        <EffectComposer multisampling={8}>
          <Bloom intensity={0.5} luminanceThreshold={0.7} luminanceSmoothing={0.9} />
          <Vignette eskil={false} offset={0.15} darkness={0.7} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
