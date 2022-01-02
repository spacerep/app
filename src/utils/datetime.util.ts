import { DateTime } from 'luxon'

export default {
  toRelativeCalendar (datetime: string) {
    return DateTime.fromISO(datetime).toRelativeCalendar()
  },

  nextRepetitionAt (currentRepetition: number) {
    const repetitionIncrements = [0, 6, 23, 60, 270]
    const repInc = repetitionIncrements[currentRepetition]
    const days = repInc === 0 ? repInc : repInc || 270
    return DateTime.now().plus({ days }).toString()
  }
}
