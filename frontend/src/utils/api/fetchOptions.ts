interface Body {
  [Key: string]: string | string[] | null;
}

const getFetchOptions = (): RequestInit => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
};

const postFetchOptions = (body: Body): RequestInit => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  };
};

const deleteFetchOptions = (): RequestInit => {
  return {
    method: 'DELETE',
    credentials: 'include',
  };
};

const putFetchOptions = (): RequestInit => {
  return {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
};

export { getFetchOptions, postFetchOptions, deleteFetchOptions, putFetchOptions };
