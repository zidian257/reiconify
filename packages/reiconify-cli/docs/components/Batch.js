import React from 'react'

class Batch extends React.Component {
  // isUnmounting = false
  constructor(props) {
    super(props)
    this.state = {
      frameCount: 1,
    }
    this.nextFrame = this.nextFrame.bind(this)
  }

  componentDidMount() {
    this.nextFrame()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items.length !== this.props.items.length) {
      this.setState({frameCount: 1}, this.nextFrame)
    }
  }

  componentWillUnmount() {
    this.isUnmounting = true
  }

  nextFrame() {
    const {frameCount} = this.state
    const {items, perFrame} = this.props
    if (frameCount * perFrame >= items.length) {
      return
    }

    requestAnimationFrame(() => {
      if (!this.isUnmounting) {
        this.setState({frameCount: frameCount + 1}, this.nextFrame)
      }
    })
  }

  render() {
    const {frameCount} = this.state
    const {items, perFrame} = this.props
    return items.slice(0, frameCount * perFrame)
  }
}

Batch.defaultProps = {
  perFrame: 100,
}

export default Batch
