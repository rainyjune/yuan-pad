import { MouseEvent, useState } from 'react';
import dataProvider from '../common/dataProvider';

function ACPTabHeader(props: any) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const updateActiveTab = (e: MouseEvent) => {
    e.preventDefault();
    let tabLink = e.target as HTMLAnchorElement;
    let newTabName = tabLink.getAttribute('data-tabname');
    if (newTabName === props.activeTab) {
      return false;
    }
    props.onTabSelected(newTabName);
    setMenuIsOpen(false);
  };
  const handleSignOut = (e: MouseEvent) => {
    e.preventDefault();
    dataProvider.signOut(response => {
      if (response.statusCode === 200) {
        props.onUserLogout();
      } else {
        alert(response.statusText);
      }
    });
  }
  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen)
  };

  if (props.user.user_type !== "admin") return null;
  let activeTab = props.activeTab;
  let items = props.tabs.map((tab: any) => {
    return (
      <li key={tab.value} role="presentation" className={tab.value === activeTab ? "active" : ""}>
        <a href="#" data-tabname={tab.value} onClick={updateActiveTab}>{tab.text}</a>
      </li>
    );
  });
  return (
    <div className="">
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button onClick={toggleMenu} type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="btn btn-default navbar-btn homeButton" href="index.php">{props.lang.HOME}</a>&nbsp;
            <a className="btn btn-default navbar-btn signOutButton" href="#" onClick={handleSignOut}>{props.lang.LOGOUT}</a>
          </div>
          {/* Collect the nav links, forms, and other content for toggling */}
          <div className={menuIsOpen ? "navbar-collapse collapse in" : "collapse navbar-collapse"} id="bs-example-navbar-collapse-1">
            <ul className="nav nav-pills nav-justified">
              {items}
            </ul>
          </div>{/* /.navbar-collapse */}
        </div>{/* /.container-fluid */}
      </nav>
      
    </div>
  );
}

export default ACPTabHeader;