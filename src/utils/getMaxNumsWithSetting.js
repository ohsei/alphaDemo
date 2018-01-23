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