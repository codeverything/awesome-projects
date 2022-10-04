import models from 'models'

const { Kamar, LogLostAndFound, MasterStatusLostAndFound } = models

export const getAll = [
  {
    model: Kamar,
  },
  {
    model: LogLostAndFound,
  },
  {
    model: MasterStatusLostAndFound,
  },
]
