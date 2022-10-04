import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable(
  'LogNilaiPromos',
  (DataTypes) => {
    return {
      nilai: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      PromoId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
    }
  }
)
