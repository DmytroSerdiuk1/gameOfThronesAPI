import ItemsDetails, {Field} from '../charDetails'
import React, {Component} from 'react';
import GotService from '../../services/gotService'

export default class BooksItem extends Component {
  _gotService = new GotService();
  state = {
    error: false
  }
  render() {
    return (
        <ItemsDetails itemsId = {this.props.booksId}
            dataItem = {this._gotService.getBook}> 
            <Field label="Number of pages" field="numberOfPages"/> 
            <Field label = "Publisher" field = "publisher" /> 
            <Field label="Released" field="released"/> 
        </ItemsDetails>
        )
    }
}