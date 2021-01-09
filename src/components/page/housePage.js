import React, {Component} from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../error';
import GotService from '../../services/gotService'
import {withRouter} from 'react-router-dom'

class HousePage extends Component {
  _gotService = new GotService();
  state = {
    selectedItems: 130,
    error: false
  }

  componentDidCatch() {
    this.setState({error: true})
  }

  

  render() {

    if (this.state.error) {
      return <ErrorMessage/>
    }
    return (
      <ItemList 
        onCharSelected = {(houseId) => {
          this.props.history.push(`${houseId}`)
        }}
        setData = {this._gotService.getAllHouses} />
    )
  }
}

export default withRouter(HousePage)