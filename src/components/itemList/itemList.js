import React, {Component} from 'react';
import GotService from '../../services/gotService';
import ErrorMessage from '../error';
import Spinner from '../spinner';
import './itemList.css';
import {ListGroup, ListGroupItem} from 'reactstrap';

export default class ItemList extends Component {
  _gotService = new GotService();

  state = {
    listItem: null,
    loaded: true,
    error: false
  }

  componentDidMount() {
    this.getResource()
  }

  getResource = () => {
    const { setData } = this.props;
    setData().then(listItem => {
      this.setState({listItem, loaded: false})
    }).catch(() => {
      this.setState({loaded: false, error: true})
    })
  }

  renderItem = (arr) => {
    return arr.map(({name, id}) => {
      return (
        <ListGroupItem key={id} onClick={() => this.props.onCharSelected(id)}>{name}</ListGroupItem>
      )
    })
  }

  render() {
    const {loaded, error, listItem} = this.state

    const isLoaded = loaded
      ? <Spinner/>
      : null;
    const isError = error
      ? <ErrorMessage/>
      : null;
    const item = listItem
      ? this.renderItem(listItem)
      : null;

    return (
      <ListGroup>
        {isLoaded}
        {isError}
        {item}
      </ListGroup>
    )
  }
}