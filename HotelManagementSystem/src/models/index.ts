/* eslint-disable import/no-named-as-default */
import Role from './role'
import User from './user'
import UserRole from './userrole'
import Promo from './promo'
import MasterTipePromo from './mastertipepromo'
import Amenity from './amenities'
import ApiRoute from './apiroute'
import Calendar from './calendar'
import City from './city'
import ConnectingDoor from './connectingdoor'
import EarlyLateCharge from './earlylatecharges'
import HargaSpesifikasiKamar from './hargaspesifikasikamar'
import InformasiOrang from './informasiorang'
import InvoicePembayaran from './invoicepembayarn'
import InvoiceRefund from './invoicerefund'
import InvoiceTagihan from './invoicetagihan'
import InvoiceTambahan from './invoicetambahan'
import ItemKamar from './itemkamar'
import Reservasi from './reservasi'
import Kamar from './kamar'
import MasterJenisJaminan from './masterjenisjaminan'
import ReservasiKamar from './reservasikamar'
import SpesifikasiKamar from './spesifikasikamar'
import Perusahaan from './perusahaan'
import MasterJenisPembayaran from './masterjenispembayaran'
import MasterStatusPembayaran from './masterstatuspembayaran'
import MasterStatusPemesanan from './masterstatuspemesanan'
import MasterSourcePemesanan from './mastersourcepemesanan'
import ReservasiFasilitasTambahan from './reservasifasilitastambahan'
import MasterTipeTamu from './mastertipetamu'
import MasterTipeIdentitas from './mastertipeidentitas'
import MasterJenisKelamin from './masterjeniskelamin'
import MasterAgama from './masteragama'
import MasterStatusPerkawinan from './masterstatusperkawinan'
import MasterKewarganegaraan from './masterKewarganegaraan'
import MasterTipeKamar from './mastertipekamar'
import MasterTipeKasur from './mastertipekasur'
import MasterSpecialRequirement from './masterspecialrequirement'
import MasterFasilitasTambahan from './masterfasilitastambahan'
import LogHargaMasterFasilitasTambahan from './loghargamasterfasilitastambahan'
import JenisFasilitasTambahan from './jenisfasilitastambahan'
import MasterStatusKamar from './masterstatuskamar'
import MasterStatusHK from './masterstatushk'
import LogHargaDefaultSpesifikasiKamar from './loghargadefaultspesifikasikamar'
import MasterOTA from './masterota'
import SpesifikasiKamarItem from './spesifikasikamaritem'
import SpesifikasiKamarLinen from './spesifikasikamarlinen'
import SpesifikasiKamarAmenity from './spesifikasikamaramenities'
import Linen from './linen'
import LogHargaItemKamar from './loghargaitemkamar'
import MasterFungsiRuangan from './masterfungsiruangan'
import MasterTipeRuangan from './mastertiperuangan'
import MasterSetupRuangan from './mastersetupruangan'
import ItemRuangan from './itemruangan'
import Konsumsi from './konsumsi'
import LogHargaKonsumsi from './loghargakonsumsi'
import LogHargaLinen from './loghargaLinen'
import VendorLaundry from './vendorLaundry'
import MasterJenisVendorLaundry from './masterjenisvendorlaundry'
import Shift from './shift'
import LogWaktuShift from './logwaktushift'
import MasterTipePembayaran from './mastertipepembayaran'
import LogHargaEarlyLateCharge from './loghargaearlylatecharge'
import MasterStatusCheckKamar from './masterstatuscheckkamar'
import MasterSatuan from './mastersatuan'
import LogExtendKamar from './logextendkamar'
import MasterStatusTagihan from './masterstatustagihan'
import MasterTagihanKerusakanKehilangan from './mastertagihankerusakankehilangan'
import ReservasiKamarItemKamar from './reservasikamaritemkamar'
import MasterItemPembayaran from './masteritempembayaran'
import MasterItemTagihan from './masteritemtagihan'
import LogKamar from './logkamar'
import LostAndFound from './lostandfound'
import LogLostAndFound from './loglostandfound'
import LogChecker from './logchecker'
import LogAmenities from './logamenitity'
import LogLinen from './loglinen'
import LinenSupplyChain from './linensupplychain'
import LogLinenSupplyChain from './loglinensupplychain'
import MasterTipeBarang from './mastertipebarang'
import AmenitySupply from './amenitysupply'
import LogLinenLaundry from './loglinenlaundry'
import MasterPenghitungan from './masterpenghitungan'
import MasterKeterangan from './masterketerangan'
import MasterCategory from './mastercategory'
import MasterJenisInventory from './masterjenisinventory'
import LogInventory from './loginventory'
import MasterStatusLostAndFound from './masterstatuslostandfound'
import ProfileHotel from './profilehotel'
import HakAkses from './hakakses'
import RoleHakAkses from './rolehakakses'
import ReservasiKamarKamar from './reservasikamar-kamar'
import ReservasiKamarInvoiceTagihan from './reservasikamarinvoicetagihan'

