import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import LabNum from '../common/LabNum'
import Canvas from '../common/Canvas'

const SentenceArea = styled.div`
  display: flex;
  width: 100%;
`
const DivCanvas = styled.div`
  width: 100%;
  display: flex;
  direction: row;
  justify-content: space-around;
  margin: 0px auto;
`

class ImgOnly extends Component{
  constructor (props){
    super(props)
  }

  static propTypes = {
    width: PropTypes.number,
    setting: PropTypes.object,
    id: PropTypes.any,
    note: PropTypes.array,
    updateNote: PropTypes.func.isRequired,
  }

  updateHeight = () => {
    const {updateNote, note, id} = this.props
    const segmentHeight = this.sentencearea.offsetHeight

    if (note[id].segmentHeight != segmentHeight) {
      let newNote = note.slice()
      newNote[id].segmentHeight = segmentHeight
      updateNote(newNote)
    }
  }
  render (){
    const { setting, id, width } = this.props
    return (
      <SentenceArea
        innerRef={ref => this.sentencearea = ref} >
        <LabNum lineNoType={setting.lineNos} id={id} />
        <DivCanvas>
          <Canvas
            imgMaxWidth={width - 50}
            canvasWidth={width - 50}
            updateHeight={this.updateHeight}
            {...pick(this.props, keys(Canvas.propTypes))}
          />
        </DivCanvas>
      </SentenceArea>
    )
  }
}

export default ImgOnly