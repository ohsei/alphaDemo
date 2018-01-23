import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {pick, keys} from 'lodash'

import Segment from './Segment'

class Segments extends Component{
  constructor (props){
    super(props)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  static propTypes = {
    width: PropTypes.number,
    setting: PropTypes.object,
    title: PropTypes.string,
    curSegmentNo: PropTypes.number,
    note: PropTypes.arrayOf(PropTypes.object),
    tabNodeList: PropTypes.array,
    delSegment: PropTypes.func,
    setCurSegment: PropTypes.func,
    setCurComponent: PropTypes.func,
    isPrint: PropTypes.bool,
    isBold: PropTypes.bool,
    isItalic: PropTypes.bool,
    isUnderline: PropTypes.bool,
    updateNote: PropTypes.func.isRequired,
    updateIsBold: PropTypes.func.isRequired,
    updateIsItalic: PropTypes.func.isRequired,
    updateIsUnderline: PropTypes.func.isRequired,
    updateCurColor: PropTypes.func.isRequired,
    ...Segment.propTypes,
  }

  onKeyDown (event){
    const {tabNodeList} = this.props

    if (tabNodeList.length > 0 && event.keyCode == 9){
      const length =  tabNodeList[tabNodeList.length - 1].node.length

      const lastNodeId  = tabNodeList[tabNodeList.length - 1].node[length - 1].node
      const lastNode = document.getElementById(lastNodeId)

      if (event.target == lastNode){
        event.preventDefault()
        const nodeId = tabNodeList[0].node[0].node
        const node = document.getElementById(nodeId)
        node.focus()
      }
    }
  }

  render (){
    const {note} = this.props
    const segList = note.map((obj, i) => {
      return (
        <Segment
          key={i}
          id={i}
          ref={ref => this.segment = ref}
          {...pick(this.props, keys(Segment.propTypes))}
        />)
    })

    return (
      <div ref={ref => this.segments = ref} onKeyDown={this.onKeyDown}>{segList}</div>
    )
  }
}

export default Segments