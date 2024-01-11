import { randomUUID } from 'node:crypto'

export abstract class Entity<Props = any> {
  public readonly _id

  constructor(
    public readonly props: Props,
    id?: string,
  ) {
    this._id = id ?? randomUUID()
  }

  get id() {
    return this.id
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    }
  }
}
