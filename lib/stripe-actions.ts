"use server"

import { headers } from "next/headers"
import { getServerSession } from "next-auth"
import Stripe from "stripe"
import { db } from "@/lib/data"
import { authOptions } from "@/lib/auth"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function createCheckoutSession(priceId: string) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      throw new Error("User not authenticated")
    }

    const user = db.findUserByEmail(session.user.email)
    if (!user) {
      throw new Error("User not found")
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: session.user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${headers().get("origin")}/account?success=true`,
      cancel_url: `${headers().get("origin")}/account?canceled=true`,
      metadata: {
        userId: user.id,
      },
    })

    if (!checkoutSession.url) {
      throw new Error("Failed to create checkout session")
    }

    return { url: checkoutSession.url }
  } catch (error) {
    console.error("Stripe error:", error)
    throw error
  }
}

export async function createBillingPortalSession() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      throw new Error("User not authenticated")
    }

    // Find active subscription in our database
    const user = db.findUserByEmail(session.user.email)
    if (!user) {
      throw new Error("User not found")
    }

    // In a real application, you would look up the Stripe customer ID
    // For now, we'll throw an error since we don't have Stripe integration fully set up
    throw new Error("Stripe integration not fully configured")

    // This is how it would work with Stripe properly configured:
    /*
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${headers().get("origin")}/account`,
    })

    redirect(portalSession.url)
    */
  } catch (error) {
    console.error("Billing portal error:", error)
    throw error
  }
}

