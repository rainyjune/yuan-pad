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
    var data = this.state.users;
    data.forEach(function(currentValue, index){
      currentValue['checked'] = checked;
    }, this);
  },
  toggleXAll: function() {
    var data = this.state.users;
    data.forEach(function(currentValue, index){
      currentValue['checked'] = !currentValue['checked'];
    }, this);
  }
};

module.exports = FormItemMixIn;