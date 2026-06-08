import { initMongo, getDb } from '@/lib/mongodb'

export async function GET() {
  try {
    await initMongo()
    const db = await getDb()
    // ping the server to confirm connection
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // @ts-ignore
    await db.command({ ping: 1 })

    return new Response(JSON.stringify({ status: 'ok', mongo: 'connected' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Health check failed:', err)
    return new Response(JSON.stringify({ status: 'error', error: String(err) }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
