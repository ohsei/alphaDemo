import SmallItem from './SmallItem'

const SmallItemSelect = SmallItem.withComponent('select')

const SelectItem = SmallItemSelect.extend`
  width: 92px;
  height: 32px;
  border: 1px solid white;
  position: relative;
  z-index: 999;
`

export default SelectItem