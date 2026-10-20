import { useCallback, useState, type CSSProperties, type MouseEvent } from 'react'

export function useSpotlight<T extends HTMLElement>() {
  const [spot, setSpot] = useState({ x: 50, y: 50, active: false })

  const onMove = useCallback((e: MouseEvent<T>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setSpot({ x, y, active: true })
  }, [])

  const onLeave = useCallback(() => {
    setSpot((s) => ({ ...s, active: false }))
  }, [])

  const spotlightStyle: CSSProperties = {
    background: spot.active
      ? `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, rgb(184 121 112 / 0.14), transparent 55%)`
      : undefined,
  }

  return { onMove, onLeave, spotlightStyle, spotActive: spot.active }
}
