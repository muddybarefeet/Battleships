var React = require('react');

var appStore = require('./../stores/appStore.js');
var appActions = require('./../actions/appActions.js');

var Boats = React.createClass({
  
  getInitialState: function () {
    return {
      boats: appStore.getBoatData()
    };
  },

  componentDidMount: function () {
    appStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    appStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
  //set the new state of the component when triggered by the event listener in the store
    //on choosing a board size and changing the level then the board can be rendered to the page
    this.setState({
      board: appStore.getBoardData()
    });

    this.setState({
      boats: appStore.getBoatData()
    });

  },
  
  render: function () {

      var scores = [];

      if (this.state.boats) {
        for (var key in this.state.boats) {
          var values = this.state.boats[key];
          if (this.state.boats[key][0] === this.state.boats[key][1]) {
            scores.push(9);
          } else {
            scores.push(((values[0]/values[1])*100));
          }
        }
      }

      return (
     
      <div>
        <div>
        {/*here display the boats and a count of how many hits left to take*/}

        <h4 className="titleCase">Boat hits</h4>
        <h6>Total hits so far:{}</h6>
        <h6>Hits left to find:{}</h6>

        <div style={{opacity: '0.'+ scores[0] }} className="boatBox"></div>
        <div style={{opacity: '0.'+ scores[1] }} className="boatBox"></div>
        <div style={{opacity: '0.'+ scores[2] }} className="boatBox"></div>
        <div style={{opacity: '0.'+ scores[3] }} className="boatBox"></div>
        <div style={{opacity: '0.'+ scores[4] }} className="boatBox"></div>

        </div>
      </div>

      );
  }
});

module.exports = Boats;


