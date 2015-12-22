var React = require('react');

var FormItemMixIn = {
  addSelectedFlag(arr) {
    if (Array.isArray(arr)) {
      arr.forEach((currentValue, index) => {
        currentValue['checked'] = false;
      });
    }
  },
  toggle(itemToToggle) {
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
  toggleAll(checked) {
    var field = this.getMixinAttr();
    var data = this.state[field].map((currentValue, index) => {
      currentValue['checked'] = checked;
      return currentValue;
    });
    //this.setState({users: data});
    this.setMixState(data);
  },
  checkAll(e) {
    e.preventDefault();
    this.toggleAll(true);
  },
  checkNone(e) {
    e.preventDefault();
    this.toggleAll(false);
  },
  checkXAll(e) {
    e.preventDefault();
    this.toggleXAll();
  },
  toggleXAll() {
    var field = this.getMixinAttr();
    var data = this.state[field].map((currentValue, index) => {
      currentValue['checked'] = !currentValue['checked'];
      return currentValue;
    });
    //this.setState({users: data});
    this.setMixState(data);
  },
  getCheckedItems() {
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