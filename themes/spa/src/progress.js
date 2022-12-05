let React = require('react'),
    Modal = require('react-modal');
const createReactClass = require('create-react-class');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


let Progress = createReactClass({
  render() {
    return (
      <Modal isOpen={this.props.loadingModalIsOpen} style={customStyles} >
        <progress></progress>
      </Modal>
    );
  }
});

module.exports = Progress;