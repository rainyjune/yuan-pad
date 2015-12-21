var React = require('react');

var FormItemMixIn = {
  addSelectedFlag: function(arr) {
    if (Array.isArray(arr)) {
      arr.forEach((currentValue, index) => {
        currentValue['checked'] = false;
      });
    }
  },
  toggle: function(itemToToggle) {
    var field = this.getMixinAttr();
    var data = this.state[field].map((currentValue, index) => {
      if (currentValue === itemToToggle) {
        currentValue['checked'] = !currentValue['checked'];
      }
      return currentValue;
    });
    //console.log('data:', this.state[field]);
    this.setMixState(data);
  },
  toggleAll: function(checked) {
    var field = this.getMixinAttr();
    var data = this.state[field].map((currentValue, index) => {
      currentValue['checked'] = checked;
      return currentValue;
    });
    //this.setState({users: data});
    this.setMixState(data);
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
    var field = this.getMixinAttr();
    var data = this.state[field].map((currentValue, index) => {
      currentValue['checked'] = !currentValue['checked'];
      return currentValue;
    });
    //this.setState({users: data});
    this.setMixState(data);
  },
  getCheckedItems: function() {
    var arr = [];
    var key = this.getItemKey();
    var field = this.getMixinAttr();
    this.state[field].forEach((currentValue, index) => {
      if (currentValue.checked) {
        arr.push(currentValue[key]);
      }
    });
    return arr;
  }
};

module.exports = FormItemMixIn;