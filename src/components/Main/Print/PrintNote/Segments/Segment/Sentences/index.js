import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ContentEditable from 'react-contenteditable'
import {pick, keys} from 'lodash'

import Sentence from './Sentence'

const DivSentences = styled.div`
  width: ${props => `${props.width}px`};
`
const DivJan = styled(ContentEditable)`
  border: 1px solid white;
  width: 95%;
  font-size: ${props => props.fontSize}
`
const UlSen = styled.ul`
  margin: 0;
  padding: 0;
`
const UlJaSen = styled.ul`
  margin: 0;
  padding: 0;
`

class Sentences extends Component{
  constructor (props){
    super(props)
    this.getHeight = this.getHeight.bind(this)
  }
  static propTypes = {
    segmentId: PropTypes.number,
    senWidth: PropTypes.number,
    note: PropTypes.array,
    setting: PropTypes.object,
  }

  getHeight (){
    return this.divSentences.offsetHeight
  }

  render (){
    const {setting, note, segmentId} = this.props
    const upJaSize = setting.upJaSize
    const downJaSize = setting.downJaSize

    let listItems = note[segmentId].htmls.map((html, index) => {
      return (
        <Sentence
          key={index}
          sentenceId={html.id}
          ref={ref => this.sentence = ref}
          {...pick(this.props, keys(Sentence.propTypes))} />
      )
    })
    let listJaItems = note[segmentId].jaHtmls.map((jaHtml, index) => {
      return (
        <DivJan
          key={index}
          html={jaHtml.jaHtml}
          fontSize={upJaSize}
          spellCheck={false}
        />
      )
    })
    return (
      <DivSentences
        innerRef={ref => this.divSentences = ref}
        width={this.props.senWidth}>
        {setting.upJaSize != 'オフ' && <UlJaSen>{listJaItems}</UlJaSen>}
        <UlSen>{listItems}</UlSen>
        {setting.downJaSize != 'オフ' &&<UlJaSen>{listJaItems}</UlJaSen>}
      </DivSentences>
    )
  }
}

export default Sentences