import moment from 'moment'

export const checkTanggal = (data: any, formatDate: any) =>
  !data.lastUpdate || data.lastUpdate === null
    ? moment(data.updatedAt).locale('id').format(formatDate)
    : moment(data.lastUpdate).locale('id').format(formatDate)

export const divideQuery = async (
  model: any,
  listdata: any,
  order: any,
  attributes: string[],
  queryFind: any
) => {
  let data
  if (!queryFind) {
    data = await model.findAll({
      attributes,
      where: {
        id: listdata,
      },
      order: order.length ? order : [['nama', 'asc']],
    })
  } else {
    data = await model.findAll({
      attributes,
      where: {
        id: listdata,
        ...queryFind,
      },
      order: order.length ? order : [['nama', 'asc']],
    })
  }
  return data
}

export const capitalize = (data: any) => {
  return data
    .split(' ')
    .map((x: any) => {
      const dataArr = x.split('')
      const format = dataArr[0].toUpperCase()
      dataArr.push(format)
      dataArr[0] = dataArr[dataArr.length - 1]
      dataArr.pop()
      const result = dataArr.join('')
      return result
    })
    .join(' ')
}
