import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => { // value is a value placeholder at the moment - see how data comes it to customize it
    const val = event.target.value 
    this.setState({
          filters: {...this.state.filters, type: val}
      })
  }

 onFindPetsClick = () => {
     console.log("Find Pets Clicked")
     let endpoint = "/api/pets"
     if (this.state.filters.type !== 'all') {
        endpoint += `?type=${this.state.filters.type}` 
     }
     fetch(endpoint)
        .then(res => res.json())
        .then(pets => this.setState({pets: pets}))
 }

 onAdoptPet = (petID) => {
     
    const pets = this.state.pets.map(pet => {
        return (pet.id === petID) ? {...pet, isAdopted: true} : pet
        })
    this.setState({ pets: pets})
    
 }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                pets={this.state.pets}
                onAdoptPet={this.onAdoptPet}
               />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
