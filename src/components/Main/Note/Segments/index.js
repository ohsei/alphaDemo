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
    isPrint: PropTypes.bool,
    isBold: PropTypes.bool,
    isItalic: PropTypes.bool,
    isUnderline: PropTypes.bool,
    updateNote: PropTypes.func.isRequired,
    updateIsBold: PropTypes.func.isRequired,
    updateIsItalic: PropTypes.func.isRequired,
    updateIsUnderline: PropTypes.func.isRequired,
    updateCurColor: PropTypes.func.isRequired,
    updatePages: PropTypes.func.isRequired,
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

 /* componentDidUpdate () {
    const {
      updateNote, updatePages,
      curSegmentNo, note, pages, curPageNo
    } = this.props

    let height = 0

    for (let i = 0; i < pages[curPageNo].length; i++ ) {
      height = height + note[pages[curPageNo][i]].segmentHeight
    }
    console.log(height)

    if (height > 1607) {
      if (curSegmentNo == 0 || note[curSegmentNo - 1].isPageBreak) {
        alert('改ページしてください！')
      }
      else {
       
        const length = pages[curPageNo].length
        const lastSegmentNo = pages[curPageNo][length - 1]

       
        let newPages = pages.slice()
        let newNote = note.slice()

        if (pages.length - curPageNo - 1 >= 0) {
          newPages.splice(curPageNo + 1, pages.length - curPageNo - 1)
        }
        newPages[curPageNo].splice(lastSegmentNo, 1)
        newPages.push([lastSegmentNo])
        newNote[lastSegmentNo - 1].isPageBreak = true
        newNote[lastSegmentNo].isPageBreak = false

        let pageHeight =  note[lastSegmentNo].segmentHeight
        let pageNum = curPageNo + 1
        let count = 1

        for (let i = lastSegmentNo + 1; i < note.length; i++) {
          pageHeight = pageHeight + note[i].segmentHeight

          if (pageHeight <= 1607) {
            newPages[pageNum].splice(count, 0, i)

            if (note[i].isPageBreak) {
              note[i].isPageBreak = false
            }
            count ++
          }
          else {
            pageHeight = note[i].segmentHeight
            pageNum++
            newPages.push([i])
            count = 1
            newNote[i - 1].isPageBreak = true
          }
        }
        updateNote(newNote)
        updatePages(newPages)
      }
    }
  }*/

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