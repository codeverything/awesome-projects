import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable(
  'LogMasterItemTagihans',
  (DataTypes) => {
    return {
      harga: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      tanggalBerlaku: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      MasterItemTagihanId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
    }
  }
)
