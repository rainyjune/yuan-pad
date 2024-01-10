import { useContext, useEffect, useState } from "react";
import UserUpdateModal from "./acp-userUpdateModal";
import dataProvider from "../common/dataProvider";
import UserItem from "./UserItem";
import LanguageContext from "../common/languageContext";

function ACPUser(props: any) {
  const lang = useContext(LanguageContext);
  const [users, setUsers] = useState<any>([]);
  const [modalInfo, setModalInfo] = useState({
    updateErrorMsg: "",
    updateModalIsOpen: false,
    updatedModalUserData: null,
  });
  const addSelectedFlag = (arr: Array<any>) => {
    if (Array.isArray(arr)) {
      arr.forEach((currentValue) => {
        currentValue["checked"] = false;
      });
    }
  };
  const toggle = (itemToToggle: any) => {
    let data: Array<any> = users.map((currentValue: any) => {
      if (currentValue === itemToToggle) {
        currentValue["checked"] = !currentValue["checked"];
      }
      return currentValue;
    });
    setUsers(data);
  };
  const toggleInputClicked = (e: any) => {
    toggleAll(e.target.checked);
  };
  const toggleAll = (checked: boolean) => {
    let data = users.map((currentValue: any) => {
      currentValue["checked"] = checked;
      return currentValue;
    });
    setUsers(data);
  };
  const getCheckedItems = () => {
    let arr: any = [];
    let key = getItemKey();
    users.forEach((currentValue: any) => {
      if (currentValue.checked) {
        arr.push(currentValue[key]);
      }
    });
    return arr;
  };
  /*
  const getMixinAttr = () => {
    return 'users';
  };
  */
  const getItemKey = () => {
    return "uid";
  };

  useEffect(() => {
    loadAllUsersFromServer();
  }, []);

  const loadAllUsersFromServer = async () => {
    const res = await dataProvider.getAllUsers();
    if (res.status === 200 && res.data.statusCode === 200) {
      const data = res.data.response;
      addSelectedFlag(data);
      setUsers(data);
    } else {
      alert(res.data.statusText);
    }
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
  const handleUpdateSubmit = (newUserData: any) => {
    dataProvider.updateUser(newUserData).then((res) => {
      if (res.data.statusCode === 200) {
        setModalInfo({
          updateErrorMsg: "",
          updatedModalUserData: null,
          updateModalIsOpen: false,
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
      updateErrorMsg: "",
      updatedModalUserData: null,
      updateModalIsOpen: false,
    });
  };
  /**
   * Tested 1.
   */
  const openUserUpdateModal = (userData: any) => {
    setModalInfo({
      updateErrorMsg: "",
      updatedModalUserData: userData,
      updateModalIsOpen: true,
    });
  };
  /**
   * Tested 1.
   */
  const deleteAllUsers = (e: any) => {
    e.preventDefault();
    if (!confirm(lang.DEL_ALLUSER_CONFIRM)) {
      return false;
    }
    dataProvider.deleteAllUsers().then((res) => {
      if (res.data.statusCode === 200) {
        loadAllUsersFromServer();
      }
    });
  };
  /**
   * Tested 1.
   */
  const handleDeleteMulti = (e: any) => {
    e.preventDefault();
    let checkedUids = getCheckedItems();
    if (checkedUids.length === 0) {
      return false;
    }
    if (!confirm(lang.DEL_SELECTEDUSERS_CONFIRM)) {
      return false;
    }
    dataProvider.deleteMutiUsers(checkedUids).then((res) => {
      if (res.data.statusCode === 200) {
        loadAllUsersFromServer();
      } else {
        alert("delete error");
      }
    });
  };
  /**
   * Tested 1
   */
  const handleToggleItem = (userItem: any) => {
    toggle(userItem);
  };
  const cssClass = "user_container selectTag";
  let createUserItem = function (user: any) {
    return (
      <UserItem
        data={user}
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
              <th className="col-xs-1 col-sm-1 col-md-1">
                <input type="checkbox" onClick={toggleInputClicked} />
              </th>
              <th className="col-xs-3 col-sm-3 col-md-3">{lang.NICKNAME}</th>
              <th className="col-xs-6 col-sm-6 col-md-6">{lang.EMAIL}</th>
              <th className="col-xs-2 col-sm-2 col-md-2">{lang.OPERATION}</th>
            </tr>
          </thead>
          <tbody>{users.map(createUserItem)}</tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>
                <input type="submit" value={lang.DELETE_CHECKED} />
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
        />
      </form>
    </div>
  );
}

export default ACPUser;
