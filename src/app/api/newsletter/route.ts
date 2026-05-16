export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return Response.json({ error: 'Valid email is required' }, { status: 400 })
    }

    // In a real application, you would integrate with an email service
    // For now, just return success
    return Response.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to subscribe'
    return Response.json({ error: message }, { status: 500 })
  }
}
