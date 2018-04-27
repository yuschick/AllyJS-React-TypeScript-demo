import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './containers/App/';

import './styles/variables.css';
import './styles/modifiers.css';
import './styles/reset.css';
import './styles/headlines.css';
import './styles/root.css';
import './styles/flex.css';
import './styles/forms.css';
import './styles/inputs.css';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();