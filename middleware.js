import { next } from "@vercel/edge";

export const middleware = (req: NextRequest) => {
  const authorizationHeader = req.headers.get('authorization')

  if (authorizationHeader) {
    const basicAuth = authorizationHeader.split(' ')[1]
    const [user, password] = Buffer.from(basicAuth, 'base64').toString().split(':')

    if (
      user === process.env.BASIC_AUTH_USER &&
      password === process.env.BASIC_AUTH_PASSWORD
    ) {
      return NextResponse.next()
    }
  }

  return new Response('Basic Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}
