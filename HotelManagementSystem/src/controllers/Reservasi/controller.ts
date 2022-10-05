/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization, { AuthorizationFO } from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import multer from 'modules/ConfigMulter'
import EmailProvider from 'config/email'
import { MulterError } from 'multer'
import models from 'models'
import ReservasiService from './service'
import PerusahaanService from './service.perusahaan'
import PeroranganService from './service.perorangan'

const sendMail = new EmailProvider().send

const uploadFile = multer.fields([
  { name: 'fileIdentitas', maxCount: 1 },
  { name: 'fileBuktiMenikah', maxCount: 1 },
])
function upload(req: Request, res: Response, next: NextFunction) {
  uploadFile(req, res, function (err: any) {
    if (err instanceof MulterError) {
      return res
        .status(400)
        .json({ message: 'Mohon Upload File Yang Kurang Dari 2mb' })
    }

    next()
  })
}
const setFileToBody = asyncHandler(async function setFileToBody(
  req: Request,
  res,
  next: NextFunction
) {
  const objFile = req.pickSingleFieldMulter([
    'fileIdentitas',
    'fileBuktiMenikah',
  ])
  req.setBody(objFile)
  next()
})
interface IEmailSend {
  email: string
}

routes.post(
  '/reservasi/perorangan',
  upload,
  setFileToBody,
  Authorization,
  asyncHandler(async function perorangan(req: Request, res: Response) {
    const transaction = await req.getTransaction()
    const formData = req.getBody()
    formData.dataString = JSON.parse(formData.dataString)
    console.log(formData.dataString)
    const data = await PeroranganService.createReservasi(formData, transaction)
    await transaction.commit()
    const buildResponse = BuildResponse.created({ data })
    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/reservasi/corporate',
  upload,
  setFileToBody,
  asyncHandler(async function corporate(req: Request, res: Response) {
    const formData = req.getBody()
    formData.dataString = JSON.parse(formData.dataString)
    const transaction = await req.getTransaction()
    const data = await PerusahaanService.createReservasi(formData, transaction)
    await transaction.commit()
    const buildResponse = BuildResponse.created({ data })
    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/check-in/:reservasiId',
  Authorization,
  asyncHandler(async function checkIn(req: Request, res: Response) {
    const { reservasiId } = req.getParams()
    const formData = req.getBody()
    const transaction = await req.getTransaction()
    const data = await ReservasiService.checkIn(
      reservasiId,
      formData,
      transaction
    )
    await transaction.commit()
    const buildResponse = BuildResponse.created({ data })
    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/batal-reservasi/:id',
  Authorization,
  asyncHandler(async function cancelReservation(req: Request, res: Response) {
    const formData = req.getBody()
    const { id } = req.getParams()
    const transaction = await req.getTransaction()
    const data = await ReservasiService.cancelReservasi(
      id,
      formData,
      transaction
    )
    await transaction.commit()
    const buildResponse = BuildResponse.updated({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/selesai-invoice/:id',
  Authorization,
  asyncHandler(async function cancelReservation(req: Request, res: Response) {
    const { id } = req.getParams()
    const data = await ReservasiService.selesaiInvoice(id)
    const buildResponse = BuildResponse.updated({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/send-email/:id',
  Authorization,
  asyncHandler(async function cancelReservation(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData: IEmailSend = req.getBody()
    const data = await ReservasiService.sendEmail(id)
    const buildResponse = BuildResponse.updated({
      message: `Terkirim ke ${formData.email}`,
    })
    const profileHotel = await models.ProfileHotel.findOne()
    const nameFile = data.data.nomorInvoice.split('/').join('_')

    const emailContext = `Hi, ${data.reservasi.InformasiOrang?.nama},
    <br />
    <br />
      Terima kasih kepercayaan Anda terhadap kami.
    <br />
    <br />
      Tagihan Anda dengan jumlah Rp. ${data.data.total} terlampir pada email ini.
      <br /> 
      Jika ada pertanyaan mengenai tagihan Anda atau Anda sudah membayar tagihan ini, 
      silahkan hubungi kami di nomor ${profileHotel?.nomorTelepon}.
      <br />
      <br />
      Terima kasih.`
    sendMail(
      [formData.email],
      `Invoice ${data.reservasi.nomorInvoice} dari Nusa Hotel`,
      emailContext,
      {
        fileName: `${data.data.namaPemesan}_${nameFile}.pdf`,
        pathToPdf: `${data.data.path}`,
      }
    )
    return res.status(200).json(buildResponse)
  })
)
