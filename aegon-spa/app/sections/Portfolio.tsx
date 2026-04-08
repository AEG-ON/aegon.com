import { useAppStore } from '../store'

export function Portfolio() {
  const isPortfolioInteractive = useAppStore((state) => state.isPortfolioInteractive)

  return (
    <section className="h-screen flex items-center justify-between px-8 md:px-24 relative z-10 pointer-events-none overflow-hidden">
      <div className={`transition-all duration-500 ${isPortfolioInteractive ? 'fixed top-22 left-4 md:left-8 z-30 max-w-[280px] space-y-2 opacity-80' : 'max-w-2xl space-y-8'}`}>
        <h2 className={`${isPortfolioInteractive ? 'text-[10px] tracking-[0.42em]' : 'text-sm tracking-[0.5em]'} font-black text-aegon-blue uppercase transition-all duration-500`}>PORTFÓLIO IMERSIVO</h2>
        <p className={`${isPortfolioInteractive ? 'text-5xl md:text-6xl' : 'text-6xl md:text-9xl'} font-black tracking-tighter uppercase leading-[0.9] transition-all duration-500`}>
          GALERIA <br />
          <span className="text-white/20">ESPACIAL</span>
        </p>
        <div className={`space-y-4 transition-all duration-500 ${isPortfolioInteractive ? 'opacity-65' : ''}`}>
          <p className={`${isPortfolioInteractive ? 'text-sm max-w-[220px]' : 'text-xl md:text-2xl max-w-lg'} text-white/50 leading-relaxed font-light transition-all duration-500`}>
            Inicie com o scroll para baixo e desbloqueie uma experiência 3D não linear de projetos.
          </p>
          <div className={`flex items-center gap-6 pointer-events-auto transition-all duration-500 ${isPortfolioInteractive ? 'pt-0 opacity-0 scale-95 h-0 overflow-hidden' : 'pt-8 opacity-100 scale-100'}`}>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest text-aegon-blue font-bold">Interação</span>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-[10px] uppercase tracking-tighter">Scroll para iniciar</div>
                <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-[10px] uppercase tracking-tighter">Clique para aproximar</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`hidden lg:block absolute right-24 bottom-24 text-right space-y-2 transition-all duration-500 ${isPortfolioInteractive ? 'opacity-0 translate-y-4' : 'opacity-30'}`}>
        <p className="text-4xl font-black uppercase tracking-tighter">Reactive Depth</p>
        <p className="text-xs uppercase tracking-[0.5em] font-bold">Engine: Three.js + R3F</p>
      </div>
    </section>
  )
}
