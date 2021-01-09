import React, {Component} from 'react';
import './charDetails.css';
import gotService from '../../services/gotService';
import ErrorMessage from '../error';
import Spinner from '../spinner';

const Field = ({items, field, label}) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{items[field]}</span>
    </li>
  )
}

export {Field};;

export default class ItemsDetails extends Component {

  _gotService = new gotService();

  state = {
    items: null,
    loading: true,
    error: false
  }

  componentDidMount() {
    this.updateChar();
    
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemsId !== prevProps.itemsId) {
      this.updateChar();
    }
  }

  onCharDetailsLoaded = (items) => {
    this.setState({items, loading: false})
  }

  updateChar() {
    const {itemsId, dataItem} = this.props;
    if (!itemsId) {
      return;
    }

    this.setState({loading: true})

    dataItem(itemsId)
      .then(this.onCharDetailsLoaded)
      .catch(() => this.onError())
  }

  onError() {
    this.setState({items: null, error: true})
  }

  render() {

    if (!this.state.items && this.state.error) {
      return <ErrorMessage/>
    } else if (!this.state.items) {
      return <span className="select-error">Please select a character</span>
    }

    const {items} = this.state;
    const {name} = items;

    
    if (this.state.loading) {
      return (
        <div className="char-details rounded">
          <Spinner/>
        </div>
      )
    }

    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React
            .Children
            .map(this.props.children, (child) => {
              return React.cloneElement(child, {items})
            })}
        </ul>
      </div>
    );
  }
}