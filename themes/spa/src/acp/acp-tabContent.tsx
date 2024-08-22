import { lazy, Suspense } from 'react';

import ACPOverview from './acp-overview';
import { ACPTabContentProps } from '../common/types';

const ACPConfig = lazy(() => import('./acp-config'));
const ACPMessages = lazy(() => import('./acp-messages'));
const ACPIpConfig = lazy(() => import('./acp-ipconfig'));
const ACPUsers = lazy(() => import('./acp-users'));

function Loading() {
  return <p><i>Loading...</i></p>;
}

function ACPTabContent(props: ACPTabContentProps) {
  function handleActiveChange(newTab: string) {
    setTimeout(() => {
      props.onActiveTabChanged(newTab);
    }, 0);
  }

  return (
    <div className="tagContent">
      <Suspense fallback={<Loading />}>
        {props.activeTab === 'overview' && <ACPOverview />}
        {props.activeTab === 'siteset' && <ACPConfig />}
        {props.activeTab === 'message' && <ACPMessages onActiveTabChanged={handleActiveChange} />}
        {props.activeTab === 'ban_ip' && <ACPIpConfig />}
        {props.activeTab === 'user' && <ACPUsers />}
      </Suspense>
    </div>
  );
}

export default ACPTabContent;
