export interface IGetHeaderAkses {
  headerId: string
  headerAksesId: string
}

export interface IGetSubAkses extends IGetHeaderAkses {
  subAksesId: string
}

export interface IGetHeaderRoute {
  headerId: string
  headerRouteId: string
}

export interface IGetSubRoute extends IGetHeaderRoute {
  subRouteId: string
}

export interface IListAkses {
  id: string
  path: string
  nama: string
  checked: boolean
  listRoute: any
}
