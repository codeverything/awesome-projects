import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable('Ruangans', (DataTypes) => {
  return {
    MasterRuanganId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    MasterTipeRuanganId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  }
})
