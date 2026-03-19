import { useAppStore } from '../store'
import { useMagnetic } from '../hooks/useMagnetic'

export function Header() {
  const { activeSection, setActiveSection, toggleTheme, isVideoPlaying, setIsVideoPlaying } = useAppStore()
  const logoRef = useMagnetic()
  
  const handleLogoClick = () => {
    setActiveSection('home')
    toggleTheme()
    setIsVideoPlaying(!isVideoPlaying)
  }

  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'DNA', id: 'dna' },
    { name: 'Serviços', id: 'services' },
    { name: 'Portfólio', id: 'portfolio' },
    { name: 'Contato', id: 'contact' },
  ]

  return (
    <header className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 bg-gradient-to-b from-white/50 dark:from-black/50 to-transparent transition-colors duration-500">
      <div 
        ref={logoRef} 
        onClick={handleLogoClick} 
        className="w-40 md:w-56 cursor-pointer interactive group relative"
      >
        <img 
          src="/assets/img/logo.png" 
          alt="AEGON" 
          className={`w-full h-auto object-contain transition-all duration-500 invert dark:invert-0 ${isVideoPlaying ? 'brightness-200 drop-shadow-[0_0_15px_rgba(0,87,255,0.8)]' : ''}`} 
        />
        {isVideoPlaying && (
          <div className="absolute inset-0 bg-aegon-blue/20 blur-2xl -z-10 animate-pulse"></div>
        )}
      </div>
      
      <nav className="hidden md:flex gap-12">
        {menuItems.map((item) => {
          const itemRef = useMagnetic()
          return (
            <button
              key={item.id}
              ref={itemRef}
              onClick={() => setActiveSection(item.id)}
              className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-300 interactive ${
                activeSection === item.id ? 'text-aegon-blue scale-110' : 'text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white'
              }`}
            >
              {item.name}
            </button>
          )
        })}
      </nav>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center hover:border-aegon-blue transition-colors cursor-pointer group interactive">
          <div className="w-1 h-1 bg-black dark:bg-white rounded-full group-hover:bg-aegon-blue group-hover:scale-150 transition-all"></div>
        </div>
      </div>
    </header>
  )
}
