var React = require('react');

var FormItemMixIn = {
  addSelectedFlag: function(arr) {
    if (Array.isArray(arr)) {
      arr.forEach(function(currentValue, index){
        currentValue['checked'] = false;
      }, this);
    }
  },
  toggle: function(itemToToggle) {
    var data = this.state.users;
    for (var i = 0, len = data.length; i < len; i++) {
      var currentValue = data[i];
      if (currentValue === itemToToggle) {
        currentValue['checked'] = !currentValue['checked'];
        break;
      }
    }
    console.log('data:', this.state.users);
  },
  toggleAll: function(checked) {
    var data = this.state.users.map(function(currentValue, index){
      currentValue['checked'] = checked;
      return currentValue;
    }, this);
    this.setState({users: data});
  },
  checkAll: function(e) {
    e.preventDefault();
    this.toggleAll(true);
  },
  checkNone: function(e) {
    e.preventDefault();
    this.toggleAll(false);
  },
  checkXAll: function(e) {
    e.preventDefault();
    this.toggleXAll();
  },
  toggleXAll: function() {
    var data = this.state.users.map(function(currentValue, index){
      currentValue['checked'] = !currentValue['checked'];
      return currentValue;
    }, this);
    this.setState({users: data});
  },
  getCheckedItems: function() {
    var arr = [];
    this.state.users.forEach(function(currentValue, index) {
      if (currentValue.checked) {
        arr.push(currentValue.uid);
      }
    });
    return arr;
  }
};

module.exports = FormItemMixIn;