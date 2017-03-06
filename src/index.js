import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      currentEntry:"",
      edit: null,
      searchBackup: [],
      counter: 0
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
      const current = entries.findIndex((e) => {
        return e.id === this.state.edit
      })
      
      entries[current].val = this.state.currentEntry
       
       this.setState({
         entries,
         currentEntry:"",
         edit: null
       })
      
    } else {
      const entry = {
        id: this.state.counter + 1,
        val: this.state.currentEntry
      }
      this.setState({
          entries: [...this.state.entries, entry],
          currentEntry: "",
          counter: this.state.counter + 1
      })
    }
  }
  deleteEntry = (event) => {
    let entries = [...this.state.entries]
    const index = entries.findIndex(e => e.id == event.target.value)
    entries.splice(index, 1);
    this.setState({
      entries
    })
  }
  modifyEntry = (id, e) => {
    this.setState({
      currentEntry: e.target.textContent,
      edit: id
    })
  }
  filterEntries = () => {
    if(this.state.searchBackup.length === 0) {
      this.setState({
        searchBackup: [...this.state.entries],
        entries: [...this.state.entries].filter((e) => e.val.startsWith(this.state.currentEntry))
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
    {entries.map((entry) => <div key={entry.id}><Entry entry={entry} modifyEntry={modifyEntry}/><button value={entry.id} onClick={deleteEntry} >Delete</button></div>)}
  </div>
}

function Entry({entry, modifyEntry}) {
  return <div>
    Eintrag: <p onClick={modifyEntry.bind(undefined,entry.id)}>{entry.val}</p>
  </div>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
