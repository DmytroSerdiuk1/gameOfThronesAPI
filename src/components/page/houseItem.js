import ItemsDetails, {Field} from '../charDetails'
import React, {Component} from 'react';
import GotService from '../../services/gotService'

export default class HouseItem extends Component {
  _gotService = new GotService();
  state = {
    error: false
  }
  render() {
    return (
        < ItemsDetails itemsId={this.props.houseId} dataItem={this._gotService.getHouse}>
          <Field label="Region" field="region"/>
          <Field label="Words" field="words"/>
          <Field label="Titles" field="titles"/>
          <Field label="AncestralWeapons" field="ancestralWeapons"/>
        </ ItemsDetails>
        )
    }
}