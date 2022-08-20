import * as _ from 'lodash'
import moment from 'moment'

export class JukeboxService {
  constructor (private tracks: any[]) {
  }

  firstTrack () {
    return _.first(this.tracks)
  }

  isIsoDateToday (isoDateStringValue: string) {
    const today = moment().startOf('day')
    const dateValue = moment(isoDateStringValue)
    return today.isSame(dateValue, 'd')
  }
}
