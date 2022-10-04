import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable(
  'InformasiOrangs',
  (DataTypes) => {
    return {
      nama: {
        type: DataTypes.STRING,
      },
      MasterTipeIdentitasId: {
        type: DataTypes.UUID,
      },
      nomorIdentitas: {
        type: DataTypes.BIGINT,
      },
      CityId: {
        type: DataTypes.INTEGER,
      },
      tanggalLahir: {
        type: DataTypes.DATEONLY,
      },

      alamat: {
        type: DataTypes.TEXT,
      },
      MasterJenisKelaminId: {
        type: DataTypes.UUID,
      },
      email: {
        type: DataTypes.STRING,
      },
      nomorHandphone: {
        type: DataTypes.STRING,
      },
      MasterStatusPerkawinanId: {
        type: DataTypes.UUID,
      },
      MasterAgamaId: {
        type: DataTypes.UUID,
      },
      MasterKewarganegaraanId: {
        type: DataTypes.UUID,
      },
      pekerjaan: {
        type: DataTypes.STRING,
      },
      fileIdentitas: {
        type: DataTypes.STRING,
      },
      fileBuktiMenikah: {
        type: DataTypes.STRING,
      },
      MasterTipeTamuId: {
        type: DataTypes.UUID,
      },
      jabatan: {
        type: DataTypes.STRING,
      },
    }
  }
)
