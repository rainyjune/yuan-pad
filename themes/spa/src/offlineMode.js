import React from 'react';

function Offline(props) {
  let offlineStyle = {
    display: props.appConfig.site_close == 1 ? 'block' : 'none'
  };
  return (
    <p className="bg-warning" style={offlineStyle}>{props.lang.OFFLINE_WARNING}</p>
  );
}

export default Offline;