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

class OnlyEnglishAlertDialog extends Component{
  constructor (props){
    super(props)
    this.files = new Map()
  }
  static propTypes = {
    isShowOnlyEnglishAlert: PropTypes.bool,
    onShowOnlyEnglishAlertDialog: PropTypes.func.isRequired,
  }

  onCancel = () => {
    const {onShowOnlyEnglishAlertDialog} = this.props
    onShowOnlyEnglishAlertDialog(false)
  }
  
  render () {
    const {isShowOnlyEnglishAlert} = this.props

    return (
      <DivOverlap show={isShowOnlyEnglishAlert}>
        <Wrapper>
          <h3 style={{flex: 8, marginLeft: 10}}>英字のみでお願いいします。</h3>
          <Button style={{float: 'right'}} onClick={this.onCancel}>OK</Button>
        </Wrapper>
      </DivOverlap>
    )
  }
}

export default OnlyEnglishAlertDialog