import { useRef, useEffect } from 'react'
import { Star, Quote } from 'lucide-react'

export function Feedbacks() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const feedbacks = [
    { name: 'Maria Rodriguez', role: 'CEO - TechStartup', text: 'A Aegon transformou completamente nossa presença digital. Em apenas 6 meses, nossas vendas cresceram 3x.', size: 'col-span-2 row-span-2' },
    { name: 'João Silva', role: 'Diretor - InnovateCorp', text: 'Equipe excepcional, entenderam perfeitamente nossa visão.', size: 'col-span-1 row-span-1' },
    { name: 'Ana Santos', role: 'Fundadora - HealthTech', text: 'O aplicativo móvel desenvolvido pela Aegon superou todas as expectativas.', size: 'col-span-1 row-span-2' },
    { name: 'Roberto Costa', role: 'Proprietário - Bella Vista', text: 'O novo branding trouxe uma personalidade única ao nosso restaurante.', size: 'col-span-1 row-span-1' },
    { name: 'Luiza Fernandes', role: 'CMO - Fashion Forward', text: 'ROI excepcional com as estratégias da Aegon.', size: 'col-span-1 row-span-1' },
  ]

  useEffect(() => {
    (async () => {
      const gsap = (await import('gsap')).default;
      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray('.feedback-item') as HTMLElement[]
        
        items.forEach((item, i) => {
          gsap.fromTo(item,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              delay: i * 0.1,
              ease: 'elastic.out(1, 0.75)',
            }
          )
        })
      }, containerRef)

      return () => ctx.revert()
    })();
  }, [])

  return (
    <div ref={containerRef} className="py-24 relative z-10 bg-transparent">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-sm font-bold tracking-[0.4em] text-aegon-blue uppercase">FEEDBACKS</h2>
          <p className="text-4xl md:text-5xl font-bold tracking-tight">
            Histórias reais de sucesso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 auto-rows-[250px]">
          {feedbacks.map((feedback, i) => (
            <div key={i} className={`feedback-item group p-10 bg-white/[0.03] border border-white/5 hover:border-aegon-blue/30 transition-all duration-500 rounded-3xl relative overflow-hidden ${feedback.size}`}>
              <div className="absolute top-4 right-4 text-aegon-blue/10 group-hover:text-aegon-blue transition-colors">
                <Quote className="w-12 h-12" />
              </div>
              
              <div className="flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 text-aegon-blue fill-aegon-blue" />
                    ))}
                  </div>
                  <p className="text-lg text-white/70 italic leading-relaxed">"{feedback.text}"</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-bold">{feedback.name}</h4>
                  <p className="text-xs text-white/30 uppercase tracking-widest">{feedback.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
