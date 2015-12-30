let React = require('react'),
    dataProvider = require('./dataProvider.js');

let ACPTabHeader = React.createClass({
  getInitialState() {
    return {
      menuIsOpen: false
    };
  },
  updateActiveTab(e) {
    e.preventDefault();
    let tabLink = e.target;
    let newTabName = tabLink.getAttribute('data-tabname');
    if (newTabName === this.props.activeTab) {
      return false;
    }
    this.props.onTabSelected(newTabName);
    this.setState({menuIsOpen: false});
  },
  handleSignOut(e) {
    e.preventDefault();
    dataProvider.signOut(response => {
      if (response.statusCode === 200) {
        this.props.onUserLogout();
      } else {
        alert(response.statusText);
      }
    });
  },
  toggleMenu: function() {
    this.setState({menuIsOpen: !this.state.menuIsOpen});
  },
  render() {
    if (this.props.user.user_type !== "admin") return null;
    let activeTab = this.props.activeTab;
    let items = this.props.tabs.map(tab => {
      return (
        <li key={tab.value} role="presentation" className={tab.value === activeTab ? "active" : ""}>
          <a href="#" data-tabname={tab.value} onClick={this.updateActiveTab}>{tab.text}</a>
        </li>
      );
    });
    return (
      <div className="">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button onClick={this.toggleMenu} type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="btn btn-default navbar-btn homeButton" href="index.php">{this.props.lang.HOME}</a>&nbsp;
              <a className="btn btn-default navbar-btn signOutButton" href="#" onClick={this.handleSignOut}>{this.props.lang.LOGOUT}</a>
            </div>
        
            {/* Collect the nav links, forms, and other content for toggling */}
            <div className={this.state.menuIsOpen ? "navbar-collapse collapse in" : "collapse navbar-collapse"} id="bs-example-navbar-collapse-1">
              <ul className="nav nav-pills nav-justified">
                {items}
              </ul>
            </div>{/* /.navbar-collapse */}
          </div>{/* /.container-fluid */}
        </nav>
        
      </div>
    );
  }
});

module.exports = ACPTabHeader;