'use client'

import { useEffect, useState, useRef } from 'react'
import styles from './page.module.css'
import Fireworks from './components/Fireworks'
import Danmaku from './components/Danmaku'

interface DanmakuItem {
  id: number
  text: string
  top: number
  color: string
  speed: number
}

export default function Home() {
  const [time, setTime] = useState(new Date())
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [danmakus, setDanmakus] = useState<DanmakuItem[]>([])
  const [inputText, setInputText] = useState('')
  const danmakuIdRef = useRef(0)
  const [isLoading, setIsLoading] = useState(true)

  // 加载历史弹幕
  useEffect(() => {
    const loadDanmakus = async () => {
      try {
        const response = await fetch('/api/danmaku')
        const result = await response.json()
        
        if (result.success && result.data) {
          // 将历史弹幕添加到显示列表，并设置延迟播放
          const historyDanmakus: DanmakuItem[] = result.data.map((item: any, index: number) => ({
            id: item.id || Date.now() + index,
            text: item.text,
            top: item.top,
            color: item.color,
            speed: item.speed
          }))

          // 分批播放历史弹幕，避免同时显示太多
          historyDanmakus.forEach((danmaku, index) => {
            setTimeout(() => {
              setDanmakus((prev) => [...prev, danmaku])
              
              // 移除过期的弹幕
              setTimeout(() => {
                setDanmakus((prev) => prev.filter((d) => d.id !== danmaku.id))
              }, danmaku.speed * 1000)
            }, index * 500) // 每 500ms 播放一条
          })
        }
      } catch (error) {
        console.error('Failed to load danmakus:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDanmakus()
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now)
      
      // 计算到2026年1月1日0点的倒计时
      const targetDate = new Date('2026-01-01T00:00:00')
      const diff = targetDate.getTime() - now.getTime()
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        
        setCountdown({ days, hours, minutes, seconds })
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe', '#ffffff']

  const sendDanmaku = async () => {
    if (!inputText.trim()) return

    const newDanmaku: DanmakuItem = {
      id: Date.now() + Math.random(),
      text: inputText.trim(),
      top: Math.random() * 80 + 10, // 10% to 90%
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 8 + Math.random() * 4 // 8-12 seconds
    }

    // 立即显示弹幕
    setDanmakus((prev) => [...prev, newDanmaku])
    setInputText('')

    // 保存到服务器
    try {
      await fetch('/api/danmaku', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newDanmaku.text,
          top: newDanmaku.top,
          color: newDanmaku.color,
          speed: newDanmaku.speed,
        }),
      })
    } catch (error) {
      console.error('Failed to save danmaku:', error)
    }

    // 移除过期的弹幕
    setTimeout(() => {
      setDanmakus((prev) => prev.filter((d) => d.id !== newDanmaku.id))
    }, newDanmaku.speed * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendDanmaku()
    }
  }

  return (
    <main className={styles.container}>
      <Fireworks />
      <Danmaku danmakus={danmakus} />
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>2026</h1>
        </div>
        
        <div className={styles.countdownSection}>
          <div className={styles.countdownTitle}>距离 2026 年还有</div>
          <div className={styles.countdownDisplay}>
            <div className={styles.countdownItem}>
              <div className={styles.countdownNumber}>{String(countdown.days).padStart(2, '0')}</div>
              <div className={styles.countdownLabel}>天</div>
            </div>
            <div className={styles.countdownSeparator}>:</div>
            <div className={styles.countdownItem}>
              <div className={styles.countdownNumber}>{String(countdown.hours).padStart(2, '0')}</div>
              <div className={styles.countdownLabel}>时</div>
            </div>
            <div className={styles.countdownSeparator}>:</div>
            <div className={styles.countdownItem}>
              <div className={styles.countdownNumber}>{String(countdown.minutes).padStart(2, '0')}</div>
              <div className={styles.countdownLabel}>分</div>
            </div>
            <div className={styles.countdownSeparator}>:</div>
            <div className={styles.countdownItem}>
              <div className={styles.countdownNumber}>{String(countdown.seconds).padStart(2, '0')}</div>
              <div className={styles.countdownLabel}>秒</div>
            </div>
          </div>
        </div>

        <div className={styles.danmakuInput}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入弹幕内容..."
            className={styles.input}
            maxLength={50}
          />
          <button onClick={sendDanmaku} className={styles.sendButton}>
            发送
          </button>
        </div>
      </div>
    </main>
  )
}

