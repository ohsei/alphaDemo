
export const changeFormat = (oldSetting, newSetting) => {
  const isEnFontChanged = oldSetting.enFont === newSetting.enFont ? false : true
  const isEnSizeChanged = oldSetting.enSize === newSetting.enSize ? false : true
  const isIntervalChanged = oldSetting.interval === newSetting.interval ? false : true
  const isUpJaSizeChanged = oldSetting.upJaSize === newSetting.upJaSize ? false : true
  const isDownJaSizeChanged = oldSetting.downJaSize === newSetting.downJaSize ? false : true
  const isLayoutChanged = oldSetting.layout === newSetting.layout ? false : true

  if (isEnFontChanged || isEnSizeChanged || isIntervalChanged || isUpJaSizeChanged || isDownJaSizeChanged || isLayoutChanged) {
    return true
  }

  return false
}
