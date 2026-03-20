import { useRef, useEffect } from 'react'
import gsap from "gsap";
import { LayoutGrid, Palette, Code, Smartphone, BarChart, Users, ArrowRight } from 'lucide-react'

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const services = [
    { title: 'Branding & Identidade Visual', description: 'Construímos marcas autênticas que comunicam valores e despertam confiança.', icon: Palette, img: '/assets/img/brandingIdentidade.jpg' },
    { title: 'Desenvolvimento Web & E-commerce', description: 'Desenvolvemos plataformas seguras, intuitivas e escaláveis.', icon: Code, img: '/assets/img/desenvolvimentoSistemas.jpg' },
    { title: 'Aplicativos Mobile', description: 'Criamos aplicativos que combinam design intuitivo e performance.', icon: Smartphone, img: '/assets/img/design.jpg' },
    { title: 'Marketing Digital, SEO & Performance', description: 'Estratégias orientadas a dados que ampliam visibilidade e geram resultados.', icon: BarChart, img: '/assets/img/criacaoConteudo.jpg' },
    { title: 'Consultoria Digital & Analytics', description: 'Apoiamos decisões estratégicas com insights claros e soluções inteligentes.', icon: LayoutGrid, img: '/assets/img/consultoria.jpg' },
    { title: 'Consultoria Estratégica', description: 'Orientação especializada para alinhar inovação e responsabilidade social.', icon: Users, img: '/assets/img/veraPrado.png' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      })

      const cards = gsap.utils.toArray('.service-card') as HTMLElement[]
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2 + i * 0.1,
            ease: 'power3.out',
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="min-h-screen px-8 bg-black/40 backdrop-blur-3xl relative z-10 pt-32 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="services-title space-y-8 max-w-4xl mb-32">
          <h2 className="text-sm font-black tracking-[0.5em] text-aegon-blue uppercase">NOSSAS SOLUÇÕES</h2>
          <p className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
            TRANSFORMANDO <br />
            <span className="text-white/20">IDEIAS EM</span> IMPACTO
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div key={i} className="service-card group relative h-[500px] overflow-hidden rounded-[2.5rem] border border-white/10">
              {/* Background Image on Hover */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              </div>

              <div className="relative z-10 h-full p-12 flex flex-col justify-between">
                <div className="w-20 h-20 bg-aegon-blue rounded-3xl flex items-center justify-center mb-8 transform group-hover:rotate-[15deg] transition-transform duration-500">
                  <service.icon className="w-10 h-10 text-white" />
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-3xl font-black tracking-tight uppercase leading-tight">{service.title}</h3>
                  <p className="text-white/40 leading-relaxed font-light group-hover:text-white/80 transition-colors duration-500 line-clamp-3">
                    {service.description}
                  </p>
                  
                  <div className="pt-8 flex items-center gap-4 text-aegon-blue font-black tracking-widest uppercase text-xs">
                    <span>Explorar Serviço</span>
                    <div className="w-12 h-[2px] bg-aegon-blue group-hover:w-24 transition-all duration-500"></div>
                    <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
