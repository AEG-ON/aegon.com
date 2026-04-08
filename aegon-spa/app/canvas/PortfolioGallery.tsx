import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Text, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore } from '../store'

type PlanetProject = {
  titulo: string
  descricao: string
  link: string
}

type PlanetData = {
  id: string
  nome: string
  cor: string
  icone: string
  posicao: [number, number, number]
  escala: number
  preview: string
  projetos: PlanetProject[]
}

const planets: PlanetData[] = [
  {
    id: 'excel',
    nome: 'Excel',
    cor: '#217346',
    icone: 'XLS',
    posicao: [-8, 2.2, -10],
    escala: 1.18,
    preview: '/assets/img/consultoria.jpg',
    projetos: [
      { titulo: 'Automação de Relatórios', descricao: 'Dashboards em Excel com atualização automática e validações inteligentes.', link: 'https://aegon.com/excel-relatorios' },
      { titulo: 'Modelagem Financeira', descricao: 'Modelos de cenário, fluxo de caixa e previsão com alto controle de versão.', link: 'https://aegon.com/excel-financeiro' },
      { titulo: 'KPIs Operacionais', descricao: 'Painéis de indicadores com foco em operação diária e metas por setor.', link: 'https://aegon.com/excel-kpi' },
    ],
  },
  {
    id: 'power-bi',
    nome: 'Power BI',
    cor: '#F2C811',
    icone: 'PBI',
    posicao: [7.3, -1.8, -22],
    escala: 1.22,
    preview: '/assets/img/desenvolvimentoSistemas.jpg',
    projetos: [
      { titulo: 'Painel Executivo', descricao: 'Visão gerencial consolidada com metas, tendências e drilldown por unidade.', link: 'https://aegon.com/pbi-executivo' },
      { titulo: 'Analytics Comercial', descricao: 'Análise de funil, margem e recorrência com insights acionáveis em tempo real.', link: 'https://aegon.com/pbi-comercial' },
      { titulo: 'Operação em Tempo Real', descricao: 'Monitoramento de operação com alertas visuais para desvios críticos.', link: 'https://aegon.com/pbi-operacao' },
    ],
  },
  {
    id: 'aplicativos',
    nome: 'Aplicativos',
    cor: '#3B82F6',
    icone: 'APP',
    posicao: [-6.2, 3.1, -34],
    escala: 1.16,
    preview: '/assets/img/design.jpg',
    projetos: [
      { titulo: 'App de Vendas', descricao: 'Aplicativo com jornada de venda guiada e integração com CRM.', link: 'https://aegon.com/app-vendas' },
      { titulo: 'App de Serviços', descricao: 'Solicitações, ordens e acompanhamento com experiência mobile otimizada.', link: 'https://aegon.com/app-servicos' },
      { titulo: 'App de Comunidade', descricao: 'Plataforma de engajamento com conteúdo, notificações e gamificação.', link: 'https://aegon.com/app-comunidade' },
    ],
  },
  {
    id: 'desenvolvimento-software',
    nome: 'Desenvolvimento de Software',
    cor: '#8B5CF6',
    icone: 'DEV',
    posicao: [9.4, -2.5, -45],
    escala: 1.2,
    preview: '/assets/img/desenvolvimentoSistemas.jpg',
    projetos: [
      { titulo: 'Plataforma SaaS', descricao: 'Arquitetura escalável, autenticação robusta e módulo analítico integrado.', link: 'https://aegon.com/dev-saas' },
      { titulo: 'API Corporativa', descricao: 'Integração entre sistemas legados e novos produtos com alta confiabilidade.', link: 'https://aegon.com/dev-api' },
      { titulo: 'Portal B2B', descricao: 'Portal transacional com gestão de conta, pedidos e atendimento inteligente.', link: 'https://aegon.com/dev-portal' },
    ],
  },
  {
    id: 'landing-pages-sites',
    nome: 'Landing Pages / Sites',
    cor: '#93C5FD',
    icone: 'WEB',
    posicao: [-10.2, -2.7, -57],
    escala: 1.14,
    preview: '/assets/img/brandingIdentidade.jpg',
    projetos: [
      { titulo: 'Landing de Conversão', descricao: 'Página de aquisição com testes A/B e foco em lead qualificado.', link: 'https://aegon.com/web-landing' },
      { titulo: 'Site Institucional', descricao: 'Presença digital com posicionamento claro e narrativa de marca.', link: 'https://aegon.com/web-site' },
      { titulo: 'Hotsite de Campanha', descricao: 'Experiência temática de alto impacto para lançamentos sazonais.', link: 'https://aegon.com/web-hotsite' },
    ],
  },
  {
    id: 'apresentacoes',
    nome: 'Apresentações',
    cor: '#D24726',
    icone: 'PPT',
    posicao: [11.4, 2.8, -70],
    escala: 1.18,
    preview: '/assets/img/criacaoConteudo.jpg',
    projetos: [
      { titulo: 'Deck de Investidores', descricao: 'Narrativa estratégica para captação com clareza de proposta de valor.', link: 'https://aegon.com/ppt-investidores' },
      { titulo: 'Apresentação Comercial', descricao: 'Materiais para times de vendas com storytelling visual orientado a conversão.', link: 'https://aegon.com/ppt-comercial' },
      { titulo: 'Keynote Institucional', descricao: 'Apresentação executiva com linguagem visual premium para eventos.', link: 'https://aegon.com/ppt-keynote' },
    ],
  },
]

