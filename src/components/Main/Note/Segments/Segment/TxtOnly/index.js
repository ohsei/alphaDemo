import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {pick, keys} from 'lodash'

import LabNum from '../common/LabNum'
import Sentences from '../Sentences'

const SentenceArea = styled.div`
  display: flex;
  width: ${props => `${props.width}px`};
`

class TxtOnly extends Component{
  constructor (props){
    super(props)
    this.setBold = this.setBold.bind(this)
    this.setColor = this.setColor.bind(this)
    this.setItalic = this.setItalic.bind(this)
    this.setUnderline =  this.setUnderline.bind(this)
  }
  static propTypes = {
    id: PropTypes.number,
    width: PropTypes.number,
    note: PropTypes.array,
    setting: PropTypes.object,
    ...Sentences.propTypes,
  }

  setBold (){
    this.sentences.setBold()
  }
  setColor (color){
    this.sentences.setColor(color)
  }
  setItalic (){
    this.sentences.setItalic()
  }
  setUnderline (){
    this.sentences.setUnderline()
  }

  render (){
    const {id, width, setting} = this.props
    return (
      <SentenceArea
        innerRef={ref => this.sentencearea = ref}
        width={width}
        onKeyDown={this.onKeyDown} >
        <LabNum lineNoType={setting.lineNos} id={id} />
        <Sentences
          ref={ref => this.sentences = ref}
          senWidth={width - 50}
          {...pick(this.props, keys(Sentences.propTypes))} />
      </SentenceArea>
    )
  }
}

export default TxtOnly
