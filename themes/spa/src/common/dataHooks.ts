import useSWR from 'swr';
import useSWRMutation from 'swr/mutation'
import dataProvider, { fetchByFunctionName } from './dataProvider';
import { initialState as userInitalState } from './userContext';
import { initialState as appConfigInitalState } from './appConfigContext';
import { initialState as languageInitalState } from './languageContext';
import { initialState as systemInfoInitialState } from './SystemInfoProvider'

const commentListInitalState = {
  total: 0,
  comments: []
};

const swrOptions = {
  revalidateOnFocus: false,
};

export function useUser() {
  const { data, error, isLoading } = useWrappedSWR('getUserInfo', { fallbackData:userInitalState });
 
  return {
    user: data,
    isLoading,
    isError: error
  }
}

export function useAllUsers() {
  return useWrappedSWR('getAllUsers', {fallbackData: []});
}

export function useIPBlackList() {
  return useWrappedSWR('getIPBlackList', {fallbackData: []});
}

export function useSystemInformation() {
  return useWrappedSWR('getSystemInformation', { fallbackData: systemInfoInitialState});
}

export function useAllComments() {
  return useWrappedSWR('loadAllCommentsFromServer', { fallbackData: {}});
}

function useWrappedSWR(key: any, swrExtraOptions = {}) {
  return useSWR(key, fetchByFunctionName, {
    ...swrOptions,
    ...swrExtraOptions,
  });
}

async function sendRequest(url: any, { arg } : { arg: any}) {
  // @ts-expect-error Expected
  return dataProvider[url](arg).then((res) => {
    if (res.data.statusCode !== 200) {
      throw res.data.response;
    }
    return res.data.response;
  });
}

export function useDeleteAllUsers() {
  return useSWRMutation('deleteAllUsers', sendRequest /* options */);
}

export function useDeleteMutiUsers() {
  return useSWRMutation('deleteMutiUsers', sendRequest /* options */);
}


export function useDeleteAllComments() {
  return useSWRMutation('deleteAllComments', sendRequest /* options */);
}

export function useDeleteAllReplies() {
  return useSWRMutation('deleteAllReplies', sendRequest /* options */);
}

export function useDeleteMutiComments() {
  return useSWRMutation('deleteMutiComments', sendRequest /* options */);
}

export function useDeleteComment() {
  return useSWRMutation('deleteComment', sendRequest /* options */);
}

export function useUpdateReply() {
  return useSWRMutation('updateReply', sendRequest /* options */);
}

export function useCreateReply() {
  return useSWRMutation('createReply', sendRequest /* options */);
}

export function useDeleteUser() {
  return useSWRMutation('deleteUser', sendRequest /* options */);
}

export function useUpdateComment() {
  return useSWRMutation('updateComment', sendRequest /* options */);
}

export function useDeleteReply() {
  return useSWRMutation('deleteReply', sendRequest /* options */);
}

export function useBanIP() {
  return useSWRMutation('banIP', sendRequest /* options */);
}

export function useDeleteMultiIPs() {
  return useSWRMutation('deleteMultiIPs', sendRequest /* options */);
}

export function useUpdateConfig() {
  return useSWRMutation('updateSiteConfig', sendRequest /* options */);
}

export function useAddComment() {
  return useSWRMutation('createPost', sendRequest /* options */);
}

export function useSignIn() {
  return useSWRMutation('signIn', sendRequest /* options */);
}

export function useSignUp() {
  return useSWRMutation('signUp', sendRequest /* options */);
}

export function useUpdateUser() {
  return useSWRMutation('updateUser', sendRequest /* options */);
}

export function useAppConfig() {
  return useWrappedSWR('getAppConfig', { fallbackData: appConfigInitalState });
}

export function useAppConfigACP() {
  return useWrappedSWR('getAppConfigACP', { fallbackData: appConfigInitalState });
}

export function useTranslation() {
  return useWrappedSWR('getTranslations', { fallbackData: languageInitalState});
}

export function useComments(currentPage: number) {
  return useWrappedSWR(['loadCommentsFromServer', currentPage]);
}

export function useSearchResult(keyword: string) {
  return useWrappedSWR(['search', keyword]);
}

export function useCommentsList({
  isSearch,
  keyword,
  currentPage
}: {
  isSearch: boolean;
  keyword: string,
  currentPage: number
}) {
  return useWrappedSWR(isSearch ? ['search', keyword] : ['loadCommentsFromServer', currentPage], {
    fallbackData: commentListInitalState
  });
}

export function useLogoutUser() {
  return useSWRMutation('signOut', fetchByFunctionName);
}