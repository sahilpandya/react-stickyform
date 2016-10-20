import React, {PropTypes, Component} from 'react';
import ReactDom from 'react-dom';

var count = 0;
export default class Sticky extends Component {
  constructor(props){
    super(props)
    this.createNewCard = this.createNewCard.bind(this);
    this.state = {
      cardArray: []
    }
    this.tempArray = [];
  }

  componentWillMount() {
    console.log(localStorage.length);
    var totalSticky = localStorage.length;
    var message
    var self = this
    for(var i=0;i<totalSticky;i++) {
      var currentMessage = localStorage.getItem('message'+(i+1));
      console.log(currentMessage);
      self.tempArray.push(<StickyCard count={i+1} message={currentMessage}/>);
      self.setState({
        'cardArray': self.tempArray
      })
    }
  }
  createNewCard(e) {
    e.preventDefault();
    console.log(e);
    count++;
    this.tempArray.push(<StickyCard count = {count}/>)
    this.setState({
      cardArray: this.tempArray
    })
  }
  render() {
    return(
      <div className="sticky-section">
        <a href="#" onClick={this.createNewCard} className="add-sticky">Add Sticky</a>
        <div className="sticky-area" ref="stickyArea">
          {this.state.cardArray}
        </div>
      </div>
    )
  }
}

class StickyCard extends Component{
  constructor(props) {
    super(props)
    this.hideSticky = this.hideSticky.bind(this);
    this.saveData = this.saveData.bind(this);
  }
  hideSticky(e) {
    e.preventDefault();
    this.refs['stickycard'+this.props.count].style.display = 'none';
  }
  saveData(e) {
    var message = this.refs['detail'+this.props.count].value;
    console.log(message);
    localStorage.setItem('message'+this.props.count, message);
  }
  render() {
    const cardStyle = {
      'width': '200px',
      'background': '#ccc',
      'padding': '20px',
      'margin':'20px'
    }
    const hideBtnStyle = {
      'textAlign':'right',
      'fontSize':'22px',
      'display':'block'
    }
    var currentNum = this.props.count;
    console.log(this.props.message);
    return(
      <div className="sticky-card" style={cardStyle} ref={'stickycard'+currentNum}>
        <a href="#" className="close-bnt" onClick={this.hideSticky} style={hideBtnStyle}>X</a>
        <form className="sticky-form">
          <div>
          {this.props.message ?
          <textarea name="detail" ref={'detail'+currentNum} row="5" value={this.props.message}></textarea>
          :
          <textarea name="detail" ref={'detail'+currentNum} row="5"></textarea>
          }
          </div>
          <button type="button" onClick={this.saveData}>Save</button>
        </form>
      </div>
    )
  }
}



ReactDom.render(<Sticky/>, document.getElementById('root'));
