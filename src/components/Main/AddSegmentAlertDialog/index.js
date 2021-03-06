/* ファイル保存済み時の提示メッセージ用コンポーネント */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const DivOverlap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(100,100,100,0.5);
  display: ${props => props.show ? 'block' : 'none'}
`
const Wrapper = styled.div`
  position: fixed;
  width: 600px;
  top: 150px;
  left: 100px;
  z-index: 9999;
  border: 1px solid blue;
  color: black;
  background-color: #EEE;
`
const Button = styled.button`
  margin: 15px;
  width: 150px;
  height: 45px;
  background-color: #AAA;
  color: white;
  border: none;
  color: black;
  font-size: 16px;

  &:hover {
    border: 2px solid #555;
  }

  &:active {
    background-color: #555;
    border: 2px solid #555;
  }
`

class AddSegmentAlertDialog extends Component{
  constructor (props){
    super(props)
    this.files = new Map()
  }
  static propTypes = {
    isShowAddSegmentAlert: PropTypes.bool,
    onShowAddSegmentAlertDialog: PropTypes.func.isRequired,
  }

  onCancel = () => {
    const {onShowAddSegmentAlertDialog} = this.props

    onShowAddSegmentAlertDialog(false)
  }
  onKeyDown = (event) => {
    event.preventDefault()
  }
  render () {
    const {isShowAddSegmentAlert} = this.props
    const message = '１ページに印刷できる範囲をこえました。<br />複数の編集ボックスに分けて入力するか、テキストの量を調整してください。<br />（和文の行数によって英文の行数は変化します）。<br />テキスト入力の目安については、ヘルプを参照してください。'
    return (
      <DivOverlap show={isShowAddSegmentAlert} onKeyDown={this.onKeyDown}>
        <Wrapper>
          <h3 style={{flex: 8, marginLeft: 10}} dangerouslySetInnerHTML={{__html: message}} />
          <Button style={{float: 'right'}} onClick={this.onCancel}>OK</Button>
        </Wrapper>
      </DivOverlap>
    )
  }
}

export default AddSegmentAlertDialog