import React from 'react';
import ReactDOM from 'react-dom';

interface PortalProps { 
  id: string;
  constitution: any;
}

class Portal extends React.Component<PortalProps> {
  private readonly provision: any;
  private readonly el: HTMLElement;
  private readonly constitution: Document;

  constructor(props: any) {
    super(props);
    this.el = document.createElement('div');
    this.constitution = this.props.constitution;
    this.provision = this.constitution.getElementById(this.props.id);
  }

  componentDidMount() {
    const heading = this.provision.firstChild;
    heading.parentNode.insertBefore(this.el, heading.nextSibling);
  }

  componentWillUnmount() {
    this.provision.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

export default Portal;
