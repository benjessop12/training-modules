import type { Either } from 'prelude-ts'

export type Result<T, E = Error> = Either<E, T>
