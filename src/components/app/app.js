import React, {Component, Fragment} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../error';
import './app.css';
import CharacterPage from '../page/characterPage';
import GotService from '../../services/gotService';
import BookPage from '../page/bookPage';
import HousePage from '../page/housePage';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import BooksItem from '../page/booksItem';
import HouseItem from '../page/houseItem';

export default class App extends Component {
  _gotService = new GotService();
  state = {
    showRandomChar: true,
    error: false
  }
  toggleRandomChar = () => {
    this.setState((state) => {
      return {
        showRandomChar: !state.showRandomChar
      }
    });
  }

  componentDidCatch() {
    this.setState(({error: true}))
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage/>
    }
    const char = this.state.showRandomChar
      ? <RandomChar/>
      : null;
    return (
      <Router>
        <Fragment>
          <Container>
            <Header/>
          </Container>
          <Container>
            <Row>
              <Col lg={{
                size: 5,
                offset: 0
              }}>
                {char}
                <button className="toggle-btn" onClick={this.toggleRandomChar}>Toggle random character</button>
              </Col>
            </Row>
            <Route path='/characters' exact component={CharacterPage}/>
            <Route path='/books' exact component={BookPage}/>
            <Route path='/houses' exact component={HousePage}/>
            <Route path='/books/:id' render={
              ({match})=> {
                const {id} = match.params;
                return <BooksItem booksId={id}/>
              }
            }/>
            <Route path='/houses/:id' render={
              ({match})=> {
                const {id} = match.params;
                return <HouseItem houseId={id}/>
              }
            }/>
          </Container>
        </Fragment>
      </Router>
    );
  }
};