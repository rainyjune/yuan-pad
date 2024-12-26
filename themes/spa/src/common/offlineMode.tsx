import { useTranslation } from './dataHooks';

function Offline() {
  const { data: lang } = useTranslation();
  return (
    <p className="p-3 border rounded-md my-2 bg-[linear-gradient(#bb800926,_#bb800926)] text-[#f0f6fc] font-medium border-[#bb800966]">
      {lang.OFFLINE_WARNING}
    </p>
  );
}

export default Offline;
