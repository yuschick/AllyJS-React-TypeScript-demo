import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Disabled from 'ally.js/maintain/disabled';
import TabFocus from 'ally.js/maintain/tab-focus';
import Key from 'ally.js/when/key';
import FirstTab from 'ally.js/query/first-tabbable';

import './styles.css';

interface Props {
  children: object;
  title: string;
  description: string;
  close(): void;
}

interface Handle {
  disengage(): void;
}

class Dialog extends React.Component<Props, {}> {
  dialog: HTMLElement | null;
  disabledHandle: Handle;
  focusHandle: Handle;
  keyHandle: Handle;
  focusedElementBeforeDialogOpened: HTMLInputElement | HTMLButtonElement;
  container: HTMLElement = document.createElement('div');
  target: HTMLElement = document.getElementById('root')!;

  componentDidMount() {
    if (document.activeElement instanceof HTMLInputElement ||
      document.activeElement instanceof HTMLButtonElement) {
      this.focusedElementBeforeDialogOpened = document.activeElement;
    }

    this.disabledHandle = Disabled({
      filter: this.dialog,
    });

    this.focusHandle = TabFocus({
      context: this.dialog,
    });

    this.keyHandle = Key({
      escape: () => { this.props.close(); },
    });

    let element = FirstTab({
      context: this.dialog,
      defaultToContext: true,
    });
    element.focus();

    this.target.appendChild(this.container);
  }

  componentWillUnmount() {
    this.disabledHandle.disengage();
    this.focusHandle.disengage();
    this.keyHandle.disengage();
    this.focusedElementBeforeDialogOpened.focus();
    this.target.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(
      <div
        role="dialog"
        tabIndex={0}
        className={`popup-outer-container`}
        aria-hidden={false}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        ref={(popup) => {
          this.dialog = popup;
          }
        }
      >
        <h5
          id="dialog-title"
          className="is-visually-hidden"
        >
          {this.props.title}
        </h5>
        <p
          id="dialog-description"
          className="is-visually-hidden"
        >
          {this.props.description}
        </p>
        <div className="popup-inner-container">
          <button
            className="close-icon"
            tabIndex={0}
            type="button"
            aria-label="Close Dialog"
            onClick={() => {
              this.props.close();
            }}
          >
            ×
          </button>
          {this.props.children}
        </div>
      </div>,
      this.container
    );
  }
}

export default Dialog;
