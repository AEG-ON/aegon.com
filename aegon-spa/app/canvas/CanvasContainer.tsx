import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Float, Loader } from '@react-three/drei'
import { SpatialBackground } from './SpatialBackground'
import { VideoBackground } from './VideoBackground'
import { PortfolioGallery } from './PortfolioGallery'
import { useAppStore } from '../store'
import { Suspense } from 'react'

export function CanvasContainer() {
  const { theme, activeSection } = useAppStore()
  
  return (
    <>
      {activeSection !== 'home' && <VideoBackground />}
      <div className="fixed inset-0 -z-10 pointer-events-none transition-colors duration-1000"
           style={{ backgroundColor: theme === 'black' ? 'rgba(0,0,0,0.6)' : 'rgba(0,26,77,0.6)' }}>
        <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#0057ff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#0057ff" />
          
          <Suspense fallback={null}>
            {activeSection !== 'home' && <SpatialBackground />}
            
            {activeSection === 'portfolio' && (
              <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <PortfolioGallery />
              </Float>
            )}
          </Suspense>
        </Canvas>
        <Loader />
      </div>
    </>
  )
}
