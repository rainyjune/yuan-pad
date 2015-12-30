let React = require('react'),
    dataProvider = require('./dataProvider.js');

let ACPTableHeaderItem = React.createClass({
  updateActiveTab(e) {
    e.preventDefault();
    let tabLink = e.target;
    let newTabName = tabLink.getAttribute('data-tabname');
    if (newTabName === this.props.activeTab) {
      return false;
    }
    this.props.onTabSelected(newTabName);
  },
  render() {
    return (
      <li role="presentation" className={this.props.value === this.props.activeTab ? "active" : ""}>
        <a href="javascript:void(0);" data-tabname={this.props.value} onClick={this.updateActiveTab}>{this.props.text}</a>
      </li>
    )
  }
});

let ACPTabHeader = React.createClass({
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
  render() {
    if (this.props.user.user_type !== "admin") return null;
    let activeTab = this.props.activeTab;
    let onTabSelected = this.props.onTabSelected;
    let items = this.props.tabs.map(tab => {
      return (
        <ACPTableHeaderItem 
          onTabSelected={onTabSelected}
          text={tab.text}
          value={tab.value}
          key={tab.value}
          activeTab={activeTab} />
      );
    });
    return (
      <div className="">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            {/* Brand and toggle get grouped for better mobile display */}
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              {/*
              <a className="navbar-brand" href="#">Brand</a>
              */}
              <a className="btn btn-default navbar-btn homeButton" href="index.php">{this.props.lang.HOME}</a>&nbsp;
              <a className="btn btn-default navbar-btn signOutButton" href="#" onClick={this.handleSignOut}>{this.props.lang.LOGOUT}</a>
            </div>
        
            {/* Collect the nav links, forms, and other content for toggling */}
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav nav-pills nav-justified">
                {items}
              </ul>
              {/*
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Link</a></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="#">Action</a></li>
                    <li><a href="#">Another action</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Separated link</a></li>
                  </ul>
                </li>
              </ul>
              */}
            </div>{/* /.navbar-collapse */}
          </div>{/* /.container-fluid */}
        </nav>
        
      </div>
    );
  }
});

module.exports = ACPTabHeader;