export const getMaxNumsWithSetting = (setting) => {
  const enSize = setting.enSize
  const interval = parseFloat(setting.interval)
  const layout = setting.layout

  if (layout == 'portrait') {
    if (enSize == '１倍') {
      if (interval == 1.5) {
        return 10
      }
      else if (interval == 2) {
        return 7
      }
      else if (interval == 2.5) {
        return 6
      }
      else if (interval == 3) {
        return 5
      }
    }
    else if (enSize == '２倍') {
      if (interval == 1.5) {
        return 5
      }
      else if (interval == 2) {
        return 3
      }
      else if (interval == 2.5) {
        return 3
      }
      else if (interval == 3) {
        return 2
      }
    }
    else if (enSize == '４倍') {
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
    if (enSize == '１倍') {
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
    else if (enSize == '２倍') {
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
    else if (enSize == '４倍') {
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