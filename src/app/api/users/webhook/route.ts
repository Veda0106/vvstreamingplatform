// // // src/app/api/users/webhook/route.ts
// // import { verifyWebhook } from '@clerk/nextjs/webhooks'
// // import type {
// //     WebhookEventType,
// //     UserJSON,
// //     SessionJSON,
// //     // …other JSON types you might handle
// //   } from "@clerk/nextjs/webhooks"
  
// // export async function POST(req: Request) {
// //   try {
// //     const evt = await verifyWebhook(req)

// //     // Do something with payload
// //     // For this guide, log payload to console
// //     const { id } = evt.data
// //     const eventType = evt.type
// //     console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
// //     console.log('Webhook payload:', evt.data)

// //     return new Response('Webhook received', { status: 200 })
// //   } catch (err) {
// //     console.error('Error verifying webhook:', err)
// //     return new Response('Error verifying webhook', { status: 400 })
// //   }
// // }

// // src/app/api/users/webhook/route.ts
// import { NextResponse } from "next/server"
// import { verifyWebhook, WebhookEventType } from "@clerk/nextjs/webhooks"
// import type { UserJSON, SessionJSON } from "@clerk/nextjs/webhooks"

// export async function POST(req: Request) {
//   try {
//     // Verify the incoming request’s signature & parse the body
//     const evt = await verifyWebhook(req)

//     console.log(`🔔 Webhook received: ${evt.type} (ID: ${evt.data.id})`)

//     // Type-safe handling for user.created
//     if (evt.type === WebhookEventType.UserCreated) {
//       const user = evt.data as UserJSON
//       console.log("👤 New user created:", {
//         id: user.id,
//         email: user.emailAddresses?.[0]?.emailAddress,
//         createdAt: user.createdAt,
//       })
//       // ...your user.created logic here...
//     }

//     // Type-safe handling for session.revoked
//     if (evt.type === WebhookEventType.SessionRevoked) {
//       const session = evt.data as SessionJSON
//       console.log("🚪 Session revoked:", {
//         id: session.id,
//         userId: session.userId,
//         revokedAt: session.revokedAt,
//       })
//       // ...your session.revoked logic here...
//     }

//     // Add more `if (evt.type === …)` blocks for other events

//     return NextResponse.json({ received: true })
//   } catch (err) {
//     console.error("❌ Webhook verification failed:", err)
//     return new Response("Invalid signature or payload", { status: 400 })
//   }
// }

// import { Webhook } from 'svix'
// import { headers } from 'next/headers'
// import { WebhookEvent } from '@clerk/nextjs/server'
// import { db } from '@/db'
// import { users } from '@/db/schema'
// import { eq } from 'drizzle-orm'

// export async function POST(req: Request) {
//   const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET

//   if (!SIGNING_SECRET) {
//     throw new Error('Error: Please add CLERK_SIGNING_SECRET from Clerk Dashboard to .env')
//   }

//   // Create new Svix instance with secret
//   const wh = new Webhook(SIGNING_SECRET)

//   // Get headers
//   const headerPayload = headers()
//   const svix_id = headerPayload.get('svix-id')
//   const svix_timestamp = headerPayload.get('svix-timestamp')
//   const svix_signature = headerPayload.get('svix-signature')

//   // If there are no headers, return an error
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response('Error: Missing Svix headers', { status: 400 })
//   }

//   // Get body
//   const payload = await req.json()
//   const body = JSON.stringify(payload)

//   let evt: WebhookEvent

//   // Verify payload with headers
//   try {
//     evt = wh.verify(body, {
//       'svix-id': svix_id,
//       'svix-timestamp': svix_timestamp,
//       'svix-signature': svix_signature,
//     }) as WebhookEvent
//   } catch (err) {
//     console.error('Error: Could not verify webhook:', err)
//     return new Response('Error: Verification error', { status: 400 })
//   }

//   const eventType = evt.type

//   // Handle different event types
//   if (eventType === 'user.created') {
//     const { data } = evt
//     await db.insert(users).values({
//       clerkId: data.id,
//       name: `${data.first_name} ${data.last_name}`,
//       imageUrl: data.image_url,
//     })
//   }

//   if (eventType === 'user.deleted') {
//     const { data } = evt

//     if (!data.id) {
//       return new Response('Error: Missing user ID', { status: 400 })
//     }

//     await db.delete(users).where(eq(users.clerkId, data.id))
//   }

//   if (eventType === 'user.updated') {
//     const { data } = evt
//     await db
//       .update(users)
//       .set({
//         name: `${data.first_name} ${data.last_name}`,
//         imageUrl: data.image_url,
//       })
//       .where(eq(users.clerkId, data.id))
//   }

//   return new Response('Webhook received', { status: 200 })
// }
// src/app/api/users/webhook/route.ts
import { Webhook } from 'svix'
import type { WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET
  if (!SIGNING_SECRET) {
    throw new Error('Please set CLERK_SIGNING_SECRET in your .env')
  }

  const wh = new Webhook(SIGNING_SECRET)

  // ——— Read Svix headers from the native Request ———
  const svix_id = req.headers.get('svix-id')
  const svix_timestamp = req.headers.get('svix-timestamp')
  const svix_signature = req.headers.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing Svix headers', { status: 400 })
  }

  // ——— Grab the raw body text ———
  const body = await req.text()

  let evt: WebhookEvent
  try {
    // verify throws if signature/timestamp mismatch
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('❌ Webhook verification failed:', err)
    return new Response('Invalid signature', { status: 400 })
  }

  // ——— Handle your events ———
  if (evt.type === 'user.created') {
    const { data } = evt
    await db.insert(users).values({
      clerkId: data.id,
      name: `${data.first_name} ${data.last_name}`,
      imageUrl: data.image_url,
    })
  }

  if (evt.type === 'user.updated') {
    const { data } = evt
    await db
      .update(users)
      .set({
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
      })
      .where(eq(users.clerkId, data.id))
  }

  if (evt.type === 'user.deleted') {
    const { data } = evt
    await db.delete(users).where(eq(users.clerkId, data.id))
  }

  return new Response('Webhook received', { status: 200 })
}