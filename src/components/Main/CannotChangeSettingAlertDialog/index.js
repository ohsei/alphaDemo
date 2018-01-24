/* 印刷一ページを超えた場合提示用コンポーネント */
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

class CannotChangeSettingAlertDialog extends Component{
  static propTypes = {
    alertMessage: PropTypes.string,
    maxLineNumMessage: PropTypes.string,
    isShowCannotChangeSettingAlert: PropTypes.bool,
    onShowCannotChangeSettingAlertDialog: PropTypes.func.isRequired,
  }

  onCancel = () => {
    const {onShowCannotChangeSettingAlertDialog} = this.props

    onShowCannotChangeSettingAlertDialog(false)
  }
  render () {
    const {isShowCannotChangeSettingAlert, alertMessage, maxLineNumMessage} = this.props

    return (
      <DivOverlap show={isShowCannotChangeSettingAlert}>
        <Wrapper>
          <h3 style={{flex: 8, marginLeft: 10}}>{alertMessage}</h3>
          <br />
          <p>※適切範囲とは</p>
          <p dangerouslySetInnerHTML={{__html: maxLineNumMessage}} />
          <Button style={{float: 'right'}} onClick={this.onCancel}>OK</Button>
        </Wrapper>
      </DivOverlap>
    )
  }
}

export default CannotChangeSettingAlertDialog