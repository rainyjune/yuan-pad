import useSWR from 'swr';
import useSWRMutation from 'swr/mutation'
import dataProvider, { fetchByFunctionName } from './dataProvider';
import { initialState as userInitalState } from './userContext';
import { initialState as appConfigInitalState } from './appConfigContext';
import { initialState as languageInitalState } from './languageContext';

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

function useWrappedSWR(key, swrExtraOptions = {}) {
  return useSWR(key, fetchByFunctionName, {
    ...swrOptions,
    ...swrExtraOptions,
  });
}

async function sendRequest(url, { arg }) {
  return dataProvider[url](arg).then((res) => {
    if (res.data.statusCode !== 200) {
      throw res.data.response;
    }
    return res.data.response;
  });
}

export function useSignIn() {
  return useSWRMutation('signIn', sendRequest /* options */);
}

export function useUpdateUser() {
  return useSWRMutation('updateUser', sendRequest /* options */);
}

export function useAppConfig() {
  return useWrappedSWR('getAppConfig', { fallbackData: appConfigInitalState });
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