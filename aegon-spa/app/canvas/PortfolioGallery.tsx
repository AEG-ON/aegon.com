import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Image, Text, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Estrutura de dados preparada para JSON/API
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description?: string;
  year?: string;
}

// Dados MOCKADOS - Futuramente virão de um fetch/API
const projectsData: Project[] = [
  { 
    id: 1, 
    title: 'Branding Aegon', 
    category: 'Identidade Visual', 
    image: '/assets/img/brandingIdentidade.jpg',
    description: 'Redesign completo da marca focado em futurismo.',
    year: '2025'
  },
  { 
    id: 2, 
    title: 'Sistemas Digitais', 
    category: 'Desenvolvimento', 
    image: '/assets/img/desenvolvimentoSistemas.jpg',
    description: 'Plataforma SaaS escalável para gestão empresarial.',
    year: '2024'
  },
  { 
    id: 3, 
    title: 'Design de Experiência', 
    category: 'UX/UI Design', 
    image: '/assets/img/design.jpg',
    description: 'Interface imersiva para aplicativo de fintech.',
    year: '2025'
  },
  { 
    id: 4, 
    title: 'Consultoria Estratégica', 
    category: 'Business Strategy', 
    image: '/assets/img/consultoria.jpg',
    description: 'Planejamento digital para transformação de varejo.',
    year: '2024'
  },
  // Adicione mais projetos aqui para testar o layout dinâmico
]

function ProjectItem({ project, index, total }: { project: Project, index: number, total: number }) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  
  // Cálculo dinâmico de posição baseado no número total de itens
  // Distribui os itens em um arco proporcional
  const radius = 12 // Raio aumentado para afastar mais a câmera e evitar "clipping"
  const angleStep = Math.PI / (total * 0.6) // Arco mais aberto
  const totalArc = angleStep * (total - 1)
  const startAngle = -totalArc / 2
  const angle = startAngle + (index * angleStep)
  
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius - 10 // Empurra BEM mais para trás na cena

  // Helper visual para debug (GridHelper) - Remover em produção
  // const { scene } = useThree()
  // useEffect(() => {
  //   const gridHelper = new THREE.GridHelper(20, 20)
  //   scene.add(gridHelper)
  //   return () => scene.remove(gridHelper)
  // }, [scene])

  useFrame((state) => {
    if (meshRef.current) {
      // Reatividade suave ao mouse com lerp
      const mouseX = state.mouse.x * 0.1
      const mouseY = state.mouse.y * 0.1
      
      // Rotação base para olhar para o centro + influência do mouse
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, angle + mouseX, 0.05)
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouseY, 0.05)
      
      // Efeito de escala no hover
      const targetScale = hovered ? 1.15 : 1
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1))
    }
  })

  return (
    <group ref={meshRef} position={[x, 0, z]} rotation={[0, angle, 0]}>
      {/* Moldura Mockup Estilo Glassmorphism */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[6.4, 3.9]} />
        <meshBasicMaterial color="#0057ff" transparent opacity={0.1} />
      </mesh>
      
      {/* Borda brilhante no hover */}
      {hovered && (
        <mesh position={[0, 0, -0.06]}>
          <planeGeometry args={[6.6, 4.1]} />
          <meshBasicMaterial color="#0057ff" transparent opacity={0.4} />
        </mesh>
      )}
      
      <Image
        url={project.image}
        scale={[6, 3.5]}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true) }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false) }}
        transparent
        opacity={hovered ? 1 : 0.85}
        side={THREE.DoubleSide}
      >
        <MeshDistortMaterial
          distort={hovered ? 0.2 : 0}
          speed={3}
          color={hovered ? 'white' : '#e0e0e0'}
        />
      </Image>

      <group position={[0, -2.5, 0.2]}>
        <Text
          fontSize={0.3}
          color="white"
          font="https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDz7Z1xlFQ.woff"
          maxWidth={5}
          textAlign="center"
          anchorY="top"
        >
          {project.title.toUpperCase()}
        </Text>
        <Text
          position={[0, -0.4, 0]}
          fontSize={0.15}
          color="#0057ff"
          font="https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDz7Z1xlFQ.woff"
          anchorY="top"
        >
          {project.category.toUpperCase()} | {project.year}
        </Text>
        {hovered && project.description && (
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.12}
            color="white"
            maxWidth={4.5}
            textAlign="center"
            font="https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDz7Z1xlFQ.woff"
            fillOpacity={0.7}
          >
            {project.description}
          </Text>
        )}
      </group>
    </group>
  )
}

export function PortfolioGallery() {
  const groupRef = useRef<THREE.Group>(null)
  
  // Aqui você poderia fazer um fetch useEffect para pegar os dados de uma API
  // const [projects, setProjects] = useState<Project[]>([])
  // useEffect(() => { fetch('/api/projects').then(...) }, [])
  
  const projects = projectsData; // Usando mock por enquanto

  useFrame((state) => {
    if (groupRef.current) {
      // Movimento de flutuação global + rotação lenta automática se não estiver interagindo
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      // groupRef.current.rotation.y += 0.0002 // Rotação bem lenta da galeria inteira
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {projects.map((project, i) => (
        <ProjectItem key={project.id} project={project} index={i} total={projects.length} />
      ))}
    </group>
  )
}
