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
    updateTabNodeList: PropTypes.func.isRequired,
    pageId: PropTypes.func.isRequired,
    ...Segment.propTypes,
  }

  onKeyDown (event){
    const {tabNodeList} = this.props

    if (tabNodeList.length > 0 && event.keyCode == 9){
      const length =  tabNodeList[tabNodeList.length - 1].node.length

      if (event.target == tabNodeList[tabNodeList.length - 1].node[length - 1].node){
        event.preventDefault()
        tabNodeList[0].node[0].node.focus()
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.segments.offsetHeight >= 1607) {

    }
  }

  render (){
    const {note, pageId} = this.props
    const segList = note[pageId].map((obj, i) => {
      return (
        <Segment
          key={i}
          segmentId={i}
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