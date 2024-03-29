import { randomUUID } from 'node:crypto'

export class Crypto {
  static getUUID() {
    return randomUUID()
  }

  static validateUUID(uuid: string) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      uuid,
    )
  }
}
