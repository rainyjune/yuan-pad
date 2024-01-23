import { useUser } from '../common/dataHooks';

function ACPFooter() {
  const { user } = useUser();

  if (user.user_type !== 'admin') return null;
  return (
    <footer>
      <p>
        Powered by <a href="https://github.com/rainyjune/yuan-pad">YuanPad</a>
      </p>
    </footer>
  );
}

export default ACPFooter;
