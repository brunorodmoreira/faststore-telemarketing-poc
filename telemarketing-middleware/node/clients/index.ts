import { IOClients } from '@vtex/api'
import EnhancedSession from './session'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get enhancedSession() {
    return this.getOrSet('enhancedSession', EnhancedSession)
  }
}