function PlanetNode({
  planet,
  index,
  isFocused,
  focusStrength,
  onSelect,
}: {
  planet: PlanetData
  index: number
  isFocused: boolean
  focusStrength: number
  onSelect: () => void
}) {
  const ref = useRef<THREE.Group>(null)
  const plateRef = useRef<THREE.Mesh>(null)
  const frameRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const texture = useTexture(planet.preview)

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 16
    texture.needsUpdate = true
  }, [texture])

  useFrame((state) => {
    if (!ref.current) return
    const orbitTime = state.clock.elapsedTime * (0.13 + index * 0.014) + index * 1.3
    const orbitRadius = isFocused ? 0.04 : 0.3 + index * 0.1
    const targetX = planet.posicao[0] + Math.cos(orbitTime) * orbitRadius
    const targetY = planet.posicao[1] + Math.sin(orbitTime * 1.25) * (isFocused ? 0.04 : 0.24)
    const targetZ = planet.posicao[2] + Math.sin(orbitTime * 0.8) * (isFocused ? 0.04 : 0.3)
    const hoverScale = hovered ? 1.06 : 1
    const focusScale = THREE.MathUtils.lerp(1, 1.82, focusStrength)
    const baseScale = planet.escala * hoverScale * focusScale

    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.09)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.09)
    ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetZ, 0.09)
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.clock.elapsedTime * (0.16 + index * 0.02), 0.05)
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, Math.sin(orbitTime * 0.66) * 0.08, 0.05)
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, baseScale, 0.09))
    if (plateRef.current) plateRef.current.lookAt(state.camera.position)
    if (frameRef.current) frameRef.current.lookAt(state.camera.position)
  })

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[2.05, 54, 54]} />
        <meshStandardMaterial color="#050b18" emissive={planet.cor} emissiveIntensity={THREE.MathUtils.lerp(0.16, 0.5, focusStrength)} roughness={0.36} metalness={0.22} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.32, 38, 38]} />
        <meshBasicMaterial color={planet.cor} transparent opacity={THREE.MathUtils.lerp(0.1, 0.24, focusStrength)} />
      </mesh>
      <mesh
        ref={plateRef}
        position={[0, 0.05, 1.72]}
        onClick={onSelect}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}
      >
        <planeGeometry args={[2.35, 2.35]} />
        <meshBasicMaterial map={texture} transparent opacity={THREE.MathUtils.lerp(0.66, 1, focusStrength)} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={frameRef} position={[0, 0.05, 1.78]}>
        <planeGeometry args={[2.5, 2.5]} />
        <meshBasicMaterial color={planet.cor} wireframe transparent opacity={THREE.MathUtils.lerp(0.34, 0.92, focusStrength)} side={THREE.DoubleSide} />
      </mesh>
      <group position={[0, -2.95, 0]}>
        <Text fontSize={0.25} color="white" maxWidth={5} textAlign="center" anchorY="middle">
          {planet.nome}
        </Text>
      </group>
      <group position={[0, -3.35, 0]}>
        <Text fontSize={0.12} color="#bfdbfe" maxWidth={5} textAlign="center" anchorY="middle">
          {planet.icone}
        </Text>
      </group>
    </group>
  )
}

