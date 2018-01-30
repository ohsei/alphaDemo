import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {jaSizeList} from '../../../../utils/const'

import MiddleItem from './common/MiddleItem'
import SmallItem from './common/SmallItem'
import SelectItem from './common/SelectItem'

const DivSetMenu = styled.div`
  display: flex;
  flex-direction: row;
  -ms-flex-direction: row;
  justify-content: flex-start;
`
const DivSetMenuPart = styled.div`
  display: ${props => props.column ? 'block' : 'flex'};
  flex-direction: ${props => props.column ? 'column' : 'row'};
  -ms-flex-direction: ${props => props.column ? 'column' : 'row'};
`

class ItemJaSize extends Component{

  setUpJaSize = () => {
    const {updateSetting, setting} = this.props
    let tmpJaPos = setting.jaPos
    let tmpDownJaSize = setting.downJaSize

    if (this.upJaSizeSelect.value != 'オフ'){
      tmpJaPos = 'up'
      tmpDownJaSize = 'オフ'
    }

    let newSetting = Object.assign({}, setting)

    newSetting.upJaSize = this.upJaSizeSelect.value
    newSetting.downJaSize = tmpDownJaSize
    newSetting.jaPos = tmpJaPos

    updateSetting(newSetting)
  }
  setDownJaSize = () => {
    const {updateSetting, setting} = this.props
    let tmpJaPos = this.props.setting.jaPos
    let tmpUpJaSize = this.props.setting.upJaSize

    if (this.downJaSizeSelect.value != 'オフ'){
      tmpJaPos = 'down'
      tmpUpJaSize = 'オフ'
    }
    let newSetting = Object.assign({}, setting)

    newSetting.upJaSize = tmpUpJaSize
    newSetting.downJaSize = this.downJaSizeSelect.value
    newSetting.jaPos = tmpJaPos

    updateSetting(newSetting)
  }

  render (){
    const {setting} = this.props
    let jaSizeLst = jaSizeList.map((list) =>
      <option key={list.id} value={list.value}>{list.value}</option>
    )
    return (
      <DivSetMenu>
        <MiddleItem style={{height: 62, lineHeight: 3.8}}  >
          {this.props.name}
        </MiddleItem>
        <DivSetMenuPart column>
          <DivSetMenuPart>
            <SmallItem style={{cursor: 'default'}}>上</SmallItem>
            <SelectItem
              innerRef={(ref) => {this.upJaSizeSelect = ref}}
              value={setting.upJaSize}
              onChange={this.setUpJaSize}>
              {jaSizeLst}
            </SelectItem>
          </DivSetMenuPart>
          <DivSetMenuPart >
            <SmallItem style={{cursor: 'default'}}>下</SmallItem>
            <SelectItem
              innerRef={(ref) => {this.downJaSizeSelect = ref}}
              value={setting.downJaSize}
              onChange={this.setDownJaSize}>
              {jaSizeLst}
            </SelectItem>
          </DivSetMenuPart>
        </DivSetMenuPart>
      </DivSetMenu>
    )}
}

ItemJaSize.propTypes = {
  setting: PropTypes.object,
  name: PropTypes.string,
  updateSetting: PropTypes.func.isRequired,
}

export default ItemJaSize
