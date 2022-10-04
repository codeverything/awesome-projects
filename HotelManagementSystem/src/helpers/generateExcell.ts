/* eslint-disable guard-for-in */
import excel from 'exceljs'
import { distinct } from 'helpers/Common'
import { ConstMasterSourcePemesanan } from 'constants/index'
import { get } from 'lodash'

async function generateExcel(
  headers: Partial<excel.Column>[],
  data: any[]
): Promise<Buffer> {
  const workBook = new excel.stream.xlsx.WorkbookWriter({})
  const sheet: any = workBook.addWorksheet('My Worksheet')
  sheet.columns = headers

  // eslint-disable-next-line no-restricted-syntax
  for (const item in data) {
    const itemData = data[item]
    const tempData = {
      ...itemData.dataValues,
      getTotalTagihan: get(itemData.dataValues, 'detailInvoice.totalTagihan'),
      MasterJenisPembayaranNama: get(
        itemData,
        'MasterJenisPembayaran.dataValues.nama'
      ),
      MasterStatusPemesananNama: get(
        itemData,
        'MasterStatusPemesanan.dataValues.nama'
      ),
      MasterTipeTamuNama: get(
        itemData,
        'InformasiOrang.MasterTipeTamu.dataValues.nama'
      ),
      namaTamu: get(itemData, 'InformasiOrang.dataValues.nama'),
      MasterSourcePemesananNama:
        itemData.MasterSourcePemesananId === ConstMasterSourcePemesanan.OTA
          ? itemData.MasterOTA.dataValues.nama
          : itemData.MasterSourcePemesanan.dataValues.nama,
      SpesifikasiKamarNama: itemData.ReservasiKamars.map(
        (x: any) => x.SpesifikasiKamar.nama
      )
        .filter(distinct)
        .join(' , '),
      MasterStatusPembayaranNama: get(
        itemData,
        'MasterStatusPembayaran.dataValues.nama'
      ),
    }
    sheet.addRow(tempData)
  }
  sheet.getRow(1).font = { bold: true }
  sheet.commit()
  return new Promise((resolve, reject) => {
    workBook
      .commit()
      .then(() => {
        // eslint-disable-next-line prefer-destructuring
        const stream = (workBook as any).stream
        const result = stream.read()
        resolve(result)
      })
      .catch((e: any) => {
        reject(e)
      })
  })
}

export default generateExcel
