import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      currentEntry:"",
      edit: null,
      searchBackup: []
    }
  }
  updateCurrentEntry = (e) => {
    this.setState({
      currentEntry: e.target.value
    })
  }
  addUpdateEntries = () => {
    if (this.state.edit != null) {
      const entries = [...this.state.entries]
          entries[this.state.edit] = this.state.currentEntry
       
       this.setState({
         entries,
         currentEntry:"",
         edit: null
       })
      
    } else {
      this.setState({
          entries: [...this.state.entries, this.state.currentEntry],
          currentEntry: ""
      })
    }
  }
  deleteEntry = (e) => {
    let entries = [...this.state.entries]
    const index = entries.indexOf(e.target.value)
    entries.splice(index, 1);
    this.setState({
      entries
    })
  }
  modifyEntry = (idx, e) => {
    this.setState({
      currentEntry: e.target.textContent,
      edit: idx
    })
  }
  filterEntries = () => {
    if(this.state.searchBackup.length === 0) {
      this.setState({
        searchBackup: [...this.state.entries],
        entries: [...this.state.entries].filter((e) => e.startsWith(this.state.currentEntry))
      })
    } else {
      this.setState({
        entries: [...this.state.searchBackup],
        searchBackup: []
      })
    }
    
  }
  render() {
    return <div>
      <Input onChange={this.updateCurrentEntry} value={this.state.currentEntry} /><Button onClick={this.addUpdateEntries} edit={this.state.edit}/> <button onClick={this.filterEntries}>Search</button>
      <EntryList entries={this.state.entries} deleteEntry={this.deleteEntry} modifyEntry={this.modifyEntry} search={this.state.search && this.state.currentEntry }/>
    </div>
  }
}

function Input({onChange, value}) {
  return <div>
    <input type="text" value={value} onChange={onChange}/>
  </div>
}

function Button({onClick, edit}) {
  if(edit != null) {
    return <div>
      <button onClick={onClick}>Update</button>
    </div>  
  }
  
  return <div>
    <button onClick={onClick}>Add</button>
  </div>
}

function EntryList({entries, deleteEntry, modifyEntry}) {
  return <div>
    {entries.map((entry, idx) => <div key={idx}><Entry idx={idx} entry={entry} modifyEntry={modifyEntry}/><button value={idx} onClick={deleteEntry} >Delete</button></div>)}
  </div>
}

function Entry({entry, modifyEntry, idx}) {
  return <div>
    Eintrag: <p onClick={modifyEntry.bind(undefined,idx)}>{entry}</p>
  </div>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
