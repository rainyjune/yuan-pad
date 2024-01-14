import { MouseEvent, useContext, useState } from 'react';
import UserContext from '../common/userContext';
import dataProvider from '../common/dataProvider';
import LanguageContext from '../common/languageContext';

function ACPTabHeader(props: any) {
  const user = useContext(UserContext);
  const lang = useContext(LanguageContext);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  function updateActiveTab(e: MouseEvent) {
    e.preventDefault();
    const tabLink = e.target as HTMLAnchorElement;
    const newTabName = tabLink.getAttribute('data-tabname');
    if (newTabName === props.activeTab) {
      return false;
    }
    props.onTabSelected(newTabName);
    setMenuIsOpen(false);
  }
  function handleSignOut(e: MouseEvent) {
    e.preventDefault();
    dataProvider.signOut().then((response) => {
      if (response.status === 200 && response.data.statusCode === 200) {
        props.onUserLogout();
      } else {
        alert(response.data.statusText);
      }
    });
  }
  function toggleMenu() {
    setMenuIsOpen(!menuIsOpen);
  }

  if (user.user_type !== 'admin') return null;
  const activeTab = props.activeTab;
  const items = props.tabs.map((tab: any) => {
    return (
      <li key={tab.value} role="presentation" className={tab.value === activeTab ? 'active' : ''}>
        <a href="#" data-tabname={tab.value} onClick={updateActiveTab}>
          {tab.text}
        </a>
      </li>
    );
  });
  return (
    <div className="">
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              onClick={toggleMenu}
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="btn btn-default navbar-btn homeButton" href="index.php">
              {lang.HOME}
            </a>
            &nbsp;
            <a className="btn btn-default navbar-btn signOutButton" href="#" onClick={handleSignOut}>
              {lang.LOGOUT}
            </a>
          </div>
          {/* Collect the nav links, forms, and other content for toggling */}
          <div
            className={menuIsOpen ? 'navbar-collapse collapse in' : 'collapse navbar-collapse'}
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav nav-pills nav-justified">{items}</ul>
          </div>
          {/* /.navbar-collapse */}
        </div>
        {/* /.container-fluid */}
      </nav>
    </div>
  );
}

export default ACPTabHeader;