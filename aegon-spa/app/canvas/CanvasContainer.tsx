import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Loader } from '@react-three/drei'
import { SpatialBackground } from './SpatialBackground'
import { PortfolioGallery } from './PortfolioGallery'
import { CameraManager } from './CameraManager'
import { SoundManager } from './SoundManager'
import { useAppStore } from '../store'
import { Suspense, useState, useEffect } from 'react'

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => setHasMounted(true), [])
  return hasMounted ? children : null
}

export function CanvasContainer() {
  const { activeSection } = useAppStore()
  const isPortfolio = activeSection === 'portfolio'
  const canvasPointerClass = activeSection === 'portfolio' ? 'pointer-events-auto' : 'pointer-events-none'

  useEffect(() => {
    console.log('[CanvasContainer] mounted', { activeSection })
  }, [])

  useEffect(() => {
    console.log('[CanvasContainer] section changed', { activeSection })
  }, [activeSection])

  useEffect(() => {
    if (isPortfolio) {
      console.log('[CanvasContainer] PortfolioGallery should be visible now')
    }
  }, [isPortfolio])
  
  return (
    <ClientOnly>
      <div className={`fixed inset-0 z-0 ${canvasPointerClass} transition-colors duration-1000`}
           style={{ backgroundColor: '#000000' }}>
        <Canvas
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          onCreated={(state) => {
            console.log('[CanvasContainer] canvas created', {
              size: state.size,
              viewport: state.viewport,
              pixelRatio: state.gl.getPixelRatio(),
            })
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
          <CameraManager />
          {isPortfolio && <SoundManager />}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#0057ff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#0057ff" />
          
          <Suspense fallback={null}>
            {isPortfolio && <SpatialBackground />}
            {isPortfolio && <PortfolioGallery />}
          </Suspense>
        </Canvas>
        <Loader />
      </div>
    </ClientOnly>
  )
}
