import $axios from './request';

export function get(url, query, auth=true){
  return $axios({
    url: auth ? url + '&uu=' + localStorage.getItem('server_token') + '&ui=' + localStorage.getItem('ui') : url,
    method: 'GET',
    data: query,
  })
}

export function post(url, query, auth=true){
    return $axios({
      url: auth ? url + '& uu=' + localStorage.getItem('server_token') + '&ui=' + localStorage.getItem('ui') : url,
      method: 'POST',
      data:  query,
    })
  }