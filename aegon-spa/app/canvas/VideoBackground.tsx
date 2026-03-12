import { useEffect, useRef } from 'react'
import { useAppStore } from '../store'

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isVideoPlaying = useAppStore(state => state.isVideoPlaying)

  useEffect(() => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
  }, [isVideoPlaying])

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        src="/assets/video/large.mp4"
        loop
        muted
        playsInline
        className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoPlaying ? 'opacity-100' : 'opacity-20'}`}
      />
      {/* Overlay para profundidade */}
      <div className={`absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 transition-opacity duration-1000 ${isVideoPlaying ? 'opacity-60' : 'opacity-80'}`}></div>
    </div>
  )
}
