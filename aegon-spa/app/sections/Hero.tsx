import { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useAppStore } from '../store'
import { useMagnetic } from '../hooks/useMagnetic'
import { Pause, Play, RotateCcw, Volume2, VolumeX, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const { setActiveSection, setIsVideoPlaying } = useAppStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const videoShellRef = useRef<HTMLDivElement>(null)
  const videoGlowRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useMagnetic()
  const manifestoRef = useMagnetic()
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setIsVideoPlaying(false)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scroller = containerRef.current?.closest('main') as HTMLElement | null
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    const words = titleRef.current?.querySelectorAll('.word-inner')
    if (words) {
      tl.to(words, {
        y: 0,
        stagger: 0.05,
        duration: reduceMotion ? 0.4 : 1.1,
        delay: 0.25
      })
    }

    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: reduceMotion ? 0.35 : 0.85 },
      '-=0.8'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: reduceMotion ? 0.35 : 0.75 },
      '-=0.5'
    )

    gsap.set(videoShellRef.current, {
      yPercent: 100, // Reduzido de 140 para 100 para aparecer mais cedo
      scale: 0.78,
      borderRadius: '2rem'
    })

    gsap.set(videoGlowRef.current, {
      opacity: 0.35,
      scale: 0.85
    })

    if (!reduceMotion) {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: '#scroll-container', // Vincula explicitamente ao container principal
          start: 'top top',
          end: '+=145%',
          scrub: 1,
          pin: true,
          // anticipatePin: 1 // Removido para evitar saltos visuais
        }
      })

      scrollTl
        .to(contentRef.current, {
          scale: 0.78,
          opacity: 0,
          y: -130,
          duration: 1.5 // Atrasando o desaparecimento do texto
        }, 0)
        .to(videoShellRef.current, {
          yPercent: 0,
          scale: 1,
          width: '100vw',
          height: '100vh',
          borderRadius: 0,
          duration: 1 // Vídeo sobe mais rápido que o texto some
        }, 0)
        .to(videoGlowRef.current, {
          opacity: 0.7,
          scale: 1.15,
          duration: 1
        }, 0)
    }

    ScrollTrigger.refresh()
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  const togglePlay = async () => {
    const element = videoRef.current
    if (!element) return
    if (element.paused) {
      await element.play()
      setIsPlaying(true)
      return
    }
    element.pause()
    setIsPlaying(false)
  }

  const toggleMute = () => {
    const element = videoRef.current
    if (!element) return
    element.muted = !element.muted
    setIsMuted(element.muted)
  }

  const restartVideo = async () => {
    const element = videoRef.current
    if (!element) return
    element.currentTime = 0
    await element.play()
    setIsPlaying(true)
  }

  const onTimeUpdate = () => {
    const element = videoRef.current
    if (!element || !element.duration) return
    setProgress((element.currentTime / element.duration) * 100)
  }

  const Word = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <span className={`inline-block overflow-visible align-baseline py-1 ${className}`}>
      <span className="word-inner inline-block translate-y-full leading-[0.9]">
        {children}
      </span>
    </span>
  )

  return (
    <>
      <section ref={containerRef} className="h-screen w-full relative overflow-hidden bg-[#040915]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(74,94,255,0.45),rgba(4,9,21,0.92)_55%,rgba(4,9,21,1)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,9,21,0.1),rgba(4,9,21,0.7)_60%,rgba(4,9,21,1)_100%)]" />

        <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 md:px-8">
          <div className="max-w-6xl text-center space-y-6 md:space-y-8">
            <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter leading-[0.92] uppercase text-white">
              <Word>SOLUÇÕES</Word> <Word>DIGITAIS</Word> <br />
              <Word>COM</Word> <Word className="text-aegon-blue">PROPÓSITO</Word> <br />
              <Word>HUMANO</Word>
            </h1>
            
            <p ref={subtitleRef} className="text-base sm:text-lg md:text-2xl text-white/65 max-w-3xl mx-auto leading-relaxed font-light pt-8 md:pt-12">
              Mais do que tecnologia, criamos conexões que fortalecem marcas, pessoas e comunidades. 
              Cada projeto é construído com estratégia, empatia e inovação.
            </p>

            <div className="pt-8 md:pt-10">
              <button
                ref={ctaRef}
                onClick={() => setActiveSection('portfolio')}
                className="group relative inline-flex items-center justify-center px-9 md:px-12 py-4 md:py-5 overflow-hidden border-2 border-aegon-blue rounded-full transition-all duration-300 hover:bg-aegon-blue interactive"
              >
                <span className="relative z-10 text-aegon-blue font-bold tracking-widest uppercase text-sm group-hover:text-white transition-colors duration-300">
                  VAMOS TRANSFORMAR SUA IDEIA JUNTOS?
                </span>
                <div className="absolute inset-0 bg-aegon-blue -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
              </button>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-55">
            <div className="w-[2px] h-20 bg-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-aegon-blue animate-scroll-line"></div>
            </div>
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Explore</span>
          </div>
        </div>

        <div
          ref={videoGlowRef}
          className="absolute bottom-[5%] left-1/2 -translate-x-1/2 z-10 w-[90vw] h-[36vh] max-h-[420px] rounded-[3rem] bg-aegon-blue/35 blur-3xl"
        />

        <div
          ref={videoShellRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 overflow-hidden border border-[#8f94ff]/35 bg-[#040915] shadow-[0_20px_90px_rgba(39,66,255,0.45)]"
          style={{
            width: 'min(92vw, 1100px)',
            height: 'min(56vh, 560px)',
          }}
        >
          <video
            ref={videoRef}
            src="/assets/video/large.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={onTimeUpdate}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,9,21,0.72),rgba(4,9,21,0.15)_40%,rgba(4,9,21,0.0))]" />
          <div className="absolute left-4 right-4 bottom-4 z-30">
            <div className="h-[3px] w-full bg-white/15 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-aegon-blue rounded-full transition-all duration-150" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:border-aegon-blue transition-colors interactive"
                  aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:border-aegon-blue transition-colors interactive"
                  aria-label={isMuted ? 'Ativar som' : 'Silenciar vídeo'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={restartVideo}
                  className="w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:border-aegon-blue transition-colors interactive"
                  aria-label="Reiniciar vídeo"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/75 font-semibold">Aegon Demo Video</span>
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scroll-line {
          animation: scroll-line 2s infinite ease-in-out;
        }
        .mask-gradient-x {
          mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
      `}} />
    </section>

      <section className="min-h-[120vh] bg-black relative z-20 py-24 md:py-32 px-6 md:px-8">
        <div className="max-w-6xl mx-auto space-y-24 md:space-y-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-sm font-bold tracking-[0.4em] text-aegon-blue uppercase">MANIFESTO</h2>
              <div ref={manifestoRef} className="interactive inline-block cursor-pointer">
                <p className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none pointer-events-none">
                  NÃO CRIAMOS APENAS <br />
                  <span className="text-white/30">CÓDIGO.</span> <br />
                  CRIAMOS <span className="text-aegon-blue">LEGADO.</span>
                </p>
              </div>
            </div>
            <div className="space-y-6 text-lg text-white/60 leading-relaxed font-light">
              <p>
                Em um mundo saturado de ruído digital, a clareza é poder. Na Aegon, acreditamos que cada pixel, cada interação e cada linha de código deve servir a um propósito maior: conectar humanos a experiências significativas.
              </p>
              <p>
                Nossa abordagem funde design cinematográfico com engenharia robusta para entregar produtos que não apenas funcionam, mas inspiram.
              </p>
            </div>
          </div>

          <div className="space-y-12 overflow-hidden w-full">
            <p className="text-center text-xs font-bold tracking-[0.4em] text-white/20 uppercase">Parceiros que confiam na gente</p>
            
            <div className="relative w-full overflow-hidden mask-gradient-x">
              <div className="flex gap-24 animate-marquee whitespace-nowrap opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Duplicando a lista para efeito infinito */}
                {[...['NEXUS', 'VORTEX', 'STRATOS', 'LUMINA', 'QUANTUM'], ...['NEXUS', 'VORTEX', 'STRATOS', 'LUMINA', 'QUANTUM'], ...['NEXUS', 'VORTEX', 'STRATOS', 'LUMINA', 'QUANTUM']].map((partner, i) => (
                  <span key={i} className="text-2xl font-black tracking-widest inline-block">{partner}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-12 md:pt-24 pb-8 flex flex-col items-center text-center space-y-8 border-t border-white/5 w-full">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              Pronto para o <span className="text-aegon-blue">futuro?</span>
            </h3>
            <p className="text-white/50 max-w-lg mx-auto font-light">
              Não deixe sua ideia no papel. Vamos construir algo extraordinário juntos.
            </p>
            <button
              onClick={() => setActiveSection('contact')}
              className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden border border-white/20 rounded-full hover:border-aegon-blue transition-all duration-300 interactive"
            >
              <span className="relative z-10 flex items-center gap-3 font-bold tracking-widest uppercase text-sm group-hover:text-white transition-colors duration-300">
                Vamos Conversar <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-aegon-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </button>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .mask-gradient-x {
          mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
      `}} />
    </>
  )
}
