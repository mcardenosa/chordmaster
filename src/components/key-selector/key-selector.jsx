import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Dropdown, { DropDownOption } from '../dropdown/dropdown'
import ToggleInput from '../toggle-input/toggle-input'
import { selectKey, toggleSortBySequence } from '../../ducks/keys/actions'
import keyDefinition from '../../keys'

export const KeySelector = ({ selectedKeyShortName, selectKey, toggleSortBySequence, sortBySequence }) => (
  <React.Fragment>
    <span>Key: </span>
    <Dropdown onChange={event => selectKey(event.target.value)} value={selectedKeyShortName}>
      <DropDownOption value="" label="(none)" />
      {keyDefinition.map(({ shortName }) => <DropDownOption key={shortName} value={shortName} label={shortName} />)}
    </Dropdown>
    {selectedKeyShortName && <br />}
    {selectedKeyShortName && <ToggleInput onChange={() => toggleSortBySequence()} isEnabled={sortBySequence} label="Filter" />}
  </React.Fragment>
)

const mapStateToProps = ({ keys: { selectedKeyShortName, sortBySequence } }) => ({
  selectedKeyShortName,
  sortBySequence
})

const mapDispatchToProps = dispatch => bindActionCreators({ selectKey, toggleSortBySequence }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(KeySelector)
