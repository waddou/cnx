import { createServer } from "http"
import { WebSocketServer } from "ws"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const server = createServer()
const wss = new WebSocketServer({ server })

wss.on("connection", async (ws) => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    ws.close()
    return
  }

  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message.toString())

      // Broadcast to all connected clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data))
        }
      })
    } catch (error) {
      console.error("WebSocket error:", error)
    }
  })
})

server.listen(process.env.WS_PORT || 3001)

export async function GET() {
  return NextResponse.json({ status: "WebSocket server running" })
}

