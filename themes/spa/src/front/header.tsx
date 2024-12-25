import SignIn from './signIn';
import SignUp from './signUp';
import UpdateUser from './updateUser';
import SignOutButton from './signOut';
import { useUser } from '../common/dataHooks';
import searchIcon from '../images/magnifying-glass.svg';

interface ISearchIconProps {
  onClicked: () => void;
}

function SearchIcon({ onClicked }: ISearchIconProps) {
  return (
    <div className="border-2 border-black rounded-md w-6 h-6 flex justify-center items-center" onClick={onClicked}>
      <img src={searchIcon} alt="Search" className="w-3 h-3" />
    </div>
  );
}

interface IHeaderProps {
  onSearchClicked: () => void;
}

function Header({ onSearchClicked }: IHeaderProps) {
  const { user: user } = useUser();
  return (
    <div className="flex gap-2">
      {(() => {
        switch (user.user_type) {
          case 'regular':
            return (
              <>
                <UpdateUser />
                <SignOutButton />
              </>
            );
          case 'admin':
            return <SignOutButton />;
          case 'guest':
          default:
            return (
              <>
                <SignIn />
                <SignUp />
              </>
            );
        }
      })()}
      <SearchIcon onClicked={onSearchClicked} />
    </div>
  );
}

export default Header;
