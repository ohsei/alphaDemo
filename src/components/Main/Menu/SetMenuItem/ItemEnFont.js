import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {find} from 'lodash'

import {enFontList} from '../../../../utils/const'

import MiddleItem from './common/MiddleItem'
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

class ItemEnFont extends Component{
  setEnFont = () => {
    const {updateSetting, setting} = this.props
    let newSetting = Object.assign({}, setting)
    const enFont = find(enFontList, {value: this.enFontSelect.value})
    newSetting.enFont = enFont.id
    updateSetting(newSetting)
  }

  render (){
    const {setting} = this.props
    let enFontLst = enFontList.map((list) =>
      <option key={list.id} value={list.value}>{list.value}</option>
    )
    const value = find(enFontList, {id: setting.enFont}).value
    return (
      <DivSetMenu>
        <MiddleItem >
          {this.props.name}
        </MiddleItem>
        <DivSetMenuPart column>
          <DivSetMenuPart>
            <SelectItem
              innerRef={(ref) => {this.enFontSelect = ref}}
              value={value}
              onChange={this.setEnFont}>
              {enFontLst}
            </SelectItem>
          </DivSetMenuPart>
        </DivSetMenuPart>
      </DivSetMenu>
    )}
}

ItemEnFont.propTypes = {
  setting: PropTypes.object,
  name: PropTypes.string,
  updateSetting: PropTypes.func.isRequired,
}

export default ItemEnFont
