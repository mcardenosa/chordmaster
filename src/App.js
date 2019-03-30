import React from 'react'
import { connect } from 'react-redux'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import darkTheme from './themes/dark'
import lightTheme from './themes/light'
import chordsDefinition from './chords'
import Chords from './components/chords/chords'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import SearchInput from './components/search-input/search-input'
import SearchTerm from './components/search-term/search-term'
import OutputMessage from './components/output-message/output-message'
import OutputBar from './components/output-bar/output-bar'
import { populateCopiedChords, filterMajorMinorChordsOnly, sortChordsBySequence, filterChordsByChordProgression, filterChordsBySearchTerm, filterFavouriteChordsOnly } from './filters'
import globalStyles from './globalStyles'
import settings from './settings'

const App = ({ selectedKeyShortName, sortBySequence, selectedChordProgressionIdx, searchTerm, majorMinorChordsOnly, favouriteChords, favouritesOnly, isDarkModeEnabled }) => {
  let chords = populateCopiedChords(chordsDefinition)

  if (majorMinorChordsOnly) {
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

  return (
    <ThemeProvider theme={isDarkModeEnabled ? darkTheme : lightTheme}>
      <Global styles={globalStyles} />
      <Header />
      <OutputBar>
        Welcome to the ChordMaster app. Not all chords and keys are available so if you want more, please <a href={settings.githubRepoUrl}>submit a PR or open an issue</a>. Thank you
      </OutputBar>
      <SearchInput />
      <SearchTerm />
      {chords.length ? <Chords chords={chords} /> : <OutputMessage>No chords found</OutputMessage>}
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
    isDarkModeEnabled
  })

export default connect(mapStateToProps)(App)
