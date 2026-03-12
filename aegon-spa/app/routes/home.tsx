import type { Route } from "./+types/home";
import { Header } from "../components/Header";
import { Hero } from "../sections/Hero";
import { DNA } from "../sections/DNA";
import { Services } from "../sections/Services";
import { Portfolio } from "../sections/Portfolio";
import { Contact } from "../sections/Contact";
import { Feedbacks } from "../sections/Feedbacks";
import { useAppStore } from "../store";
import { motion, AnimatePresence } from "framer-motion";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AEGON | Estratégia de Transformação Digital" },
    { name: "description", content: "Arquitetura de Experiência Imersiva, Interatividade Espacial e Narrativa de Marca para 2026." },
  ];
}

export default function Home() {
  const { activeSection } = useAppStore();

  const renderSection = () => {
    switch (activeSection) {
      case 'home': return <Hero />;
      case 'dna': return <DNA />;
      case 'services': return <Services />;
      case 'portfolio': return <Portfolio />;
      case 'contact': return <Contact />;
      default: return <Hero />;
    }
  };

  return (
    <main id="scroll-container" className="relative bg-transparent h-screen overflow-y-auto custom-scrollbar">
      <Header />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full"
        >
          {renderSection()}
          
          {/* Opcional: Renderizar feedbacks apenas em certas seções ou como parte delas */}
          {activeSection === 'services' && <Feedbacks />}
        </motion.div>
      </AnimatePresence>
      
      <footer className="fixed bottom-0 left-0 w-full py-6 px-8 border-t border-white/5 bg-black/20 backdrop-blur-sm text-center text-[8px] text-white/20 tracking-[0.4em] uppercase z-50">
        &copy; 2026 Aegon Digital. Protegendo o que é precioso.
      </footer>
    </main>
  );
}
