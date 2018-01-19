import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {pick, keys} from 'lodash'

import ItemLayout from './ItemLayout'
import ItemJaSize from './ItemJaSize'
import ItemEnSize from './ItemEnSize'
import ItemEnFont from './ItemEnFont'
import ItemLineColor from './ItemLineColor'
import ItemLineNum from './ItemLineNum'
import ItemLineNos from './ItemLineNos'
import ItemInterval from './ItemInterval'


/* define layout start */
const Item = styled.div`
  width: 30px;
  background-color: #FFAE72;
  color: white;
  -webkit-writing-mode: ${props => props.vertical ? 'vertical-lr' : 'horizontal-tb'};
  -ms-writing-mode:  ${props => props.vertical ? 'tb-lr' : 'lr-tb'};
  writing-mode: ${props => props.vertical ? 'tb-lr' : 'lr-tb'};
  text-orientation: upright;
  height: 50px;
  border: 0.1px solid white;
  flex-direction:row;
  line-height: 30px;
`
const DivSetMenu = styled.div`

`
const DivSetMenuDetail = styled.div`
  display: ${props => props.clicked ? 'block' : 'none'};
  position: fixed;
  top: 50px;
  left: 35px;
`

const ItemSetting = Item.extend`
  vertical: ${props => props.vertical};
  height: ${props => props.clicked ? '273px' : '50px'};
  margin: 0 0 10px 0;
  padding: 10px 0 5px 0;
  cursor: pointer;
`

class SetMenuItem extends Component{

  onSettingClick = () => {
    const {onShowMenu, isShowMenu} = this.props
    onShowMenu(!isShowMenu)
  }

  render (){
    const {isShowMenu} = this.props
    return (
      <DivSetMenu>
        <ItemSetting vertical
          ref={(ref) => {this.setting = ref}}
          clicked={isShowMenu}
          onClick={this.onSettingClick}>
          {this.props.setName}
        </ItemSetting>
        <DivSetMenuDetail clicked={isShowMenu}>
          <ItemLayout
            name='用紙設定'
            {...pick(this.props, keys(ItemLayout.propTypes))}>
          </ItemLayout>
          <ItemJaSize
            name='和文'
            {...pick(this.props, keys(ItemJaSize.propTypes))}>
          </ItemJaSize>
          <ItemEnFont
            name='英字フォント'
            {...pick(this.props, keys(ItemEnFont.propTypes))}
          >
          </ItemEnFont>
          <ItemEnSize
            name='英字フォントサイズ'
            {...pick(this.props, keys(ItemEnSize.propTypes))}
          >
          </ItemEnSize>
          <ItemLineColor
            name='線の濃さ'
            {...pick(this.props, keys(ItemLineColor.propTypes))}
          >
          </ItemLineColor>
          <ItemLineNum
            name='線の本数'
            {...pick(this.props, keys(ItemLineNum.propTypes))}
          >
          </ItemLineNum>
          <ItemInterval
            name='行間'
            {...pick(this.props, keys(ItemInterval.propTypes))}
          >
          </ItemInterval>
          <ItemLineNos
            name='行番'
            {...pick(this.props, keys(ItemLineNos.propTypes))}
          >
          </ItemLineNos>
        </DivSetMenuDetail>
      </DivSetMenu>
    )
  }
}

SetMenuItem.propTypes = {
  setName: PropTypes.string,
  setting: PropTypes.object,
  updateSetting: PropTypes.func.isRequired,
  updateWidth: PropTypes.func.isRequired,
  onShowMenu: PropTypes.func.isRequired,
  isShowMenu: PropTypes.bool
}

export default SetMenuItem