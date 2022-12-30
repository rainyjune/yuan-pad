import React, { useEffect, useState } from 'react';
import UserUpdateModal from './acp-userUpdateModal.js';
import dataProvider from './dataProvider.ts';

function UserItem(props) {
  /**
   * Tested 1.
   */
  const deleteUser = (e) => {
    e.preventDefault();
    if (!confirm(props.lang.DEL_SINGLEUSER_CONFIRM)) {
      return false;
    }
    dataProvider.deleteUser(props.data.uid, res=> {
      if (res.statusCode === 200) {
        props.onUserDeleted();
      }
    });
  };
  /**
   * Tested 1.
   */
  const updateUser = (e) => {
    e.preventDefault();
    props.onOpenUserUpdateModal(props.data);
  };
  /**
   * Tested 1.
   */
  const toggleItem = () => {
    props.onToggleItem(props.data);
  };
  let user = props.data;
  let lang = props.lang;
  return (
    <tr className="row">
      <td className="col-xs-1 col-sm-1 col-md-1"><input type='checkbox' checked={props.data.checked} onChange={toggleItem} /></td>
      <td className="col-xs-3 col-sm-3 col-md-3">{user.username}</td>
      <td className="col-xs-6 col-sm-6 col-md-6">{user.email}</td>
      <td className="col-xs-2 col-sm-2 col-md-2">
        <a className="btn btn-danger btn-sm" onClick={deleteUser} href="#">{lang.DELETE}</a>
        <a className="btn btn-default btn-sm" onClick={updateUser} href='#'>{lang.UPDATE}</a>
      </td>
    </tr>
  );
}

function ACPUser(props) {
  const [users, setUsers] = useState([]);
  const [modalInfo, setModalInfo] = useState({
    updateErrorMsg: '',
    updateModalIsOpen: false,
    updatedModalUserData: null,
  });
  const addSelectedFlag = (arr) => {
    if (Array.isArray(arr)) {
      arr.forEach((currentValue, index) => {
        currentValue['checked'] = false;
      });
    }
  };
  const toggle = (itemToToggle) => {
    let data = users.map((currentValue, index) => {
      if (currentValue === itemToToggle) {
        currentValue['checked'] = !currentValue['checked'];
      }
      return currentValue;
    });
    setUsers(data);
  };
  const toggleInputClicked = (e) => {
    toggleAll(e.target.checked);
  };
  const toggleAll = (checked) => {
    let data = users.map((currentValue, index) => {
      currentValue['checked'] = checked;
      return currentValue;
    });
    setUsers(data);
  };
  const getCheckedItems = () => {
    let arr = [];
    let key = getItemKey();
    users.forEach((currentValue, index) => {
      if (currentValue.checked) {
        arr.push(currentValue[key]);
      }
    });
    return arr;
  };
  const getMixinAttr = () => {
    return 'users';
  };
  const getItemKey = () => {
    return 'uid';
  };

  useEffect(() => {
    loadAllUsersFromServer();
  }, []);

  const loadAllUsersFromServer = () => {
    dataProvider.getAllUsers(res => {
      if (res.statusCode === 200) {
        let data = res.response;
        addSelectedFlag(data);
        setUsers(data);
      }
    });
  };
  /**
   * Tested 1.
   */
  const handleUserDeleted = () => {
    loadAllUsersFromServer();
  };
  /**
   * Tested 1.
   */
  const handleUpdateSubmit = (newUserData) => {
    dataProvider.updateUser(newUserData, res => {
      if (res.statusCode === 200) {
        setModalInfo({
          updateErrorMsg: '',
          updatedModalUserData: null,
          updateModalIsOpen: false
        });
        loadAllUsersFromServer();
      }
    });
  };
  /**
   * Tested 1.
   */
  const closeUpdateModal = () => {
    setModalInfo({
      updateErrorMsg: '',
      updatedModalUserData: null,
      updateModalIsOpen: false
    });
  };
  /**
   * Tested 1.
   */
  const openUserUpdateModal = (userData) => {
    setModalInfo({
      updateErrorMsg: '',
      updatedModalUserData: userData,
      updateModalIsOpen: true
    });
  };
  /**
   * Tested 1.
   */
  const deleteAllUsers = (e) => {
    e.preventDefault();
    if (!confirm(props.lang.DEL_ALLUSER_CONFIRM)) {
      return false;
    }
    dataProvider.deleteAllUsers(res => {
      if (res.statusCode === 200) {
        loadAllUsersFromServer();
      }
    });
  };
  /**
   * Tested 1.
   */
  const handleDeleteMulti = (e) => {
    e.preventDefault();
    let checkedUids = getCheckedItems();
    if (checkedUids.length === 0) {
      return false;
    }
    if (!confirm(props.lang.DEL_SELECTEDUSERS_CONFIRM)) {
      return false;
    }
    dataProvider.deleteMutiUsers(checkedUids, res => {
      if (res.statusCode === 200) {
        loadAllUsersFromServer();
      } else {
        alert('delete error');
      }
    });
  };
  /**
   * Tested 1
   */
  const handleToggleItem = (userItem) => {
    toggle(userItem);
  };
  let lang = props.lang;
  let cssClass = props.activeTab === "user" ? "user_container selectTag" : "user_container";
  let createUserItem = function(user) {
    return (
      <UserItem
        data={user}
        lang={lang}
        key={user.uid}
        onOpenUserUpdateModal={openUserUpdateModal}
        onUserDeleted={handleUserDeleted}
        onToggleItem={handleToggleItem}
      />
    );
  };
  return (
    <div className={cssClass}>
      <form onSubmit={handleDeleteMulti} action="#" method="post">
        <table className="table table-striped table-hover">
          <thead>
            <tr className="header row">
              <th className="col-xs-1 col-sm-1 col-md-1"><input type="checkbox" onClick={toggleInputClicked} /></th>
              <th className="col-xs-3 col-sm-3 col-md-3">{lang.NICKNAME}</th>
              <th className="col-xs-6 col-sm-6 col-md-6">{lang.EMAIL}</th>
              <th className="col-xs-2 col-sm-2 col-md-2">{lang.OPERATION}</th>
            </tr>
          </thead>
          <tbody>
            {users.map(createUserItem, this)}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan='4'>
                <input type='submit' value={lang.DELETE_CHECKED} />
                <button onClick={deleteAllUsers}>{lang.DELETE_ALL}</button>
              </td>
            </tr>
          </tfoot>
        </table>
        <UserUpdateModal
          userData={modalInfo.updatedModalUserData}
          errorMsg={modalInfo.updateErrorMsg} 
          modalIsOpen={modalInfo.updateModalIsOpen} 
          onRequestClose={closeUpdateModal}
          onUpdateSubmit={handleUpdateSubmit}
          lang={props.lang} 
        />
      </form>
    </div>
  );
}

export default ACPUser;