export function PortfolioGallery() {
  const {
    setPortfolioInteractive,
    focusPlanet,
    setFocusPlanet,
    currentProjectIndex,
    setCurrentProjectIndex,
  } = useAppStore((state) => ({
    setPortfolioInteractive: state.setPortfolioInteractive,
    focusPlanet: state.focusPlanet,
    setFocusPlanet: state.setFocusPlanet,
    currentProjectIndex: state.currentProjectIndex,
    setCurrentProjectIndex: state.setCurrentProjectIndex,
  }))

  const rootRef = useRef<THREE.Group>(null)
  const cueRef = useRef<THREE.Group>(null)
  const scrollTargetRef = useRef(0)
  const scrollProgressRef = useRef(0)
  const lastWheelRef = useRef(0)
  const isTransitioningRef = useRef(false)

  const [isInteractive, setIsInteractive] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flightProgress, setFlightProgress] = useState(0)
  const maxIndex = planets.length - 1
  const step = 1 / maxIndex
  const activePlanet = planets[currentIndex]
  const activeProjects = activePlanet.projetos
  const activeProject = activeProjects[Math.min(currentProjectIndex, activeProjects.length - 1)]
  const canShowOverlay = isInteractive && !!focusPlanet

  const getStop = (index: number) => index / maxIndex

  const jumpToIndex = (index: number) => {
    const next = THREE.MathUtils.clamp(index, 0, maxIndex)
    setCurrentIndex(next)
    setFocusPlanet(null)
    setCurrentProjectIndex(0)
    scrollTargetRef.current = getStop(next)
    isTransitioningRef.current = true
  }

  const jumpPlanet = (direction: 1 | -1) => {
    if (!isInteractive) {
      setPortfolioInteractive(true)
      setIsInteractive(true)
      jumpToIndex(0)
      return
    }
    jumpToIndex(currentIndex + direction)
  }

  useEffect(() => {
    return () => {
      setPortfolioInteractive(false)
      setFocusPlanet(null)
      setCurrentProjectIndex(0)
    }
  }, [setPortfolioInteractive, setCurrentProjectIndex, setFocusPlanet])

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      const now = performance.now()
      if (now - lastWheelRef.current < 120) return
      if (Math.abs(event.deltaY) < 6) return
      lastWheelRef.current = now
      const direction = event.deltaY > 0 ? 1 : -1

      if (!isInteractive) {
        if (direction < 0) return
        event.preventDefault()
        setPortfolioInteractive(true)
        setIsInteractive(true)
        jumpToIndex(0)
        return
      }

      event.preventDefault()
      if (focusPlanet) {
        setFocusPlanet(null)
        setCurrentProjectIndex(0)
        isTransitioningRef.current = true
        return
      }
      if (isTransitioningRef.current) return
      jumpPlanet(direction as 1 | -1)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [isInteractive, currentIndex, focusPlanet, setPortfolioInteractive, setCurrentProjectIndex, setFocusPlanet])

  useFrame((state) => {
    scrollProgressRef.current = THREE.MathUtils.lerp(scrollProgressRef.current, scrollTargetRef.current, 0.1)
    const currentProgress = scrollProgressRef.current
    setFlightProgress(currentProgress)
    if (Math.abs(currentProgress - scrollTargetRef.current) < 0.0028) {
      isTransitioningRef.current = false
    }

    if (rootRef.current) {
      const baseStop = getStop(currentIndex)
      const stopDelta = Math.abs(currentProgress - baseStop)
      if (stopDelta < 0.055) {
        scrollProgressRef.current = THREE.MathUtils.lerp(scrollProgressRef.current, baseStop, 0.085)
      }

      const planet = planets[currentIndex]
      const travelZ = THREE.MathUtils.lerp(4, -planet.posicao[2] + 6.3, currentProgress)
      const travelX = THREE.MathUtils.lerp(0, -planet.posicao[0] * 0.9, currentProgress)
      const travelY = THREE.MathUtils.lerp(0.2, -planet.posicao[1] * 0.75, currentProgress)
      rootRef.current.position.z = THREE.MathUtils.lerp(rootRef.current.position.z, travelZ, 0.09)
      rootRef.current.position.x = THREE.MathUtils.lerp(rootRef.current.position.x, travelX + state.mouse.x * 1.35, 0.08)
      rootRef.current.position.y = THREE.MathUtils.lerp(rootRef.current.position.y, travelY + state.mouse.y * 0.4, 0.08)
      rootRef.current.rotation.y = THREE.MathUtils.lerp(rootRef.current.rotation.y, state.mouse.x * 0.14, 0.06)
      rootRef.current.rotation.x = THREE.MathUtils.lerp(rootRef.current.rotation.x, -state.mouse.y * 0.09, 0.06)
    }

    if (cueRef.current && !isInteractive) {
      cueRef.current.position.y = THREE.MathUtils.lerp(cueRef.current.position.y, -0.5 + Math.sin(state.clock.elapsedTime * 2.3) * 0.16, 0.08)
      cueRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.4) * 0.12
    }

    if (!focusPlanet && isInteractive && Math.abs(currentProgress - getStop(currentIndex)) < 0.035 && !isTransitioningRef.current) {
      setFocusPlanet(planets[currentIndex].id)
      setCurrentProjectIndex(0)
    }
  })

  const focusedPlanetIndex = planets.findIndex((p) => p.id === focusPlanet)

  return (
    <group ref={rootRef} position={[0, 0, 0]}>
      <mesh position={[0, -5, -12]}>
        <planeGeometry args={[88, 52]} />
        <meshBasicMaterial color="#020611" transparent opacity={0.86} />
      </mesh>

      <Text position={[0, 6.1, -2]} fontSize={0.18} color="#60a5fa" maxWidth={11} textAlign="center" anchorY="middle">
        {isInteractive ? 'Scroll por etapas + atração gravitacional por planeta' : 'Deslize o scroll para iniciar a navegação por planetas'}
      </Text>

      {!isInteractive && (
        <group ref={cueRef} position={[0, -0.5, -0.3]}>
          <mesh>
            <ringGeometry args={[0.38, 0.58, 48]} />
            <meshBasicMaterial color="#2563eb" transparent opacity={0.88} />
          </mesh>
          <mesh position={[0, -0.95, 0]}>
            <coneGeometry args={[0.2, 0.4, 24]} />
            <meshBasicMaterial color="#60a5fa" transparent opacity={0.95} />
          </mesh>
          <Text position={[0, -1.55, 0]} fontSize={0.16} color="#93c5fd" maxWidth={9} textAlign="center" anchorY="middle">
            scroll para decolar
          </Text>
        </group>
      )}

      {planets.map((planet, index) => {
        const isFocused = focusPlanet === planet.id
        const stop = getStop(index)
        const focusStrength = isFocused ? 1 : THREE.MathUtils.clamp(1 - Math.abs(flightProgress - stop) * 5.5, 0, 0.92)
        return (
          <PlanetNode
            key={planet.id}
            planet={planet}
            index={index}
            isFocused={isFocused}
            focusStrength={focusStrength}
            onSelect={() => jumpToIndex(index)}
          />
        )
      })}

      <Html fullscreen>
        <div className="pointer-events-none absolute left-0 right-0 bottom-8 px-8">
          <div className="mx-auto w-[min(92vw,980px)]">
            <div className="h-[3px] rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-aegon-blue transition-[width] duration-200" style={{ width: `${Math.max(4, flightProgress * 100)}%` }} />
            </div>
          </div>
        </div>
      </Html>

      <Html fullscreen>
        <div className="pointer-events-none absolute inset-x-0 bottom-24 flex flex-col items-center gap-2">
          <div className="px-3 py-1 rounded-full border border-white/20 bg-black/55 text-[11px] uppercase tracking-[0.32em] text-white/85 font-bold">
            {currentIndex + 1}/{planets.length}
          </div>
          <div className="flex items-center gap-2">
            {planets.map((planet, index) => (
              <span
                key={planet.id}
                className={`h-1.5 rounded-full transition-all duration-200 ${index === currentIndex ? 'w-8 bg-aegon-blue' : 'w-2 bg-white/35'}`}
              />
            ))}
          </div>
        </div>
      </Html>

      <Html fullscreen>
        <div className="pointer-events-none absolute inset-x-0 bottom-16 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => jumpPlanet(-1)}
            className="pointer-events-auto w-11 h-11 rounded-full border border-white/25 bg-black/55 text-white text-lg leading-none hover:border-aegon-blue transition-colors"
            aria-label="Planeta anterior"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => jumpPlanet(1)}
            className="pointer-events-auto w-11 h-11 rounded-full border border-white/25 bg-black/55 text-white text-lg leading-none hover:border-aegon-blue transition-colors"
            aria-label="Próximo planeta"
          >
            →
          </button>
        </div>
      </Html>

      {canShowOverlay && focusedPlanetIndex >= 0 && activeProject && (
        <Html fullscreen>
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-24">
            <div className="pointer-events-auto w-[min(94vw,980px)] rounded-3xl border border-white/15 bg-black/65 backdrop-blur-xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <p className="text-xs uppercase tracking-[0.35em] text-aegon-blue font-bold">{activePlanet.nome} · {activePlanet.icone}</p>
                  <h3 className="mt-1 text-3xl font-black uppercase tracking-tight text-white">{activeProject.titulo}</h3>
                  <p className="mt-2 text-white/75">{activeProject.descricao}</p>
                </div>
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl border border-aegon-blue/60 text-aegon-blue font-bold uppercase text-xs tracking-[0.25em]"
                >
                  Acessar projeto
                </a>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentProjectIndex((currentProjectIndex - 1 + activeProjects.length) % activeProjects.length)}
                  className="px-4 py-2 rounded-lg border border-white/20 text-white/85 text-xs uppercase tracking-wider"
                >
                  ← Projeto anterior
                </button>
                <span className="text-[11px] uppercase tracking-[0.28em] text-white/60 font-bold">
                  {currentProjectIndex + 1}/{activeProjects.length}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentProjectIndex((currentProjectIndex + 1) % activeProjects.length)}
                  className="px-4 py-2 rounded-lg border border-white/20 text-white/85 text-xs uppercase tracking-wider"
                >
                  Próximo projeto →
                </button>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}
