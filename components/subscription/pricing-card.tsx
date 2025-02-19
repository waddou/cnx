"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createCheckoutSession } from "@/lib/stripe-actions"

interface PricingCardProps {
  name: string
  description: string
  price: number
  features: string[]
  priceId: string
}

export function PricingCard({ name, description, price, features, priceId }: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubscribe() {
    try {
      setIsLoading(true)
      const { url } = await createCheckoutSession(priceId)
      if (url) window.location.href = url
    } catch (error) {
      console.error("Subscription error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid flex-1 gap-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{price}€</span>
          <span className="text-muted-foreground">/mois</span>
        </div>
        <ul className="grid gap-2 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubscribe} disabled={isLoading} className="w-full">
          {isLoading ? "Chargement..." : "S'abonner"}
        </Button>
      </CardFooter>
    </Card>
  )
}

