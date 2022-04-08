import { UserInputError } from "@vtex/api"
import { json } from "co-body"
import { IMPERSONATED_EMAIL_KEY } from "../utils/constants"

import cookie from 'cookie'

type BodyRequest = {
  customerEmail?: string
  sessionToken?: string
}

export default async function impersonate(ctx: Context, next: () => Promise<any>) {
  const { clients: { session: sessionClient } } = ctx

  const { customerEmail, sessionToken } = (await json(ctx.req)) as BodyRequest

  if (!customerEmail) {
    throw new UserInputError('Missing customerEmail.')
  }

  if (!sessionToken) {
    throw new UserInputError('Missing sessionToken.')
  }

  await sessionClient.updateSession(IMPERSONATED_EMAIL_KEY, customerEmail, [], sessionToken)

  ctx.response.set('Set-Cookie', cookie.serialize(IMPERSONATED_EMAIL_KEY, customerEmail, {
    maxAge: 60 * 60 * 24,
    path: '/',
  }))

  ctx.vtex.sessionToken = sessionToken

  await next()



}
