import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import Perf from 'react-addons-perf';

if (process.env.NODE_ENV === "development") {
  window.Perf = Perf;
}

const devtools = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
  });

export default {
  composers: [devtools]
}
