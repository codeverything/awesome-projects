/* eslint-disable no-unused-vars */
import fs from 'fs'
import { isNil, head, last, sum, map, filter } from 'lodash'
import moment from 'moment'
import { InvoiceBalance } from './baseInterface'

const invalidValues = [null, undefined, '', false, 0]

// Generate Unique Code ( default length 32 )
function getUniqueCodev2(length = 32) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

// Read HTML File
function readHTMLFile(path: any, callback: any) {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      callback(err)
    } else {
      callback(null, html)
    }
  })
}

const checkHelper = (data: any) => {
  const nullable = ['null', 'undefined', '', [''], undefined, null]
  if (isNil(data) || nullable.includes(data)) {
    return null
  }
  return data
}

function formatNumber(price: number | string): string {
  return String(price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
}

function toInteger(price: string) {
  return Number(price.split('.').join(''))
}

export const durationCalc = (dataAwal: any, dataAkhir: any): number => {
  return Math.floor(
    Math.abs(moment.duration(moment(dataAwal).diff(moment(dataAkhir))).asDays())
  )
}

export const getFirstAndLastDate = (data: any) => {
  const listDate: any = []
  data.forEach((item: any) =>
    listDate.push(item.tanggalCheckOut, item.tanggalCheckIn)
  )
  const sortDate = listDate.sort()
  return { firstDate: head(sortDate), lastDate: last(sortDate) }
}

export const countTotal = (data: any) => {
  let current = null
  let count = 0
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < data.length; i++) {
    if (data[i] !== current) {
      if (count > 0) {
        console.log(current, count)
      }
      current = data[i]
      count = 1
    } else {
      count += 1
    }
  }
  return count
}

export const distinct = (value: any, index: any, self: any) => {
  return self.indexOf(value) === index
}

export const createInvoice = (nomor: number): string => {
  return `INV/${moment().format('DDMMYY')}/${nomor.toString().padStart(5, '0')}`
}

export const getTotal = (data: any, column: any): number => {
  const result = sum(map(data, (x) => x[column]))
  return result
}

export const getBalance = ({
  totalTagihan,
  totalTambahan,
  totalPembayaran,
  totalRefund,
}: InvoiceBalance): number => {
  const data = totalPembayaran - (totalTagihan + totalTambahan + totalRefund)
  return data
}

export const changeDateLocaleId = (data: any): string => {
  return moment(data).locale('id').format('LL')
}

export const getTotalExist = (data: any, column: any): number => {
  return data.length > 0 ? getTotal(data, column) : 0
}

export const getBaseValueNilai = (
  baseValue: number,
  harga: number,
  jumlah: number
): number => {
  return baseValue + harga * jumlah
}

export const checkTanggal = (data: any, formatDate: any) =>
  moment(data.updatedAt).locale('id').format(formatDate)

export const checkValueExist = (data: any, column: any) => {
  return !data[column] ? 0 : data[column]
}

export const formatTanggal = (data: any): string => {
  return moment(data).locale('id').format('LL')
}
export const formatTanggalAndTime = (data: any): string => {
  return `${moment(data).format('DD-MM-YYYY')} ${moment(data).format('HH:mm')}`
}

export const pemeriksaGenerate = (
  data: any,
  namaStaff: any,
  updatedAt: any
): string => {
  return `${!data ? `-` : `${namaStaff} (${formatTanggalAndTime(updatedAt)})`}`
}

export const tanggalAndTimeGenerate = (date: any, format: string) => {
  return moment(date).locale('id').format(format)
}

export {
  getUniqueCodev2,
  readHTMLFile,
  invalidValues,
  checkHelper,
  formatNumber,
  toInteger,
}
