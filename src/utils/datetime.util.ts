import { DateTime } from 'luxon'

export default {
  toRelativeCalendar (datetime: string) {
    return DateTime.fromISO(datetime).toRelativeCalendar()
  }
}
