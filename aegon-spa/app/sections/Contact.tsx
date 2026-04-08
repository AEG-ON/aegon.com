import { useState, useRef, useEffect } from 'react'
import { Send, ArrowRight } from 'lucide-react'

export function Contact() {
  const [step, setStep] = useState(0)
  const formRef = useRef<HTMLDivElement>(null)
  
  const steps = [
    { label: 'COMO PODEMOS TE CHAMAR?', placeholder: 'Seu nome completo', key: 'name' },
    { label: 'QUAL O SEU MELHOR E-MAIL?', placeholder: 'seu@email.com', key: 'email' },
    { label: 'FALE SOBRE O SEU PROJETO', placeholder: 'Descreva sua visão...', key: 'message' },
  ]

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  useEffect(() => {
    (async () => {
      const gsap = (await import('gsap')).default;
      gsap.fromTo(formRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5 }
      )
    })();
  }, [step])

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      // Simulação de envio
      alert('Mensagem enviada com sucesso!')
      setFormData({ name: '', email: '', message: '' })
      setStep(0)
    }
  }

  return (
    <section className="min-h-screen px-8 relative z-10 bg-black pt-32 pb-24 flex items-center">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-8">
          <h2 className="text-sm font-bold tracking-[0.4em] text-aegon-blue uppercase">CONTATO</h2>
          <p className="text-5xl md:text-7xl font-bold tracking-tight">
            Pronto para <br />
            <span className="text-aegon-blue">TRANSFORMAR</span> <br />
            sua ideia?
          </p>
          <p className="text-xl text-white/50 leading-relaxed max-w-md">
            Estamos prontos para ouvir, compreender e construir com você o futuro digital da sua marca.
          </p>
          
          <div className="pt-12 space-y-4">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-aegon-blue transition-colors">
                <Send className="w-5 h-5 text-aegon-blue group-hover:text-white" />
              </div>
              <span className="text-lg font-medium text-white/60 group-hover:text-white transition-colors">contato@aegondigital.com</span>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.03] p-12 rounded-3xl border border-white/10 backdrop-blur-3xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
            <div 
              className="h-full bg-aegon-blue transition-all duration-500" 
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            ></div>
          </div>

          <div ref={formRef} className="space-y-8 py-8">
            <div className="space-y-4">
              <label className="text-xs font-bold tracking-widest text-aegon-blue uppercase">{steps[step].label}</label>
              <input
                type="text"
                placeholder={steps[step].placeholder}
                className="w-full bg-transparent border-b border-white/20 py-4 text-2xl font-medium focus:outline-none focus:border-aegon-blue transition-colors placeholder:text-white/10"
                value={formData[steps[step].key as keyof typeof formData]}
                onChange={(e) => setFormData({ ...formData, [steps[step].key]: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && nextStep()}
              />
            </div>

            <div className="flex justify-between items-center pt-8">
              <span className="text-xs text-white/30 font-bold uppercase tracking-widest">Passo {step + 1} de {steps.length}</span>
              
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-8 py-4 bg-aegon-blue text-white rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform"
              >
                {step === steps.length - 1 ? 'Enviar' : 'Próximo'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
