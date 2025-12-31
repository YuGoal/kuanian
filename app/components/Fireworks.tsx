'use client'

import { useEffect, useRef } from 'react'
import styles from './Fireworks.module.css'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  life: number
  decay: number
}

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const colors = [
      '#ff6b6b', '#ff4757', '#ff3838', // 红色系
      '#4ecdc4', '#00d2d3', '#54a0ff', // 青色/蓝色系
      '#45b7d1', '#2e86de', '#1e90ff', // 蓝色系
      '#f9ca24', '#feca57', '#ffd32a', // 黄色系
      '#f0932b', '#ff6348', '#ff6b81', // 橙色/粉色系
      '#eb4d4b', '#ff3838', '#ff4757', // 红色系
      '#6c5ce7', '#a29bfe', '#5f27cd', // 紫色系
      '#00d2d3', '#00d4aa', '#00b894', // 青色系
      '#ff9ff3', '#f368e0', '#ff6b9d', // 粉色系
      '#ffd32a', '#ffa502', '#ff6348', // 黄橙色系
      '#00d2d3', '#54a0ff', '#5f27cd', // 蓝紫色系
      '#ff6b6b', '#feca57', '#48dbfb', // 多彩组合
      '#ff9ff3', '#54a0ff', '#5f27cd', // 粉蓝紫组合
    ]

    const createFirework = (x: number, y: number) => {
      const particleCount = 120 + Math.random() * 80 // 120-200 个粒子
      const baseColor = colors[Math.floor(Math.random() * colors.length)]
      
      // 创建多个颜色的烟花
      const fireworkColors = [
        baseColor,
        colors[Math.floor(Math.random() * colors.length)],
        colors[Math.floor(Math.random() * colors.length)]
      ]

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5
        const speed = 3 + Math.random() * 6 // 更大的速度范围
        const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)]
        
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          life: 1,
          decay: 0.015 + Math.random() * 0.015 // 更慢的衰减，让烟花持续更久
        })
      }
    }

    const animate = () => {
      // 使用更透明的清除，让烟花轨迹更明显
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const particle = particlesRef.current[i]

        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.1 // gravity
        particle.life -= particle.decay

        if (particle.life > 0) {
          ctx.globalAlpha = particle.life
          ctx.fillStyle = particle.color
          ctx.shadowBlur = 10
          ctx.shadowColor = particle.color
          ctx.beginPath()
          const size = 4 + Math.random() * 3 // 更大的粒子，4-7像素
          ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        } else {
          particlesRef.current.splice(i, 1)
        }
      }

      ctx.globalAlpha = 1
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // 定期发射烟花 - 更频繁
    const fireworkInterval = setInterval(() => {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height * 0.6
      createFirework(x, y)
      
      // 有时同时发射多个烟花
      if (Math.random() > 0.7) {
        setTimeout(() => {
          const x2 = Math.random() * canvas.width
          const y2 = Math.random() * canvas.height * 0.6
          createFirework(x2, y2)
        }, 300)
      }
    }, 1500) // 更频繁，每1.5秒一次

    // 初始烟花
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height * 0.5
          createFirework(x, y)
        }, i * 500)
      }
    }, 500)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      clearInterval(fireworkInterval)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}

