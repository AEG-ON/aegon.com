export function Portfolio() {
  return (
    <section className="h-screen flex items-center justify-between px-8 md:px-24 relative z-10 pointer-events-none overflow-hidden">
      <div className="max-w-2xl space-y-8">
        <h2 className="text-sm font-black tracking-[0.5em] text-aegon-blue uppercase">PORTFÓLIO IMERSIVO</h2>
        <p className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
          GALERIA <br />
          <span className="text-white/20">ESPACIAL</span>
        </p>
        <div className="space-y-4">
          <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-light max-w-lg">
            Navegue pelo nosso universo de projetos através de uma experiência 3D não linear.
          </p>
          <div className="flex items-center gap-6 pt-8 pointer-events-auto">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest text-aegon-blue font-bold">Interação</span>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-[10px] uppercase tracking-tighter">Passe o mouse para destacar</div>
                <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-[10px] uppercase tracking-tighter">Role para explorar</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute right-24 bottom-24 text-right space-y-2 opacity-30">
        <p className="text-4xl font-black uppercase tracking-tighter">Reactive Depth</p>
        <p className="text-xs uppercase tracking-[0.5em] font-bold">Engine: Three.js + R3F</p>
      </div>
    </section>
  )
}
