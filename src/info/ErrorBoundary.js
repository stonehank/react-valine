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

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error,errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <div onClick={this.reRender} style={{cursor:'pointer'}}>
        Something went wrong.Try Click to restore.
      </div>;
    }

    return this.props.children;
  }
}
