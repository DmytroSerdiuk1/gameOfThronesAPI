import React, {Component} from 'react';
import ItemList from '../itemList';
import GotService from '../../services/gotService'
import {withRouter} from 'react-router-dom'

class BookPage extends Component {
  _gotService = new GotService();
  state = {
    selectedItems: 10,
    error: false
  }

  componentDidCatch() {
    this.setState({error: true})
  }

  render() {
    return (
        <ItemList 
          onCharSelected = {(itemId)=>{
            this.props.history.push(`${itemId}`)
          }}
          setData = {this._gotService.getAllBooks} />
    )
  }
}

export default withRouter(BookPage)