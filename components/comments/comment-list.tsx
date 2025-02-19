"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useWebSocket } from "@/hooks/use-websocket"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

interface Comment {
  id: number
  content: string
  createdAt: string
  user: {
    username: string
    email: string
  }
}

interface CommentListProps {
  problemId: number
  initialComments: Comment[]
}

export function CommentList({ problemId, initialComments }: CommentListProps) {
  const { data: session } = useSession()
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const socket = useWebSocket({
    url: process.env.NEXT_PUBLIC_WS_URL!,
    onMessage: (event) => {
      const data = JSON.parse(event.data)
      if (data.type === "new_comment" && data.problemId === problemId) {
        setComments((prev) => [...prev, data.comment])
      }
    },
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!session || !newComment.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          problemId,
        }),
      })

      if (!response.ok) throw new Error("Failed to post comment")

      const comment = await response.json()
      socket?.send(
        JSON.stringify({
          type: "new_comment",
          problemId,
          comment,
        }),
      )

      setNewComment("")
    } catch (error) {
      console.error("Comment error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Commentaires</h2>

      {session && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="min-h-[100px]"
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Envoi..." : "Commenter"}
          </Button>
        </form>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={`https://avatar.vercel.sh/${comment.user.username}`} alt={comment.user.username} />
              <AvatarFallback>{comment.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{comment.user.username}</span>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </span>
              </div>
              <p className="mt-1 text-sm">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

