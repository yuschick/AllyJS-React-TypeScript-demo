import * as React from 'react';

import Button from './../../components/Button';
import Dialog from './../../components/Dialog';

import './styles.css';

interface AppState {
  showDialog: boolean;
}

class App extends React.Component<{}, AppState> {
  state: AppState;

  constructor(props: {}) {
    super(props);

    this.state = {
      showDialog: false
    };
  }

  toggleDialog() {
    this.setState({ showDialog: !this.state.showDialog });
  }

  checkForDialog() {
    if (this.state.showDialog) {
      return this.getDialog();
    } else {
      return false;
    }
  }

  getDialog() {
    return (
      <Dialog
        title="Favourite Holiday Dialog"
        description="Add your favourite holiday to the list"
        close={() => { this.toggleDialog(); }}
      >
        <form className="dialog-content">
          <header>
            <h1 id="dialog-title">Holiday Entry</h1>
            <p id="dialog-description">Please enter your favourite holiday.</p>
          </header>
          <section>
            <div className="field-container">
              <label htmlFor="within-dialog">Favourite Holiday</label>
              <input id="within-dialog" />
            </div>
          </section>
          <footer>
            <div className="btns-container">
              <Button
                type="secondary"
                clickHandler={() => { this.toggleDialog(); }}
                msg="Close"
              />
              <Button
                type="primary"
                clickHandler={() => { this.toggleDialog(); }}
                msg="Save"
              />
            </div>
          </footer>
        </form>
      </Dialog>
    );
  }

  render() {
    return (
      <div className="site-container">
        {this.checkForDialog()}
        <header>
          <h1>Ally.js with React &amp; Typescript</h1>
        </header>
        <main className="content-container">
          <div className="field-container">
            <label htmlFor="name-field">Name:</label>
            <input type="text" id="name-field" placeholder="Enter your name" />
          </div>
          <div className="field-container">
            <label htmlFor="food-field">Favourite Food:</label>
            <input type="text" id="food-field" placeholder="Enter your favourite food" />
          </div>
          <div className="field-container">
            <Button
              type="primary"
              msg="Show Dialog"
              clickHandler={() => { this.toggleDialog(); }}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
