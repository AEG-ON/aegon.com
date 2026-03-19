import { useEffect, useRef } from 'react'
import { useAppStore } from '../store'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

export function SoundManager() {
  const { isSoundEnabled, activeSection } = useAppStore()
  const { camera } = useThree()
  const listenerRef = useRef<THREE.AudioListener | null>(null)
  const soundRef = useRef<THREE.Audio | null>(null)
  const audioLoader = useRef(new THREE.AudioLoader())

  useEffect(() => {
    // Inicializar AudioListener
    const listener = new THREE.AudioListener()
    camera.add(listener)
    listenerRef.current = listener

    // Inicializar Audio
    const sound = new THREE.Audio(listener)
    soundRef.current = sound

    // Gerar som procedural (Drone Espacial) para evitar dependência de arquivo externo
    const audioContext = listener.context
    const bufferSize = audioContext.sampleRate * 4 // 4 segundos de loop
    const buffer = audioContext.createBuffer(2, bufferSize, audioContext.sampleRate)

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel)
      for (let i = 0; i < bufferSize; i++) {
        const t = i / audioContext.sampleRate
        // Frequência base 110Hz (Lá) com leve desafinação estéreo para efeito binaural
        const freq = 110 + (channel * 1.5) 
        const sine = Math.sin(2 * Math.PI * freq * t)
        // Adiciona harmônicos suaves
        const harmonic = Math.sin(2 * Math.PI * freq * 2 * t) * 0.3
        data[i] = (sine + harmonic) * 0.1 // Volume baixo base
      }
    }

    sound.setBuffer(buffer)
    sound.setLoop(true)
    sound.setVolume(0.5)
    
    // Se o som estiver habilitado, tocar
    if (isSoundEnabled) sound.play()

    return () => {
      if (sound.isPlaying) sound.stop()
      camera.remove(listener)
    }
  }, [camera])

  useEffect(() => {
    const sound = soundRef.current
    if (!sound || !sound.buffer) return

    if (isSoundEnabled) {
      if (!sound.isPlaying) sound.play()
      // Fade in
      const fadeIn = setInterval(() => {
        if (sound.getVolume() < 0.5) sound.setVolume(sound.getVolume() + 0.05)
        else clearInterval(fadeIn)
      }, 100)
    } else {
      // Fade out
      const fadeOut = setInterval(() => {
        if (sound.getVolume() > 0) sound.setVolume(sound.getVolume() - 0.05)
        else {
          sound.pause()
          clearInterval(fadeOut)
        }
      }, 100)
    }
  }, [isSoundEnabled])

  // Efeito dinâmico baseado na seção
  useEffect(() => {
    const sound = soundRef.current
    if (!sound || !sound.buffer || !isSoundEnabled) return

    // Alterar pitch ou volume dependendo da seção para dar "ambiência"
    switch (activeSection) {
      case 'home':
        sound.setPlaybackRate(1)
        break
      case 'dna':
        sound.setPlaybackRate(0.8) // Mais lento e profundo
        break
      case 'portfolio':
        sound.setPlaybackRate(1.2) // Mais energético
        break
      default:
        sound.setPlaybackRate(1)
    }
  }, [activeSection, isSoundEnabled])

  return null
}