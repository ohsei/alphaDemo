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
    updateNote: PropTypes.func.isRequired,
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
          type={note[i].type}
          oldType={note[i].oldType}
          html={note[i].html}
          enHeight={note[i].enHeight}
          jaHtml={note[i].jaHtml}
          jaHeight={note[i].jaHeight}
          dataUrl={note[i].dataUrl}
          imgWidth={note[i].imgWidth}
          imgHeight={note[i].imgHeight}
          posX={note[i].posX}
          posY={note[i].posY}
          noteLength={note.length}
          segmentHeight={note[i].segmentHeight}
          isPageBreak={note[i].isPageBreak}
          isUserPageBreak={note[i].isUserPageBreak}
          isImgLoading={note[i].isImgLoading}
          {...pick(this.props, keys(Segment.propTypes))}
        />)
    })

    return (
      <div ref={ref => this.segments = ref}>{segList}</div>
    )
  }
}

export default Segments