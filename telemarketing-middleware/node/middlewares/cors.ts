const ALLOWED_HOSTS = [
  'http://localhost:8000',
  'https://lojavivara.vtex.app',
  'https://www.vivara.com.br',
]

export default async function cors(ctx: Context, next: () => Promise<any>) {
  const origin = ctx.get('Origin')

  if (ALLOWED_HOSTS.includes(origin)) {
    ctx.set('Access-Control-Allow-Origin', origin)
    ctx.set('Access-Control-Allow-Methods', 'GET, POST')
    ctx.set('Access-Control-Allow-Headers', 'Content-Type')
    ctx.set('Access-Control-Allow-Credentials', 'true')
    ctx.set('Access-Control-Max-Age', '600')
  }

  await next()

}
