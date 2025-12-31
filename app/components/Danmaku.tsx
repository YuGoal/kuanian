'use client'

import styles from './Danmaku.module.css'

interface DanmakuItem {
  id: number
  text: string
  top: number
  color: string
  speed: number
}

interface DanmakuProps {
  danmakus: DanmakuItem[]
}

export default function Danmaku({ danmakus }: DanmakuProps) {
  return (
    <div className={styles.container}>
      {danmakus.map((item) => (
        <div
          key={item.id}
          className={styles.danmaku}
          style={{
            top: `${item.top}%`,
            color: item.color,
            '--duration': `${item.speed}s`
          } as React.CSSProperties & { '--duration': string }}
        >
          {item.text}
        </div>
      ))}
    </div>
  )
}

