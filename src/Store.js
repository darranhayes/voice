import { createStore, combineReducers } from 'redux'
import { buildStack } from 'redux-stack'
import stack from './initializers'

const initialState = {}
const { reducers, enhancer } = buildStack(stack)
const store = createStore(combineReducers(reducers), initialState, enhancer)

export default store
