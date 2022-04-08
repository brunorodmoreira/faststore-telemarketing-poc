import { AuthenticationError } from "@vtex/api"

export default async function authTokenValidate(ctx: Context, next: () => Promise<any>) {
  const { vtex: { adminUserAuthToken } } = ctx

  if (!adminUserAuthToken) {
    throw new AuthenticationError('You need to be authenticated in admin to use this endpoint.')
  }

  await next()
}
