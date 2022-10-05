import { ReservasiInstance } from 'models/reservasi'
import { ConstMasterStatusPembayaran } from 'constants/index'
import { Transaction } from 'sequelize'

export default class StatusPembayaran {
  currentValue: number = 0

  opponentValue: number = 0

  constructor(currentvalue: number, opponentValue: number) {
    this.currentValue = currentvalue
    this.opponentValue = opponentValue
  }

  async updateStatusPembayaran(
    data: ReservasiInstance | null,
    txn: Transaction
  ) {
    if (this.currentValue - this.opponentValue === 0) {
      await data?.update(
        {
          MasterStatusPembayaranId: ConstMasterStatusPembayaran.LUNAS,
        },
        {
          transaction: txn,
        }
      )
    } else if (this.currentValue - this.opponentValue === 0) {
      data?.update(
        {
          MasterStatusPembayaranId: ConstMasterStatusPembayaran.REFUND,
        },
        {
          transaction: txn,
        }
      )
    } else {
      data?.update(
        {
          MasterStatusPembayaranId: ConstMasterStatusPembayaran.BELUM_LUNAS,
        },
        {
          transaction: txn,
        }
      )
    }
  }
}
