const I = 'I'
const II = 'II'
const III = 'III'
const IV = 'IV'
const V = 'V'
const VI = 'VI'

const i = 'i'
const ii = 'ii'
const iii = 'iii'
const iv = 'iv'
const v = 'v'
const vi = 'vi'
const vii = 'vii'

export const keys = [
  {
    fullName: 'Key of A major',
    shortName: 'A',
    chords: {
      [I]: 'A', 
      [ii]: 'B',
      [iii]: 'C#',
      [IV]: 'D',
      [V]: 'E',
      [vi]: 'F#',
      [vii]: 'G#'
    },
    chordProgressions: [
      [I, IV, V],
      [I, vi, IV, V],
      [ii, V, I]
    ]
  },
  {
    fullName: 'Key of B major',
    shortName: 'B',
    chords: {
      [I]: 'B',
      [ii]: 'C#m',
      [iii]: 'D#m',
      [IV]: 'E',
      [V]: 'F#',
      [vi]: 'G#m',
      [vii]: 'A#'
    },
    chordProgressions: [
      [I, IV, V],
      [I, vi, IV, V],
      [ii, V, I]
    ]
  }
]

export default keys