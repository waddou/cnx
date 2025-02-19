import { useEffect, useRef, useState } from "react"

interface WebSocketHookProps {
  url: string
  onMessage?: (event: MessageEvent) => void
  onOpen?: (event: Event) => void
  onClose?: (event: CloseEvent) => void
  onError?: (event: Event) => void
}

export function useWebSocket({ url, onMessage, onOpen, onClose, onError }: WebSocketHookProps) {
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket(url)

    ws.onopen = (event) => {
      setIsConnected(true)
      onOpen?.(event)
    }

    ws.onmessage = (event) => {
      onMessage?.(event)
    }

    ws.onclose = (event) => {
      setIsConnected(false)
      onClose?.(event)
    }

    ws.onerror = (event) => {
      onError?.(event)
    }

    wsRef.current = ws

    return () => {
      ws.close()
    }
  }, [url, onMessage, onOpen, onClose, onError])

  return wsRef.current
}

