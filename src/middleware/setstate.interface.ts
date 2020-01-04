import * as express from 'express'

export interface Request<S = {}, T = {}, U = {}> extends Omit<express.Request, 'headers'> {
  readonly state: S
  readonly body: T
  readonly headers: U
  setState: (newState: Partial<S>) => void
}