const models = {
  ReservasiKamarInvoiceTagihan,
  ReservasiKamarKamar,
  RoleHakAkses,
  HakAkses,
  ProfileHotel,
  MasterStatusLostAndFound,
  LogInventory,
  MasterJenisInventory,
  MasterCategory,
  MasterKeterangan,
  MasterPenghitungan,
  LogLinenLaundry,
  AmenitySupply,
  MasterTipeBarang,
  LogLinenSupplyChain,
  LinenSupplyChain,
  LogLostAndFound,
  LogChecker,
  LogAmenities,
  LogLinen,
  LostAndFound,
  LogKamar,
  MasterItemTagihan,
  MasterItemPembayaran,
  ReservasiKamarItemKamar,
  MasterStatusTagihan,
  MasterTagihanKerusakanKehilangan,
  LogExtendKamar,
  MasterSatuan,
  MasterStatusCheckKamar,
  LogHargaEarlyLateCharge,
  MasterTipePembayaran,
  Shift,
  LogWaktuShift,
  MasterJenisVendorLaundry,
  VendorLaundry,
  LogHargaLinen,
  LogHargaKonsumsi,
  Konsumsi,
  ItemRuangan,
  MasterSetupRuangan,
  MasterTipeRuangan,
  MasterFungsiRuangan,
  SpesifikasiKamarItem,
  SpesifikasiKamarLinen,
  SpesifikasiKamarAmenity,
  Linen,
  Amenity,
  LogHargaMasterFasilitasTambahan,
  JenisFasilitasTambahan,
  MasterFasilitasTambahan,
  MasterTipeKamar,
  MasterTipeKasur,
  MasterSpecialRequirement,
  MasterTipeTamu,
  MasterTipeIdentitas,
  MasterJenisKelamin,
  MasterAgama,
  MasterStatusPerkawinan,
  MasterKewarganegaraan,
  MasterJenisPembayaran,
  MasterStatusPembayaran,
  MasterStatusPemesanan,
  MasterSourcePemesanan,
  ReservasiFasilitasTambahan,
  Role,
  User,
  UserRole,
  Promo,
  MasterTipePromo,
  ApiRoute,
  Calendar,
  City,
  ConnectingDoor,
  EarlyLateCharge,
  HargaSpesifikasiKamar,
  InformasiOrang,
  InvoicePembayaran,
  InvoiceRefund,
  InvoiceTagihan,
  InvoiceTambahan,
  ItemKamar,
  Reservasi,
  Kamar,
  MasterJenisJaminan,
  ReservasiKamar,
  SpesifikasiKamar,
  Perusahaan,
  MasterStatusKamar,
  MasterStatusHK,
  LogHargaDefaultSpesifikasiKamar,
  MasterOTA,
  LogHargaItemKamar,
}

export default models

export type MyModels = typeof models

Object.entries(models).map(([, model]) => {
  if (model?.associate) {
    model.associate(models)
  }
  return model
})
