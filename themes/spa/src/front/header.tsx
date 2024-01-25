import SignIn from './signIn';
import SignUp from './signUp';
import UpdateUser from './updateUser';
import SignOutButton from './signOut';
import { useUser } from '../common/dataHooks';

function Header() {
  const { user: user } = useUser();
  return (
    <div className="header">
      {(() => {
        switch (user.user_type) {
          case 'regular':
            return (
              <div>
                <UpdateUser />
                <SignOutButton />
              </div>
            );
          case 'admin':
            return <SignOutButton />;
          case 'guest':
          default:
            return (
              <div>
                <SignIn /> <SignUp />
              </div>
            );
        }
      })()}
    </div>
  );
}

export default Header;
