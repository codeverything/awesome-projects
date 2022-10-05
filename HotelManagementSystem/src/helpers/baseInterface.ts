import { AmenitieAttributes } from 'models/amenities'
import { LogAmenityAttributes } from 'models/logamenitity'
import { UserAttributes } from 'models/user'
import { LinenSupplyChainAttributes } from 'models/linensupplychain'
import { LogLinenSupplyChainAttributes } from 'models/loglinensupplychain'
import { ReservasiKamarAttributes } from 'models/reservasikamar'
import { LinenAttributes } from 'models/linen'

export interface IInvoiceTagihan {
  tanggal: string
  item: string
  satuan: string
  amount: string
  jumlah: number
  totalHarga: string
}

export interface ImageUpload {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

export interface IUserData extends UserAttributes {
  nama: string
}
export interface IAmenitySupply
  extends AmenitieAttributes,
    LogAmenityAttributes {}

export interface ILinenSupplyChain
  extends LinenSupplyChainAttributes,
    LogLinenSupplyChainAttributes {}

export interface IKerusakanKehilanganItem {
  linen: [
    {
      barangId: string
      jumlah: number
      MasterTagihanKerusakanKehilanganId: string
    }
  ]
  nonLinen: [
    {
      barangId: string
      jumlah: number
      MasterTagihanKerusakanKehilanganId: string
    }
  ]
}

export interface ICreatePerorangan {
  ReservasiId: string
  reservasiKamars: ReservasiKamarAttributes[]
}

export interface ICheckOut {
  MasterStatusHKId: string
  itemKerusakanKehilangan: {
    MasterStatusTagihanId: string
    id: string
    status: { nama: string }
    jumlah: number
  }[]
}

export interface IExtendKamarAttributes {
  tanggalExtend: Date
  hargaExtendPerMalam: number
  ReservasiFasilitasTambahan: any[]
  promo: string
}

export interface ICancelReservasiAttributes {
  nilai: number | any
  keterangan: string
}

export interface ICheckInAttributes {
  tipeRoom: ReservasiKamarAttributes | any
  Jaminan: {
    nilaiDeposit: string | number
    identitas: {
      MasterTipeIdentitasId: string
      nomorIdentitas: string
    }
  }
}

export interface IUpdateLinenAttributes extends LinenAttributes {
  MasterPenghitunganId: string
  MasterKeteranganId: string
}

export interface IUpdatePengambilanBarang {
  ReservasiKamarId: string
  diambilOleh: string
  tanggalDiambil: any
}

export interface IUpdateStockAmenity {
  jumlah: number
  MasterKeteranganId: string
  MasterPenghitunganId: string
}

export interface IUpdateLinenLaundryAttributes {
  masukBersih: number
  keluarKotor: number
}
export interface InvoiceBalance {
  totalTagihan: number
  totalTambahan: number
  totalPembayaran: number
  totalRefund: number
}

export interface ISpesifikasiKamar {
  nama: string
  MasterTipeKamarId: string
  defaultHargaKamar: number
  MasterTipeKasurId: string
  MasterSpecialRequirementId: string
  maxTamu: number
  linen: string[]
  itemKamar: string[]
}

export interface IKamarCreate {
  keterangan: any
  nomor: string
  SpesifikasiKamarId: string
  MasterStatusHKId: string
  connected: boolean | string
  kamar: {
    id: string
    nomor: string
  }
}

export interface ISwapKamar {
  MasterStatusHKId: string
  kamar: [
    {
      id: string
      nomor: string
      SpesifikasiKamarId: string
      SpesifikasiKamar: {
        nama: string
        MasterTipeKasurId: string
        MasterTipeKamarId: string
        MasterSpecialRequirementId: string
        LogHargaDefaultSpesifikasiKamar: {
          harga: number
        }
        HargaSpesifikasiKamar: {
          tanggalMulai: Date
          tanggalSelesai: Date
          harga: number
        }
      }
    }
  ]
}
