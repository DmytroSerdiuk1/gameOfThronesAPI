import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemsDetails, {Field} from '../charDetails';
import ErrorMessage from '../error';
import PageRow from '../row';
import GotService from '../../services/gotService'

export default class CharacterPage extends Component {
  _gotService = new GotService();
  state = {
    selectedItems: 130,
    error: false
  }

  onItemSelected = (id) => {
    this.setState({selectedItems: id})
  }

  componentDidCatch() {
    this.setState({error: true})
  }

  

  render() {

    if (this.state.error) {
      return <ErrorMessage/>
    }

    const renderItemList = () => {
      return (
        <ItemList 
          onCharSelected = {this.onItemSelected}
          setData = {this._gotService.getAllCharacters} />
      )
    }

    const renderItemsDetails = () => {
      return (
        < ItemsDetails itemsId={this.state.selectedItems} dataItem={this._gotService.getCharacter}>
          <Field label="Gender" field="gender"/>
          <Field label="Born" field="born"/>
          <Field label="Died" field="died"/>
          <Field label="Culture" field="culture"/>
        </ ItemsDetails>
      )
    }

    return (
      <PageRow
        left={renderItemList()}
        right={renderItemsDetails()}/>
    )
  }
}