import React from 'react'
import PropTypes from 'prop-types'

export default class ContentEditable extends React.Component {

  constructor (props) {
    super(props)
    this.emitChange = this.emitChange.bind(this)

  }
  static propTypes = {
    forceChange: PropTypes.bool,
    html: PropTypes.string,
    offForceChange: PropTypes.func,
    onChange: PropTypes.func,
  }

  render () {
    const {html, ...props} = this.props

    return (
      <div {...props}
        contentEditable={true}
        ref={(e) => this.htmlEl = e}
        onInput={this.emitChange}
        onBlur={this.props.onBlur || this.emitChange}
        dangerouslySetInnerHTML={{__html: html}}
      >
        {this.props.children}
      </div>
    )
  }


  shouldComponentUpdate (nextProps) {

    const { props, htmlEl } = this

    // We need not rerender if the change of props simply reflects the user's edits.

    // Rerendering in this case would make the cursor/caret jump

    // Rerender if there is no element yet... (somehow?)

    if (!htmlEl) {
      return true

    }
    // ...or if html really changed... (programmatically, not by user edit)

    if (nextProps.forceChange) {
      props.offForceChange()
    }
    if ((nextProps.html !== this.htmlEl.innerHTML && nextProps.forceChange) && nextProps.html !== props.html) {
      
      props.offForceChange()
      return true
    }


    let optional = ['style', 'className', 'disable', 'tagName']


    // Handle additional properties

    return optional.some(name => props[name] !== nextProps[name])

  }


  componentDidUpdate () {

    if ( this.htmlEl && this.props.html !== this.htmlEl.innerHTML ) {

      // Perhaps React (whose VDOM gets outdated because we often prevent

      // rerendering) did not update the DOM. So we update it manually now.

      this.htmlEl.innerHTML = this.props.html

    }

  }


  emitChange (evt) {
    if (!this.htmlEl) return

    var html = this.htmlEl.innerHTML

    if (this.props.onChange && html !== this.lastHtml) {

      evt.target = { value: html }

      this.props.onChange(evt)

    }

    this.lastHtml = html

  }

}
