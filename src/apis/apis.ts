import { LoginFromData, LoginResponse, LogoutResponse } from "@/types/AuthTypes";
import { GroupRankResponse, GroupMainResponse, GroupInfoResponse, GroupListResponse, UserRankResponse } from "@/types/GroupType";
import ky from "ky";

const api = ky.create({
  prefixUrl: "/api", 
  credentials: "include",
});

export const getGroupRank = async (type: 'score' | 'streak'): Promise<GroupRankResponse> => {
  return await api.get(`rankings/groups/${type}`).json();
}

export const getUserRank = async (type: 'score' | 'streak'): Promise<UserRankResponse> => {
  return await api.get(`rankings/users/${type}`).json();
}

export const getGroupMain = async (): Promise<GroupMainResponse> => {
  return await api.get(`rankings/groups/main`).json();
}

export const getGroupInfo = async (id: string): Promise<GroupInfoResponse> => {
  return await api.get(`groups/${id}`).json();
}

export const getGroupList = async (): Promise<GroupListResponse> => {
  return await api.get(`groups`).json();
}

export const getAvatarUrl = (id: number): string => {
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${id * 10}&scale=80`;
}

export const authLogin = async (inputData : LoginFromData): Promise<LoginResponse> => {
  return await api.post(`auth/login`,{
    json: inputData
  }).json()
}

export const authLogout = async (): Promise<LogoutResponse> => {
  return await api.post(`auth/logout`).json()
}