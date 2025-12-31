import { NextRequest, NextResponse } from 'next/server'

// 简单的内存存储（生产环境建议使用数据库）
let danmakuStorage: Array<{
  id: number
  text: string
  top: number
  color: string
  speed: number
  timestamp: number
}> = []

// 限制最多保存 1000 条弹幕
const MAX_DANMAKU = 1000

export async function GET() {
  try {
    // 返回所有弹幕
    return NextResponse.json({ success: true, data: danmakuStorage })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch danmaku' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, top, color, speed } = body

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid text' },
        { status: 400 }
      )
    }

    const newDanmaku = {
      id: Date.now() + Math.random(),
      text: text.trim(),
      top: top || Math.random() * 80 + 10,
      color: color || '#ffffff',
      speed: speed || 8 + Math.random() * 4,
      timestamp: Date.now()
    }

    // 添加到存储
    danmakuStorage.push(newDanmaku)

    // 如果超过最大数量，删除最旧的
    if (danmakuStorage.length > MAX_DANMAKU) {
      danmakuStorage = danmakuStorage.slice(-MAX_DANMAKU)
    }

    return NextResponse.json({ success: true, data: newDanmaku })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save danmaku' },
      { status: 500 }
    )
  }
}

