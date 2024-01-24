import { MouseEvent } from 'react';
import { useSWRConfig } from 'swr';
import { useTranslation, useLogoutUser, userInitalState } from '../common/dataHooks';

function LogoutButton() {
  const { mutate } = useSWRConfig();
  const { data: lang } = useTranslation();
  const { trigger } = useLogoutUser();
  function handleSignOut(e: MouseEvent) {
    e.preventDefault();
    trigger();
    document.cookie = 'CSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    mutate(
      'getUserInfo',
      () => {
        // Hardcode userInitalState here, because this API indicates the user is still logged in
        // Even though the logout API has been called.
        // Might be a serser side bug
        return Promise.resolve(userInitalState);
      },
      {
        optimisticData: userInitalState,
        revalidate: false,
      },
    );
  }
  return (
    <a role="button" className="btn btn-default signOutButton" onClick={handleSignOut}>
      {lang.LOGOUT}
    </a>
  );
}

export default LogoutButton;
