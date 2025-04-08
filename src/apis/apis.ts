import ky from "ky";

const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
});

export const getGroupRank = async (type: "score" | "streak") => {
  return await api.get(`rankings/groups/${type}`).json();
};

export const getUserRank = async (type: "score" | "streak") => {
  return await api.get(`rankings/users/${type}`).json();
};

export const getGroupMain = async () => {
  return await api.get(`rankings/groups/main`).json();
};

export const getGroupInfo = async (id: string) => {
  return await api.get(`groups/${id}`).json();
};

export const getGroupList = async () => {
  return await api.get(`groups`).json();
};

export const getAvatarUrl = (id: number): string => {
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${id * 10}&scale=80`;
};
