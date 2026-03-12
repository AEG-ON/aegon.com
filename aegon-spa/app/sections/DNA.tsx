import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function DNA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  
  const milestones = [
    { title: 'NOSSA MISSÃO', text: 'Democratizar o acesso a soluções digitais de qualidade, ajudando empresas de todos os tamanhos a alcançar seus objetivos através da inovação tecnológica.' },
    { title: 'NOSSA VISÃO', text: 'Ser reconhecida como a principal referência em transformação digital, criando experiências que conectam marcas e pessoas de forma autêntica.' },
    { title: 'NOSSOS VALORES', text: 'Inovação constante, excelência em execução, transparência total, foco no cliente e responsabilidade social em cada projeto que desenvolvemos.' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação de entrada estilo Rockstar
      gsap.from('.dna-bg-image', {
        scale: 1.5,
        opacity: 0,
        duration: 2,
        ease: 'power2.out'
      })

      const sections = gsap.utils.toArray('.dna-section') as HTMLElement[]
      sections.forEach((section, i) => {
        gsap.fromTo(section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2 + i * 0.1,
            ease: 'power4.out',
          }
        )
      })

      // Inverter cor de fundo imediatamente na seção DNA
      gsap.to('body', { backgroundColor: '#0057ff', duration: 1 })
    }, containerRef)

    return () => {
      ctx.revert()
      gsap.to('body', { backgroundColor: '#000000', duration: 1 })
    }
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen px-8 overflow-y-auto pt-32 pb-24 custom-scrollbar">
      {/* Imagem de fundo estilo Rockstar */}
      <div className="absolute inset-0 -z-10 dna-bg-image opacity-20">
        <img 
          src="/assets/img/bgAegonLetter.png" 
          alt="DNA Background" 
          className="w-full h-full object-cover scale-110"
        />
      </div>

      <div className="max-w-6xl mx-auto space-y-48 relative z-10">
        <div className="dna-section space-y-6 max-w-3xl">
          <h2 className="text-sm font-black tracking-[0.5em] text-aegon-blue uppercase">DNA & CULTURA</h2>
          <p className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
            PROTEGEMOS O QUE É <br />
            <span className="text-white">PRECIOSO</span>
          </p>
          <p className="text-xl md:text-2xl text-white/60 leading-relaxed font-light">
            Nossa essência reside na fusão entre a solidez da tradição e a agilidade da era digital. 
            Não apenas construímos interfaces; criamos legados digitais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-24">
          {milestones.map((milestone, i) => (
            <div key={i} className="dna-section milestone-card group p-12 bg-white/[0.03] backdrop-blur-3xl border border-white/5 hover:border-aegon-blue transition-all duration-700 rounded-[2rem]">
              <div className="text-6xl font-black text-white/5 mb-8 group-hover:text-aegon-blue/20 transition-colors">0{i + 1}</div>
              <h3 className="text-2xl font-black mb-6 tracking-tight uppercase">{milestone.title}</h3>
              <p className="text-white/50 leading-relaxed font-light group-hover:text-white/80 transition-colors duration-500">{milestone.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
