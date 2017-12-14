import React, { Component } from 'react'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import Segments from './Segments'

const Wrapper = styled.div`
  z-index: 0;
  margin: 150px 0 0 50px;
  width: ${props => `${props.width}px`};

  @media print{
    margin: 0;
    padding: 0;
  }
`

class Note extends Component {
  static propTypes = {
    ...Segments.propTypes
  }
  render () {
    const {note} = this.props
    const pageList = note.map((page, index) => {
      return (
        <Segments key={index} pageId={index} {...pick(this.props, keys(Segments.propTypes))} />
      )
    })
    return (
      <Wrapper>
        {pageList}
      </Wrapper>
    )
  }
}

export default Note