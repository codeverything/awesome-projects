import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable(
  'LogHargaTipeRuangans',
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
      RuanganId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
    }
  }
)
