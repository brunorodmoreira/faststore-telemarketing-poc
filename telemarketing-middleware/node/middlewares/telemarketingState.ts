// import cookie from 'cookie'
import { IMPERSONATED_EMAIL_KEY } from "../utils/constants"


export default async function telemarketingState(ctx: Context, next: () => Promise<any>) {
  const { clients: { session: sessionClient, enhancedSession: enhancedSessionClient } } = ctx

  const { sessionToken, setCookies = [] } = await new Promise<{ sessionToken: string, setCookies?: string[] }>(async (resolve, reject) => {
    if (ctx.query.sessionToken || ctx.vtex.sessionToken) {
      resolve({
        sessionToken: ctx.query.sessionToken ?? ctx.vtex.sessionToken,
      })
    }

    const { data: { sessionToken }, headers } = await enhancedSessionClient.createSession()

    if (!sessionToken) {
      reject(new Error('Could not create session.'))
    }

    resolve({
      sessionToken,
      setCookies: headers['set-cookie'] as unknown as string[],
    })
  })

  const session = await sessionClient.getSession(sessionToken, [
    'impersonate.canImpersonate',
    'authentication.adminUserEmail',
    'public.vtex-impersonated-customer-email',
  ])

  const canImpersonate = Boolean(session.sessionData.namespaces.impersonate?.canImpersonate)
  const userEmail = session.sessionData.namespaces.authentication?.adminUserEmail?.value ?? null
  const customerEmail = session.sessionData.namespaces.public[IMPERSONATED_EMAIL_KEY]?.value ?? null

  ctx.body = {
    canImpersonate,
    customerEmail,
    userEmail,
    sessionToken,
  }

  ctx.response.set('Set-Cookie', setCookies.map((cookie) => `${cookie}; samesite=none`))
  ctx.response.set('Cache-Control', 'no-cache, no-store, must-revalidate')

  await next()
}
