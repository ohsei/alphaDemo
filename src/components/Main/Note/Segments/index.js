import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {pick, keys} from 'lodash'

import Segment from './Segment'

class Segments extends Component{
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
      <div ref={ref => this.segments = ref}>{segList}</div>
    )
  }
}

export default Segments