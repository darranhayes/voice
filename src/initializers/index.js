import initDevTools from './devtools'
import reducers from './reducers';
import middleware from './middleware';

export default [
  reducers,
  middleware,
  initDevTools
];
