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

export const getMaxNumsWithSetting = (setting) => {
  const enSize = setting.enSize
  const interval = parseFloat(setting.interval)
  const layout = setting.layout

  if (layout == 'portrait') {
    if (enSize == '0') {
      if (interval == 1.5) {
        return 9
      }
      else if (interval == 2) {
        return 7
      }
      else if (interval == 2.5) {
        return 5
      }
      else if (interval == 3) {
        return 4
      }
    }
    else if (enSize == '1') {
      if (interval == 1.5) {
        return 4
      }
      else if (interval == 2) {
        return 3
      }
      else if (interval == 2.5) {
        return 2
      }
      else if (interval == 3) {
        return 2
      }
    }
    else if (enSize == '2') {
      if (interval == 1.5) {
        return 2
      }
      else if (interval == 2) {
        return 1
      }
      else if (interval == 2.5) {
        return 1
      }
      else if (interval == 3) {
        return 1
      }
    }
  }
  else {
    if (enSize == '0') {
      if (interval == 1.5) {
        return 8
      }
      else if (interval == 2) {
        return 6
      }
      else if (interval == 2.5) {
        return 4
      }
      else if (interval == 3) {
        return 4
      }
    }
    else if (enSize == '1') {
      if (interval == 1.5) {
        return 4
      }
      else if (interval == 2) {
        return 3
      }
      else if (interval == 2.5) {
        return 2
      }
      else if (interval == 3) {
        return 2
      }
    }
    else if (enSize == '2') {
      if (interval == 1.5) {
        return 2
      }
      else if (interval == 2) {
        return 1
      }
      else if (interval == 2.5) {
        return 1
      }
      else if (interval == 3) {
        return 1
      }
    }
  }
}
