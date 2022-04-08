import { Session } from "@vtex/api"

export default class EnhancedSession extends Session {
  public async createSession() {
    return this.http.postRaw<any>('/api/sessions', {}, {
      headers: {
        ...this.options?.headers,
        'Cookie': `VtexIdclientAutCookie=${this.context.adminUserAuthToken};`
      },
      metric: 'create-session'
    })
  }
}
