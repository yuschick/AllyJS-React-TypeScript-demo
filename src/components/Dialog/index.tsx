import * as React from 'react';

import Disabled from 'ally.js/esm/maintain/disabled';
import TabFocus from 'ally.js/esm/maintain/tab-focus';
import Key from 'ally.js/esm/when/key';
import FirstTab from 'ally.js/esm/query/first-tabbable';

import './styles.css';

interface Props {
  children: object;
  title: string;
  description: string;
  close: Function;
}

class Dialog extends React.Component<Props> {
  // tslint:disable-next-line:no-any
  dialog: any = null;
  // tslint:disable-next-line:no-any
  disabledHandle: any = null;
  // tslint:disable-next-line:no-any
  focusHandle: any = null;
  // tslint:disable-next-line:no-any
  keyHandle: any = null;
  // tslint:disable-next-line:no-any
  focusedElementBeforeDialogOpened: any = null;

  componentDidMount() {
    this.focusedElementBeforeDialogOpened = document.activeElement;
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
  }
  
  componentWillUnmount() {
    this.disabledHandle.disengage();
    this.focusHandle.disengage();
    this.keyHandle.disengage();
    this.focusedElementBeforeDialogOpened.focus();
  }

  render() {
    return (
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
            title="Close Dialog"
            onClick={() => {
              this.props.close();
            }}
          >
            ×
          </button>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Dialog;
