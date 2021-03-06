import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const DivAction = styled.div.attrs({
  tabIndex: -1,
})`
  display: flex;
  margin: 10px 0 10px 0;
  -webkit-box-pack:justify;
  -ms-flex-pack:justify;
  justify-content: space-between;
`
const StyledButton = styled.button.attrs({
  tabIndex: -1,
})`
  margin: 0px 5px 0px 5px;
  width: 40px;
  height: 40px;
  border: 1px solid white;
`
const ImgAddLabel = styled.label.attrs({
  tabIndex: -1,
})`
  margin: 0px 5px 0 5px;
  width: 40px;
  height: 40px;
  border: 1px solid white;
  display: inline-block;
`
const InputFileOpen = styled.input.attrs({
  tabIndex: -1,
})`
  display: none;
`

class Actions extends Component{
  static propTypes = {
    note: PropTypes.array,
    id: PropTypes.number,
    updateNote: PropTypes.func,
    onForceChange: PropTypes.func,
    delSegment: PropTypes.func,
    type: PropTypes.string,
    setFocusSegment: PropTypes.func
  }

  setImgOnly = () => {
    const {updateNote, note, id} = this.props

    let newNote = note.slice()
    note[id].type = 'imgOnly'
    note[id].html = ''
    note[id].jaHtml = ''
    note[id].imgWidth = 0
    note[id].imgHeight = 0
    note[id].enHeight = 0
    note[id].jaHeight = 0
    updateNote(newNote)
  }

  setImgTxt = () => {
    const {updateNote, note, id} = this.props

    let newNote = note.slice()
    note[id].type = 'imgTxt'
    note[id].imgWidth = 0
    note[id].imgHeight = 0
    updateNote(newNote)
  }

  setTxtImg = () => {
    const {updateNote, note, id} = this.props

    let newNote = note.slice()
    note[id].type = 'txtImg'
    note[id].imgWidth = 0
    note[id].imgHeight = 0
    updateNote(newNote)
  }

  setTxtOnly = () => {
    const {updateNote, note, id} = this.props

    let newNote = note.slice()
    note[id].type = 'txtOnly'
    note[id].dataUrl = ''
    note[id].imgWidth = 0
    note[id].imgHeight = 0
    updateNote(newNote)
  }

  delSegment = () => {
    const {updateNote, onForceChange, id, note} = this.props

    let newNote = note.slice()
    let curNo = id

    for (let i = curNo + 1;i < newNote.length;i++){
      newNote[i].id--
    }
    newNote.splice(curNo, 1)
    updateNote(newNote)
    onForceChange()
  }

  addSegment = () => {
    const {updateNote, onForceChange, id, note, setFocusSegment} = this.props
    let newNote = note.slice()

    for (let i = id + 1;i < newNote.length;i++){
      newNote[i].id++
    }

    const curNo = id + 1
    newNote.splice(curNo, 0, {id: curNo, type: 'txtOnly', html: '', jaHtml: '', dataUrl: '', isPageBreak: false, isUserPageBreak: false, jaHeight: 0, enHeight: 0, segmentHeight: 0, imgWidth: 0, imgHeight: 0, posX: 20, posY: 20})

    if (newNote[id].isUserPageBreak) {
      newNote[id + 1].isUserPageBreak = true
      newNote[id].isUserPageBreak = false
    }
    updateNote(newNote)
    onForceChange()
    setFocusSegment(curNo)
  }

  addPageBreak = () => {
    const {updateNote, id, note, onForceChange, setFocusSegment} = this.props

    let newNote = note.slice()

    if (newNote[id].isUserPageBreak) {
      newNote[id].isUserPageBreak = false
      updateNote(newNote)
      onForceChange()
      return
    }
    newNote[id].isUserPageBreak = true
    let curNo = id

    for (let i = curNo + 1;i < newNote.length;i++){
      newNote[i].id++
    }
    curNo++
    newNote.splice(curNo, 0, {id: curNo, type: 'txtOnly', html: '', jaHtml: '', dataUrl: '', isPageBreak: false, isUserPageBreak: false, jaHeight: 0, enHeight: 0, segmentHeight: 0, imgWidth: 0, imgHeight: 0, posX: 20, posY: 20, })
    updateNote(newNote)
    setFocusSegment(curNo)
    onForceChange()
  }

