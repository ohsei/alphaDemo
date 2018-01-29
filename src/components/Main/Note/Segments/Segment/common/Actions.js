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
    id: PropTypes.number,
    noteLength: PropTypes.number,
    curSegmentNo: PropTypes.any,
    updateNote: PropTypes.func,
    delSegment: PropTypes.func,
    type: PropTypes.string,
    isPageBreak: PropTypes.bool,
    isUserPageBreak: PropTypes.bool,
    setCurSegment: PropTypes.func.isRequired,
  }

  updateType = (type) => {
    const {updateNote, id} = this.props
    updateNote({
      pattern: 'type',
      id,
      type,
    })
  }

  onClick = () => {
    const {setCurSegment, id} = this.props
    setCurSegment(id)
  }

  setImgOnly = () => {
    this.updateType('imgOnly')
  }

  setImgTxt = () => {
    this.updateType('imgTxt')
  }

  setTxtImg = () => {
    this.updateType('txtImg')
  }

  setTxtOnly = () => {
    this.updateType('txtOnly')
  }

  delSegment = () => {
    const {updateNote, id} = this.props
    updateNote({
      pattern: 'del',
      id,
    })
  }

  addSegment = () => {
    const {updateNote, id} = this.props
    updateNote({
      pattern: 'add',
      id,
    })
  }

  addPageBreak = () => {
    const {updateNote, id, isPageBreak, isUserPageBreak} = this.props

    if (isPageBreak || isUserPageBreak) {
    /* 削除 */
      updateNote({
        pattern: 'delBreak',
        id,
      })
    }
    else {
      /* 追加 */
      updateNote({
        pattern: 'addBreak',
        id,
      })
    }
  }

  imgAdd = (event) => {
    const {updateNote, id} = this.props

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

          updateNote({
            pattern: 'loadImg',
            id,
            dataUrl,
          })
        }.bind(this)
      }.bind(this)

      reader.readAsText(file)
    }
  }
  componentDidMount (){
    const {id, noteLength} = this.props

    if (noteLength === 1 && id === 0){
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
    const {id, type, noteLength} = this.props

    if (noteLength === 1 && id === 0){
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
      <DivAction onClick={this.onClick}>
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
