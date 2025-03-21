import { url } from "./configuration";

export const store = async (token, body) => {
  const response = await fetch(`${url}/projects/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSOn.stringify(body),
  });
  return await response.json();
};

export const IndexProjects = async (token) => {
  const response = await fetch(`${url}/projects`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const update = async (token, id) => {
  const response = await fetch(`${url}/projects/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const destroy = async (token, id) => {
  const response = await fetch(`${url}/projects/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const filteredProjects = async (token, filters) => {
  const params = new URLSearchParams(filters).toString();
  const response = await fetch(`${url}/projects/filter`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(filters),
  });
  return await response.json();
};

export const recents = async () => {
  const response = await fetch(`${url}/projects/recents`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
