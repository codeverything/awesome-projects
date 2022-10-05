import { NextFunction, Request, Response } from 'express'

import model from 'models'

const { LogLinenLaundry, Linen, VendorLaundry } = model

const validateData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.getParams()
  const data = await LogLinenLaundry.findByPk(id, {
    include: [
      {
        model: Linen,
      },
      {
        model: VendorLaundry,
      },
    ],
  })
  if (!data)
    res.status(404).json({
      code: 404,
      message: 'Data Not Found',
    })
  req.setState({
    data,
  })
  next()
}
export default { validateData }
