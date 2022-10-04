import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable(
  'LogWaktuShifts',
  (DataTypes) => {
    return {
      waktuMulai: {
        allowNull: false,
        type: DataTypes.TIME,
      },
      waktuSelesai: {
        allowNull: false,
        type: DataTypes.TIME,
      },
      ShiftId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
    }
  }
)
