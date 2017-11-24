import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ContentEditable from '../common/ContentEditable'
import {pick, keys} from 'lodash'

import JaSentence from './JaSentence'
import Sentence from './Sentence'

const DivSentences = styled.div`
  width: ${props => `${props.width}px`};
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
    this.onFocus = this.onFocus.bind(this)
  }
  static propTypes = {
    curSegmentNo: PropTypes.number,
    segmentId: PropTypes.number,
    senWidth: PropTypes.number,
    note: PropTypes.array,
    setting: PropTypes.object,
    isPrint: PropTypes.bool,
    updateNote: PropTypes.func,
    tabNodeList: PropTypes.array,
    updateTabNodeList: PropTypes.func.isRequired,
    setCurSegment: PropTypes.func,
    setCurComponent: PropTypes.func,
    isBold: PropTypes.bool,
    isItalic: PropTypes.bool,
    isUnderline: PropTypes.bool,
    updateIsBold: PropTypes.func.isRequired,
    updateIsItalic: PropTypes.func.isRequired,
    updateIsUnderline: PropTypes.func.isRequired,
    updateCurColor: PropTypes.func.isRequired,
    ...Sentence.propTypes,
    ...JaSentence.propTypes,
  }

  getHeight (){
    return this.divSentences.offsetHeight
  }

  onFocus (){
    const {segmentId, setCurSegment, setCurComponent} = this.props
    setCurSegment(segmentId)
    setCurComponent(this.sentence)
  }

  updateTabNode = (node) => {
    const {updateTabNodeList, tabNodeList} = this.props

    let newTabNodeList = tabNodeList.slice()
    newTabNodeList[node.id] = node
    updateTabNodeList(newTabNodeList)
  }

  componentDidUpdate (){
    const {segmentId, tabNodeList} = this.props
    const upJaNode = () => { return (this.upJaHtml ? this.upJaHtml.htmlEl : null)}
    const enNode = this.sentence.inputText.htmlEl
    const downJaNode = () => {return (this.downJaHtml ? this.downJaHtml.htmlEl : null)}

    let node = []

    if (upJaNode()){
      node = [{label: 'up', node: upJaNode()}, {label: 'en', node: enNode}]
    }
    else if (downJaNode()){
      node = [{label: 'en', node: enNode}, {label: 'down', node: downJaNode()}]
    }
    else {
      node = [{label: 'en', node: enNode}]
    }

    let i = 0
    let tabNode = tabNodeList[i]

    while (tabNodeList[i].id != segmentId){
      i++
    }

    if (tabNode){
      if (tabNode.node.length != node.length){
        this.updateTabNode({id: segmentId, node: node})
      }
      else {
        for (let i = 0;i < node.length;i++){
          if (tabNode.node[i].label != node[i].label){
            this.updateTabNode({id: segmentId, node: node})
            return
          }
        }
      }
    }
  }

  addTabNode = (node) => {
    const {updateTabNodeList, tabNodeList} = this.props

    let newTabNodeList = tabNodeList.slice()
    newTabNodeList.splice(node.id, 0, node)
    updateTabNodeList(newTabNodeList)
  }

  componentDidMount (){
    const {segmentId, setCurSegment, setCurComponent} = this.props
    const enNode = this.sentence.inputText.htmlEl

    const upJaNode = () => {
      return (this.upJaHtml ? this.upJaHtml.htmlEl : null)
    }

    const downJaNode = () => {
      return (this.downJaHtml ? this.downJaHtml.htmlEl : null)
    }

    let node = []

    if (upJaNode()){
      node = [{label: 'up', node: upJaNode()}, {label: 'en', node: enNode}]
    }
    else if (downJaNode()){
      node = [{label: 'en', node: enNode}, {label: 'down', node: downJaNode()}]
    }
    else {
      node = [{label: 'en', node: enNode}]
    }

    this.addTabNode({id: segmentId, node: node })
    setCurSegment(segmentId)
    setCurComponent(this.sentence)
  }

  delTabNode = (segmentId) => {
    const {updateTabNodeList, tabNodeList} = this.props

    let newTabNodeList = tabNodeList.slice()
    let i = 0

    while (newTabNodeList[i].id != segmentId){
      i++
    }
    newTabNodeList.splice(i, 1)
    updateTabNodeList(newTabNodeList)
  }

  componentWillUnmount (){
    const {segmentId} = this.props
    this.delTabNode(segmentId)
  }

  render (){
    const {note, segmentId, setting} = this.props
    const upJaSize = setting.upJaSize
    const downJaSize = setting.downJaSize

    let listItems = note[segmentId].htmls.map((html, index) => {
      return (
        <Sentence
          key={index}
          sentenceId={html.id}
          ref={ref => this.sentence = ref}
          isPageBreak={html.isPageBreak}
          {...pick(this.props, keys(Sentence.propTypes))} />
      )
    })
    let listUpJaItems = note[segmentId].jaHtmls.map((jaHtml, index) => {
      if (setting.upJaSize != 'オフ') {
        return (
          <JaSentence
            key={index}
            jaSentenceId={jaHtml.id}
            html={jaHtml.html}
            jaSize={upJaSize}
            spellCheck={false}
            {...pick(this.props, keys(JaSentence.propTypes))}
          />
        )
      }
    })
    let listDownJaItems = note[segmentId].jaHtmls.map((jaHtml, index) => {
      if (setting.downJaSize != 'オフ') {
        return (
          <JaSentence
            key={index}
            jaSentenceId={jaHtml.id}
            html={jaHtml.html}
            jaSize={downJaSize}
            spellCheck={false}
            {...pick(this.props, keys(JaSentence.propTypes))}
          />
        )
      }
    })

    return (
      <DivSentences
        onFocus={this.onFocus}
        onKeyDown={this.keyDown}
        innerRef={ref => this.divSentences = ref}
        width={this.props.senWidth}>
        {setting.upJaSize != 'オフ' && <UlJaSen innerRef={ref => this.upJaHtml = ref}>{listUpJaItems}</UlJaSen>}
        <UlSen>{listItems}</UlSen>
        {setting.downJaSize != 'オフ' && <UlJaSen innerRef={ref => this.downJaHtml = ref}>{listDownJaItems}</UlJaSen>}
      </DivSentences>
    )
  }
}

export default Sentences