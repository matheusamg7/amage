'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  image: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "O Futuro do Design Digital em 2024",
    excerpt: "Explorando as tendências emergentes que estão moldando o futuro do design digital e experiências interativas.",
    date: "15 Mar 2024",
    readTime: "5 min",
    category: "Design",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop"
  },
  {
    id: 2,
    title: "Performance Web: Otimizando para o Sucesso",
    excerpt: "Técnicas avançadas para melhorar a performance e velocidade de carregamento das aplicações web modernas.",
    date: "12 Mar 2024",
    readTime: "8 min",
    category: "Desenvolvimento",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    title: "IA e Criatividade: Uma Nova Era",
    excerpt: "Como a inteligência artificial está revolucionando o processo criativo e abrindo novas possibilidades.",
    date: "10 Mar 2024",
    readTime: "6 min",
    category: "Tecnologia",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop"
  },
  {
    id: 4,
    title: "Motion Design: Dando Vida às Interfaces",
    excerpt: "A importância das micro-interações e animações na criação de experiências digitais memoráveis.",
    date: "8 Mar 2024",
    readTime: "7 min",
    category: "UI/UX",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop"
  },
  {
    id: 5,
    title: "Estratégias de Branding Digital",
    excerpt: "Construindo marcas fortes e consistentes no ambiente digital através de storytelling e design.",
    date: "5 Mar 2024",
    readTime: "10 min",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&h=600&fit=crop"
  },
  {
    id: 6,
    title: "WebGL e Three.js: Criando Experiências 3D",
    excerpt: "Um guia prático para criar experiências 3D imersivas na web usando WebGL e Three.js.",
    date: "2 Mar 2024",
    readTime: "12 min",
    category: "Desenvolvimento",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop"
  }
]

const categories = ["Todos", "Design", "Desenvolvimento", "Tecnologia", "UI/UX", "Marketing"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)

  const filteredPosts = selectedCategory === "Todos" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-8 mb-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Blog
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Insights, tendências e conhecimento sobre design, tecnologia e inovação digital
          </motion.p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-magenta border-magenta text-white'
                    : 'bg-transparent border-gray-700 text-gray-400 hover:border-magenta hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 transition-all duration-500 hover:border-magenta/50">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredPost === post.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-magenta/20 backdrop-blur-sm border border-magenta/50 rounded-full text-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime} de leitura</span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-magenta transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Read More */}
                    <motion.div 
                      className="mt-4 flex items-center gap-2 text-magenta font-medium"
                      animate={{
                        x: hoveredPost === post.id ? 10 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span>Ler mais</span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7 5L12 10L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at center, magenta 0%, transparent 70%)',
                      filter: 'blur(60px)',
                    }}
                  />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="px-8 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 15L8 10L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Voltar ao início</span>
          </Link>
        </div>
      </section>
    </main>
  )
}