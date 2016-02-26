var React = require('react');

var appStore = require('./../stores/appStore.js');
var appActions = require('./../actions/appActions.js');

var Boats = React.createClass({
  
  getInitialState: function () {
    appStore.getBoatData();
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

  },
  
  render: function () {

      

      return (
     
      <div>
        <div>
        {/*here display the boats and a count of how many hits left to take*/}

        <h4>Boat hits</h4>
        <h6>Total hits so far:{}</h6>
        <h6>Hits left to find:{}</h6>


        <div className="boatBox"></div><span>{}hits left to make</span>
        <div className="boatBox"></div><span>{}hits left to make</span>
        <div className="boatBox"></div><span>{}hits left to make</span>
        <div className="boatBox"></div><span>{}hits left to make</span>
        <div className="boatBox"></div><span>{}hits left to make</span>

        </div>
      </div>

      );
  }
});

module.exports = Boats;


