import type { Route } from "./+types/home";
import { Header } from "../components/Header";
import { useAppStore } from "../store";
import { motion, AnimatePresence } from "framer-motion";
import React, { Suspense } from "react";

const Hero = React.lazy(() => import("../sections/Hero").then(module => ({ default: module.Hero })));
const DNA = React.lazy(() => import("../sections/DNA").then(module => ({ default: module.DNA })));
const Services = React.lazy(() => import("../sections/Services").then(module => ({ default: module.Services })));
const Portfolio = React.lazy(() => import("../sections/Portfolio").then(module => ({ default: module.Portfolio })));
const Contact = React.lazy(() => import("../sections/Contact").then(module => ({ default: module.Contact })));
const Feedbacks = React.lazy(() => import("../sections/Feedbacks").then(module => ({ default: module.Feedbacks })));

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
          <Suspense fallback={<div>Loading...</div>}>
            {renderSection()}
          </Suspense>
          
          {/* Opcional: Renderizar feedbacks apenas em certas seções ou como parte delas */}
          {activeSection === 'services' && <Suspense fallback={<div>Loading...</div>}><Feedbacks /></Suspense>}
        </motion.div>
      </AnimatePresence>
      
      <footer className="fixed bottom-0 left-0 w-full py-6 px-8 border-t border-white/5 bg-black/20 backdrop-blur-sm text-center text-[8px] text-white/20 tracking-[0.4em] uppercase z-50">
        &copy; 2026 Aegon Digital. Protegendo o que é precioso.
      </footer>
    </main>
  );
}
