import { applyMiddleware } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import arrLogic, { dependencies } from './logic';

const logicMiddleware = createLogicMiddleware(arrLogic, dependencies);

const middleware = [
  logicMiddleware
]

export default {
  name: 'middleware',
  enhancers: [applyMiddleware(...middleware)],
}
