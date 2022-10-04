import CheckAvailable from '../CheckAvailable'
import data from './data'

describe('test untuk check available', () => {
  test('jika ada kamar yang direservasi kurang 1', () => {
    const sut = new CheckAvailable()
    const result = sut.check(
      new Date('2020-12-23 12:00'),
      new Date('2020-12-27 12:00'),
      data.data,
      '6da592d6-4de8-43a5-a45a-49039612857d'
    )
    expect(result).toEqual(5)
  })
})
