import * as React from 'react';

import './styles.css';

interface Props {
  type: string;
  msg: string;
  clickHandler?: Function;
  classlist?: string;
  title?: string;
}

const Button: React.SFC<Props> = (props) => {
  const clickHandler = props.clickHandler ? props.clickHandler : () => {return null; };

  return (
    <button
      className={`btn ${props.type} ${props.classlist || ''}`}
      tabIndex={0}
      title={props.title}
      onClick={() => clickHandler()}
    >
      {props.msg}
    </button>
  );
};

export default Button;