  imgAdd = (event) => {
    const {updateNote, note, id} = this.props

    let file = event.target.files[0]

    if (file != null){
      var reader = new FileReader()

      reader.onload = function (){
        var canvas = this.imgCanvas

        var ctx = canvas.getContext('2d')
        var img = new Image()

        var url = window.URL || window.webkitURL
        var src = url.createObjectURL(file)
        img.src = src
        img.onload = function (){
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0, img.width, img.height)
          url.revokeObjectURL(src)
          var dataUrl = canvas.toDataURL('img/png')

          let newNote = note.slice()
          newNote[id].dataUrl = dataUrl
          newNote[id].imgWidth = 0
          newNote[id].imgHeight = 0
          newNote[id].posX = 20
          newNote[id].posY = 20
          updateNote(newNote)
        }.bind(this)
      }.bind(this)

      reader.readAsText(file)
    }
  }
  componentDidMount (){
    const {id, note} = this.props

    if (note.length === 1 && id === 0){
      this.btnDelSeg.disabled = true
      this.btnDelSeg.style.backgroundImage = 'url(' + require('../../../../../../resources/img/delete_gray.png') + ')'
    }
    else {
      this.btnDelSeg.disabled = false
      this.btnDelSeg.style.backgroundImage = 'url(' + require('../../../../../../resources/img/delete.png') + ')'
    }

    if (this.props.type == 'txtOnly'){
      this.imgAddAction.disabled = true
    } else {
      this.imgAddAction.disabled = false
    }

    switch (this.props.type){
    case 'txtOnly':
      this.txtOnly.style.backgroundImage = `url(${require('../../../../../../resources/img/text.png')})`
      this.imgOnly.style.backgroundImage = `url(${require('../../../../../../resources/img/pict_gray.png')})`
      this.imgTxt.style.backgroundImage = `url(${require('../../../../../../resources/img/picttext_gray.png')})`
      this.txtImg.style.backgroundImage = `url(${require('../../../../../../resources/img/textpict_gray.png')})`
      this.imgAddLabel.style.backgroundImage = `url(${require('../../../../../../resources/img/import_pict_gray.png')})`
      break

    case 'imgTxt':
      this.txtOnly.style.backgroundImage = `url(${require('../../../../../../resources/img/text_gray.png')})`
      this.imgOnly.style.backgroundImage = `url(${require('../../../../../../resources/img/pict_gray.png')})`
      this.imgTxt.style.backgroundImage = `url(${require('../../../../../../resources/img/picttext.png')})`
      this.txtImg.style.backgroundImage = `url(${require('../../../../../../resources/img/textpict_gray.png')})`
      this.imgAddLabel.style.backgroundImage = `url(${require('../../../../../../resources/img/import_pict.png')})`
      break

    case 'txtImg':
      this.txtOnly.style.backgroundImage = `url(${require('../../../../../../resources/img/text_gray.png')})`
      this.imgOnly.style.backgroundImage = `url(${require('../../../../../../resources/img/pict_gray.png')})`
      this.imgTxt.style.backgroundImage = `url(${require('../../../../../../resources/img/picttext_gray.png')})`
      this.txtImg.style.backgroundImage = `url(${require('../../../../../../resources/img/textpict.png')})`
      this.imgAddLabel.style.backgroundImage = `url(${require('../../../../../../resources/img/import_pict.png')})`
      break

    case 'imgOnly':
      this.txtOnly.style.backgroundImage = `url(${require('../../../../../../resources/img/text_gray.png')})`
      this.imgOnly.style.backgroundImage = `url(${require('../../../../../../resources/img/pict.png')})`
      this.imgTxt.style.backgroundImage = `url(${require('../../../../../../resources/img/picttext_gray.png')})`
      this.txtImg.style.backgroundImage = `url(${require('../../../../../../resources/img/textpict_gray.png')})`
      this.imgAddLabel.style.backgroundImage = `url(${require('../../../../../../resources/img/import_pict.png')})`
      break
    }
  }

  componentDidUpdate (){
    const {id, type, note} = this.props

    if (note.length === 1 && id === 0){
      this.btnDelSeg.disabled = true
      this.btnDelSeg.style.backgroundImage = 'url(' + require('../../../../../../resources/img/delete_gray.png') + ')'
    }
    else {
      this.btnDelSeg.disabled = false
      this.btnDelSeg.style.backgroundImage = 'url(' + require('../../../../../../resources/img/delete.png') + ')'
    }

    if (type == 'txtOnly'){
      this.imgAddAction.disabled = true
    } else {
      this.imgAddAction.disabled = false
    }

    switch (type){
    case 'txtOnly':
      this.txtOnly.style.backgroundImage = `url(${require('../../../../../../resources/img/text.png')})`
      this.imgOnly.style.backgroundImage = `url(${require('../../../../../../resources/img/pict_gray.png')})`
      this.imgTxt.style.backgroundImage = `url(${require('../../../../../../resources/img/picttext_gray.png')})`
      this.txtImg.style.backgroundImage = `url(${require('../../../../../../resources/img/textpict_gray.png')})`
      this.imgAddLabel.style.backgroundImage = `url(${require('../../../../../../resources/img/import_pict_gray.png')})`
      break

    case 'imgTxt':
      this.txtOnly.style.backgroundImage = `url(${require('../../../../../../resources/img/text_gray.png')})`
      this.imgOnly.style.backgroundImage = `url(${require('../../../../../../resources/img/pict_gray.png')})`
      this.imgTxt.style.backgroundImage = `url(${require('../../../../../../resources/img/picttext.png')})`
      this.txtImg.style.backgroundImage = `url(${require('../../../../../../resources/img/textpict_gray.png')})`
      this.imgAddLabel.style.backgroundImage = `url(${require('../../../../../../resources/img/import_pict.png')})`
      break

    case 'txtImg':
      this.txtOnly.style.backgroundImage = `url(${require('../../../../../../resources/img/text_gray.png')})`
      this.imgOnly.style.backgroundImage = `url(${require('../../../../../../resources/img/pict_gray.png')})`
      this.imgTxt.style.backgroundImage = `url(${require('../../../../../../resources/img/picttext_gray.png')})`
      this.txtImg.style.backgroundImage = `url(${require('../../../../../../resources/img/textpict.png')})`
      this.imgAddLabel.style.backgroundImage = `url(${require('../../../../../../resources/img/import_pict.png')})`
      break

    case 'imgOnly':
      this.txtOnly.style.backgroundImage = `url(${require('../../../../../../resources/img/text_gray.png')})`
      this.imgOnly.style.backgroundImage = `url(${require('../../../../../../resources/img/pict.png')})`
      this.imgTxt.style.backgroundImage = `url(${require('../../../../../../resources/img/picttext_gray.png')})`
      this.txtImg.style.backgroundImage = `url(${require('../../../../../../resources/img/textpict_gray.png')})`
      this.imgAddLabel.style.backgroundImage = `url(${require('../../../../../../resources/img/import_pict.png')})`
      break
    }
  }

  render (){
    const {id} = this.props
    const imgopenId = `imgopen'${id}`
    return (
      <DivAction>
        <StyledButton
          style={{
            marginLeft: 5,
            backgroundImage: 'url(' + require('../../../../../../resources/img/delete.png') + ')',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
          innerRef={(ref) => {this.btnDelSeg = ref}}
          onClick={this.delSegment} />
        <div style={{display: 'flex'}}>
          <ImgAddLabel
            style={{
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }}
            htmlFor={imgopenId} innerRef={(ref) => {this.imgAddLabel = ref}}></ImgAddLabel>
          <InputFileOpen id={imgopenId} type='file'
            innerRef={(ref) => {this.imgAddAction = ref}}
            onChange={this.imgAdd}
            style={{display: 'none'}} />
          <canvas style={{display: 'none'}} ref={(ref) => {this.imgCanvas = ref}} />
          <StyledButton
            style={{marginLeft: 30,
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat', }}
            innerRef={(ref) => {this.imgOnly = ref}}
            onClick={this.setImgOnly} />
          <StyledButton
            style={{
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              width: 80
            }}
            innerRef={(ref) => {this.imgTxt = ref}}
            onClick={this.setImgTxt} />
          <StyledButton
            style={{
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              width: 80
            }}
            innerRef={(ref) => {this.txtImg = ref}}
            onClick={this.setTxtImg} />
          <StyledButton
            style={{
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }}
            innerRef={(ref) => {this.txtOnly = ref}}
            onClick={this.setTxtOnly} />
          <StyledButton
            style={{backgroundImage: 'url(' + require('../../../../../../resources/img/add_row.png') + ')',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }}
            innerRef={(ref) => {this.btnAddSeg = ref}}
            onClick={this.addSegment} />
        </div>
        <StyledButton
          style={{
            marginRight: 5,
            backgroundImage: 'url(' + require('../../../../../../resources/img/new_page.png') + ')',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
          innerRef={(ref) => {this.btnPageBreak = ref}}
          onClick={this.addPageBreak} />
      </DivAction>
    )
  }
}


export default Actions
