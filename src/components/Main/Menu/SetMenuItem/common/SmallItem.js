
import Item from './Item.js'

const SmallItem = Item.extend`
  height: 30px;
  width: 90px;
  text-align: center;
  cursor: pointer;
  position: relative;
  z-index: 999;
`

export default SmallItem