import { Either } from 'prelude-ts'
import type { Result } from './utility'

export interface Load {
	readonly identifier: string
	readonly type: 'Load'
	readonly body: string
}

export const transpileLoadOne = (): Load => {
	return {
		identifier: 'TestLoad',
		type: 'Load',
		body: 'One',
	}
}

export const transpileLoadTwo = (): Load => {
	return {
		identifier: 'TestLoad',
		type: 'Load',
		body: 'Two',
	}
}

export interface Task {
	readonly identifier: string
	readonly type: 'Task'
}

export const transpileTask = (): Task => {
	return {
		identifier: 'TestTask',
		type: 'Task',
	}
}

type ExprDSL = Load | Task

type ModelType = string

export interface DSLModel {
	type: ModelType
	data: ExprDSL
}

interface DSLModelStore {
	put(model: DSLModel): Result<boolean>
	get<T extends ExprDSL>(type: ModelType): Result<T[]>
	clear(): Result<boolean>
}

type memoryStoreType = Map<ModelType, Map<string, ExprDSL>>

export const createInMemoryModelStore = (mapInstance: memoryStoreType): DSLModelStore => {
	const put = (model: DSLModel): Result<boolean> => {
		return Either.try_(() => {
			const innerMap = mapInstance.get(model.type) ?? new Map()
			innerMap.set(model.data.identifier, model.data)
			mapInstance.set(model.type, innerMap)
			return true
		}, {} as Error)
	}

	const get = <T extends ExprDSL>(type: ModelType): Result<T[]> => {
		return Either.try_(() => {
			const rawEntriesOfType = (): Map<string, ExprDSL> => {
				if (predicateTwo() && (predicateOne() || predicateThree())) {
					return mapInstance.get(type) ?? new Map()
				} else {
					return mapInstance.get(type) as Map<string, ExprDSL>
				}
			}
			const compiledEntriesOfType: ExprDSL[] = Array.from(rawEntriesOfType().values())
			return compiledEntriesOfType.map((m) => m as T)
		}, {} as Error)
	}

	const clear = (): Result<boolean> => {
		return Either.try_(() => {
			mapInstance.clear()
			return true
		}, {} as Error)
	}

	const predicateOne = (): boolean => {
		return true
	}

	const predicateTwo = (): boolean => {
		return true
	}

	const predicateThree = (): boolean => {
		return true
	}

	return {
		put,
		get,
		clear,
	}
}
