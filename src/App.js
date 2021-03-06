import React from 'react'
import { connect } from 'react-redux'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import darkTheme from './themes/dark'
import lightTheme from './themes/light'
import chordsDefinition from './chords'
import Chords from './components/chords/chords'
import UkuChords from './components/uku-chords/ukuChords'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import SearchInput from './components/search-input/search-input'
import SearchTerm from './components/search-term/search-term'
import OutputMessage from './components/output-message/output-message'
import { populateCopiedChords, filterMajorMinorChordsOnly, sortChordsBySequence, filterChordsByChordProgression, filterChordsBySearchTerm, filterFavouriteChordsOnly, filterUkuChordsOnly, filterGuitarChordsOnly } from './filters'
import globalStyles from './globalStyles'
import WelcomeMessage from './components/welcome-message/welcome-message'
import FeedbackForm from './components/feedback-form/feedback-form'

const App = ({ selectedKeyShortName, sortBySequence, selectedChordProgressionIdx, searchTerm, majorMinorChordsOnly, favouriteChords, favouritesOnly, isDarkModeEnabled, selectedInstrumentShortName }) => {
  let chords = populateCopiedChords(chordsDefinition)
  let ukuChords
  let guitarChords

  if (majorMinorChordsOnly && !selectedKeyShortName) {
    chords = filterMajorMinorChordsOnly(chords)
  }

  if (selectedKeyShortName && sortBySequence) {
    chords = sortChordsBySequence(chords, selectedKeyShortName)
  }

  if (selectedKeyShortName && selectedChordProgressionIdx) {
    chords = filterChordsByChordProgression(chords, selectedKeyShortName, selectedChordProgressionIdx)
  }

  if (searchTerm) {
    chords = filterChordsBySearchTerm(chords, searchTerm)
  }

  if (favouritesOnly) {
    chords = filterFavouriteChordsOnly(chords, favouriteChords)
  }

  if (selectedInstrumentShortName === 'uku') {
    ukuChords = filterUkuChordsOnly(chords)
  } else if (selectedInstrumentShortName === 'gtr') {
    guitarChords = filterGuitarChordsOnly(chords)
  } else {
    ukuChords = null
    guitarChords = null
  }

  return (
    <ThemeProvider theme={isDarkModeEnabled ? darkTheme : lightTheme}>
      <Global styles={globalStyles} />
      <Header />
      <WelcomeMessage />
      <FeedbackForm />
      <SearchInput />
      <SearchTerm />
      {((ukuChords) && ukuChords.length) ? <UkuChords ukuChords={ukuChords} /> : ''}
      {(guitarChords) && guitarChords.length ? <Chords chords={guitarChords} /> : ''}
      {!((ukuChords) && ukuChords.length) ? <OutputMessage>Try some ukulele chords too!</OutputMessage> : ''}
      {!((guitarChords) && guitarChords.length) ? <OutputMessage>Try some guitar chords too!</OutputMessage> : ''}
      <Footer />
    </ThemeProvider>
  )
}

const mapStateToProps =
  ({
    keys: {
      selectedKeyShortName,
      sortBySequence,
      selectedChordProgressionIdx
    },
    chords: {
      searchTerm,
      majorMinorChordsOnly,
      favouritesOnly,
      favouriteChords
    },
    app: {
      isDarkModeEnabled
    },
    instruments: {
      selectedInstrumentShortName
    }
  }) =>
  ({
    selectedKeyShortName,
    sortBySequence,
    selectedChordProgressionIdx,
    searchTerm,
    majorMinorChordsOnly,
    favouriteChords,
    favouritesOnly,
    isDarkModeEnabled,
    selectedInstrumentShortName
  })

export default connect(mapStateToProps)(App)
