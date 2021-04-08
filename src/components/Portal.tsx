import React from 'react';
import ReactDOM from 'react-dom';

interface PortalProps { 
  element: HTMLElement;
}

class Portal extends React.Component<PortalProps> {
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.props.element,
    );
  }
}

export default Portal;
