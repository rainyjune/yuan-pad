import axios from 'axios'

export function getPosts({ keyword, currentPage }: { keyword?: string; currentPage?: number }) {
  const url = keyword
    ? `index.php?controller=search`
    : `index.php?controller=post&action=list&page=${currentPage && currentPage > 0 ? currentPage - 1 : 0}`
  const request = keyword
    ? axios.post(
        url,
        {
          s: keyword
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    : axios.get(url)
  return request
}

export function getAllPosts() {
  return axios.get(`index.php?controller=post&action=all`);
}

export function getSystemInfo() {
  return axios.get(`index.php?controller=site&action=getSystemInformation`);
}

export function getConfigAll() {
  return axios.get(`index.php?controller=config&action=showAll`);
}

export function updateConfig(data) {
  return axios.post(`index.php?controller=config&action=update`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}