let React = require('react');

let FormItemMixIn = {
  addSelectedFlag(arr) {
    if (Array.isArray(arr)) {
      arr.forEach((currentValue, index) => {
        currentValue['checked'] = false;
      });
    }
  },
  toggle(itemToToggle) {
    let field = this.getMixinAttr();
    let data = this.state[field].map((currentValue, index) => {
      if (currentValue === itemToToggle) {
        currentValue['checked'] = !currentValue['checked'];
      }
      return currentValue;
    });
    //console.log('data:', this.state[field]);
    this.setMixState(data);
  },
  toggleAll(checked) {
    let field = this.getMixinAttr();
    let data = this.state[field].map((currentValue, index) => {
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
    let field = this.getMixinAttr();
    let data = this.state[field].map((currentValue, index) => {
      currentValue['checked'] = !currentValue['checked'];
      return currentValue;
    });
    //this.setState({users: data});
    this.setMixState(data);
  },
  getCheckedItems() {
    let arr = [];
    let key = this.getItemKey();
    let field = this.getMixinAttr();
    this.state[field].forEach((currentValue, index) => {
      if (currentValue.checked) {
        arr.push(currentValue[key]);
      }
    });
    return arr;
  }
};

module.exports = FormItemMixIn;