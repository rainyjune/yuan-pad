import React from 'react';

class Offline extends React.Component {
  render() {
    let prop = this.props;
    let offlineStyle = {
      display: prop.appConfig.site_close == 1 ? 'block' : 'none'
    };
    return (
      <p className="bg-warning" style={offlineStyle}>{prop.lang.OFFLINE_WARNING}</p>
    );
  }
}

export default Offline;