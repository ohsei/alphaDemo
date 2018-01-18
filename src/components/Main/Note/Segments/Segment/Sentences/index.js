import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import ContentEditable from '../common/ContentEditable'

import Sentence from './Sentence'

const DivSentences = styled.div`
  width: ${props => `${props.width}px`};
`
const DivJan = styled(ContentEditable)`
  border: 1px solid lightgray;
  width: 95%;
  font-size: ${props => props.fontSize}
`

class Sentences extends Component{
  constructor (props){
    super(props)
    this.getHeight = this.getHeight.bind(this)
    this.onDownChange = this.onDownChange.bind(this)
    this.onUpChange = this.onUpChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
  }
  static propTypes = {
    curSegmentNo: PropTypes.number,
    id: PropTypes.number,
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
    offForceChange: PropTypes.func.isRequired,
    ...Sentence.propTypes,
  }

  getHeight (){
    return this.divSentences.offsetHeight
  }

  onUpChange (){
    const {id, updateNote, note} = this.props

    let newNote = note.slice()
    newNote[id].jaHtml = this.upJaHtml.htmlEl.innerHTML

    updateNote(newNote)
  }

  onDownChange (){
    const {id, updateNote, note} = this.props

    let newNote = note.slice()
    newNote[id].jaHtml = this.downJaHtml.htmlEl.innerHTML

    updateNote(newNote)
  }

  onFocus (){
    const {id, setCurSegment, setCurComponent} = this.props
    setCurSegment(id)
    setCurComponent(this.sentence)
  }

  updateTabNode = (node) => {
    const {updateTabNodeList, tabNodeList} = this.props

    let newTabNodeList = tabNodeList.slice()
    newTabNodeList[node.id] = node
    updateTabNodeList(newTabNodeList)
  }

  componentDidUpdate (){
    const {id, tabNodeList} = this.props
    const upJaNode = () => { return (this.upJaHtml ? this.upJaHtml.htmlEl.id : null)}
    const enNode = this.sentence.inputText.htmlEl.id
    const downJaNode = () => {return (this.downJaHtml ? this.downJaHtml.htmlEl.id : null)}

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
    let tabNode = null

    if (tabNodeList) {
      while (tabNodeList[i].id != id){
        i++
      }
      tabNode = tabNodeList[i]
    }

    if (tabNode){
      const tabNodeJson = JSON.stringify(tabNode.node)
      const nodeJson = JSON.stringify(node)

      if (tabNodeJson !== nodeJson) {
        this.updateTabNode({id: id, node: node})
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
    const {id, setCurSegment, setCurComponent, tabNodeList} = this.props
    const enNode = this.sentence.inputText.htmlEl.id

    const upJaNode = () => {
      return (this.upJaHtml ? this.upJaHtml.htmlEl.id : null)
    }

    const downJaNode = () => {
      return (this.downJaHtml ? this.downJaHtml.htmlEl.id : null)
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

    let i = 0
    let tabNode = tabNodeList[i]

    while (tabNode && tabNodeList[i].id != id){
      i++
      tabNode = tabNodeList[i]
    }

    if (tabNode){
      this.updateTabNode({id: id, node: node})
    }
    else {
      this.addTabNode({id: id, node: node })
    }

    setCurSegment(id)
    setCurComponent(this.sentence)
  }

  delTabNode = (id) => {
    const {updateTabNodeList, tabNodeList} = this.props

    let newTabNodeList = tabNodeList.slice()
    let i = 0

    while (newTabNodeList[i].id != id){
      i++
    }
    newTabNodeList.splice(i, 1)
    updateTabNodeList(newTabNodeList)
  }

  componentWillUnmount (){
    const {id} = this.props
    this.delTabNode(id)
  }

  render (){
    const {note, id, setting, senWidth, offForceChange} = this.props

    const upJaSize = setting.upJaSize
    const downJaSize = setting.downJaSize


    return (
      <DivSentences
        onFocus={this.onFocus}
        onKeyDown={this.keyDown}
        innerRef={ref => this.divSentences = ref}
        width={senWidth}>
        {setting.upJaSize != 'オフ' && <DivJan id={`up${id}`} html={note[id].jaHtml} innerRef={ref => this.upJaHtml = ref} fontSize={upJaSize} spellCheck={false} disabled={false} onChange={this.onUpChange}
          forceChange={true}
          offForceChange={offForceChange} />}
        <Sentence
          ref={ref => this.sentence = ref}
          lineNum={setting.lineNum}
          {...pick(this.props, keys(Sentence.propTypes))}
        />
        {setting.downJaSize != 'オフ' && <DivJan id={`down${id}`} html={note[id].jaHtml} innerRef={ref => this.downJaHtml = ref} fontSize={downJaSize} spellCheck={false} disabled={false} onChange={this.onDownChange}
          forceChange={true}
          offForceChange={offForceChange} />}
      </DivSentences>
    )
  }
}

export default Sentences