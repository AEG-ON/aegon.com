import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function useMagnetic() {
  const ref = useRef<any>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const xTo = gsap.quickTo(element, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' })
    const yTo = gsap.quickTo(element, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' })

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { width, height, left, top } = element.getBoundingClientRect()
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      xTo(x * 0.5)
      yTo(y * 0.5)
    }

    const onMouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    element.addEventListener('mousemove', onMouseMove)
    element.addEventListener('mouseleave', onMouseLeave)

    return () => {
      element.removeEventListener('mousemove', onMouseMove)
      element.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return ref
}
