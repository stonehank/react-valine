import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.reRender=this.reRender.bind(this)
    this.state = { hasError: false };
  }

  reRender(){
    this.setState({
      hasError:false
    })
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error boundary',error,errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <div onClick={this.reRender} style={{cursor:'pointer',background:'var(--foreground-color)'}}>
        Something went wrong.Try Click to restore.
      </div>;
    }

    return this.props.children;
  }
}
