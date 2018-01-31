import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {pick, keys} from 'lodash'

import Segment from './Segment'

class Segments extends Component{
  static propTypes = {
    width: PropTypes.number,
    setting: PropTypes.object,
    title: PropTypes.string,
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
          type={obj.type}
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