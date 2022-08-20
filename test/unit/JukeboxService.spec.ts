import { ok, strictEqual } from 'assert'
import { JukeboxService } from '../../src/services/JukeboxService'

describe('jukebox service', () => {
  it('should get the first track', () => {
    const service = new JukeboxService([ 1, 2, 3, 4, 5 ])
    const first = service.firstTrack()
    strictEqual(first, 1)
  })

  it.skip('should check if iso date is today', () => {
    const service = new JukeboxService([ 1, 2, 3, 4, 5 ])
    const dateIsoValue = new Date('03/28/2020').toISOString()
    const result = service.isIsoDateToday(dateIsoValue)
    ok(result)
  })
})
