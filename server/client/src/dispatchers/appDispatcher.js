var Dispatcher = require('flux').Dispatcher;

var appDispatcher = Object.assign(new Dispatcher(), {

   /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be handleServerAction.
   * @param  {object} action The data coming from the view.
   */

   //standardized the object passed to the store
   //tells us/store where the action originated e.g.user/server

   handleClientAction: function (action) {
    this.dispatch({
      source: 'CLIENT_ACTION',
      action: action
    });
   }

});

module.exports = appDispatcher;
