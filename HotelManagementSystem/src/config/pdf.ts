/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
import moment from 'moment'
import { formatNumber } from 'helpers/Common'
import { ConstMasterStatusPembayaran } from 'constants/index'

const fs = require('fs')
const path = require('path')
const pdf = require('html-pdf')
const handlebars = require('handlebars')

async function GeneratePDF(data: any, callback: any, orientation = 'portrait') {
  try {
    const saveTo = path.resolve(
      `${__dirname}`,
      `../../public/uploads/pdf/${data.nomorInvoice.split('/').join('_')}.pdf`
    )

    const file = await fs.readFileSync(
      path.resolve(__dirname, `../../views/index.html`),
      'utf8'
    )
    if (data.InvoiceTagihan.length > 0) {
      for (const item in data.InvoiceTagihan) {
        data.InvoiceTagihan[item].amount = formatNumber(
          data.InvoiceTagihan[item].amount
        )
        data.InvoiceTagihan[item].totalHarga = formatNumber(
          data.InvoiceTagihan[item].totalHarga
        )
      }
    }
    if (data.InvoiceTambahan.length > 0) {
      for (const item in data.InvoiceTambahan) {
        data.InvoiceTambahan[item].amount = formatNumber(
          data.InvoiceTambahan[item].amount
        )
        data.InvoiceTambahan[item].totalHarga = formatNumber(
          data.InvoiceTambahan[item].totalHarga
        )
      }
    }
    // to moment
    if (data.InvoicePembayaran.length > 0) {
      for (const item in data.InvoicePembayaran) {
        data.InvoicePembayaran[item].dataValues.updatedAt = moment(
          data.InvoicePembayaran[item].updatedAt
        )
          .locale('id')
          .format('LL')
        data.InvoicePembayaran[item].dataValues.nilai = formatNumber(
          data.InvoicePembayaran[item].dataValues.nilai
        )
      }
    }
    if (data.InvoiceRefund.length > 0) {
      for (const item in data.InvoiceRefund) {
        data.InvoiceRefund[item].dataValues.updatedAt = moment(
          data.InvoiceRefund[item].updatedAt
        )
          .locale('id')
          .format('LL')
        data.InvoiceRefund[item].dataValues.nilai = formatNumber(
          data.InvoiceRefund[item].dataValues.nilai
        )
      }
    }
    let color: string = ''
    let colorText: string = ''
    switch (data.MasterStatusPembayaran.id) {
      case ConstMasterStatusPembayaran.BELUM_LUNAS:
        color = 'border-radius: 100px; background-color: #E24949;'
        colorText = 'font-weight: bold; color: #6b0c0c;'
        break
      case ConstMasterStatusPembayaran.LUNAS:
        color = 'border-radius: 100px; background-color: #CBFFE4;'
        colorText = 'font-weight: bold; color: #01AE6E'
        break
      case ConstMasterStatusPembayaran.REFUND:
        color = 'border-radius: 100px; background-color: #FF9901'
        colorText = 'font-weight: bold; color: #5f3900;'
        break
      default:
        color = 'btn btn-outline-secondary'
        colorText = 'font-weight: bold; color: #2f3869'
    }
    let colorBalance: string = ''
    if (data.balance >= 0) {
      colorBalance = 'color: #01AE6E;'
    } else if (data.balance < 0) {
      colorBalance = 'color: #E24949;'
    }
    data.conditionColorBalance = colorBalance
    data.conditionColorText = colorText
    data.conditionColorBlock = color
    data.totalTagihan = formatNumber(data.totalTagihan)
    data.totalTambahan = formatNumber(data.totalTambahan)
    data.totalPromo = formatNumber(data.totalPromo)
    data.total = formatNumber(data.total)
    data.totalPembayaran = formatNumber(data.totalPembayaran)
    data.totalRefund = formatNumber(data.totalRefund)
    data.balance = formatNumber(data.balance)
    const templateCompile = handlebars.compile(file)
    const html = templateCompile(data)

    const options = {
      format: 'A4',
      orientation,
      base: `file://${path.resolve(__dirname, '../../public/uploads')}`,
    }

    pdf.create(html, options).toFile(saveTo, function (err: any, res: any) {
      if (typeof callback === 'function') {
        callback(err, res)
      }
    })
  } catch (err) {
    console.log(err.message)
  }
}

const Pdf = {
  GeneratePDF,
}

export default Pdf
