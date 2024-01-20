interface IGet {
  url: string;
}

interface IPost<T> {
  url: string;
  body: T;
}

const BASE_URL = "http://localhost:3000/api/v1";

export async function get({ url }: IGet) {
  const res = await fetch(`${BASE_URL}${url}`);
  const { data } = await res.json();

  return {
    data,
  };
}

export async function post<T>({ url, body }: IPost<T>) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const { data } = await res.json();

  return {
    data,
  };
}
