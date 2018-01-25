
import Item from './Item.js'

const MiddleItem = Item.extend`
  padding-right: 5px;
  height: 30px;
  width: 150px;
  text-align: right;
  cursor: pointer;
  position: relative;
  z-index: 999;
`

export default MiddleItem