export const transformRawToCascader = (rawData) => {
  const options = []

  // 推入省
  const provinces = rawData['86']
  for (const provinceCode of Object.keys(provinces)) {
    options.push({
      value: provinceCode,
      label: provinces[provinceCode],
      children: []
    })
  }

  // 推入市
  for (const provinceCode of Object.keys(rawData)) {
    if (provinceCode === '86') continue

    const cities = rawData[provinceCode]
    const citiesMap = options.find(option => option.value === provinceCode).children
    for (const cityCode of Object.keys(cities)) {
      citiesMap.push({
        value: cityCode,
        label: cities[cityCode]
      })
    }
  }

  return options
}

export const filterProvince = (rawData, options) => {
  const res = Object.create(null)
  res['86'] = Object.create(null)
  const existed = Object.create(null)

  for (const [provinceCode, cityCode] of options) {
    // 处理省集合
    const provinceMap = res['86']
    if (!existed[provinceCode]) {
      existed[provinceCode] = true
      provinceMap[provinceCode] = rawData['86'][provinceCode]
      res[provinceCode] = Object.create(null)
    }
    // 处理市集合
    const cityMap = res[provinceCode]
    cityMap[cityCode] = rawData[provinceCode][cityCode]
  }

  return res
}
