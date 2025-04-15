import { LoginFromData, LoginResponse, LogoutResponse, SignUpFormData, SignUpTokenResponse } from "@/types/AuthTypes";
import { GroupRankResponse, GroupMainResponse, GroupInfoResponse, GroupListResponse, UserRankResponse, CheckUserResponse } from "@/types/GroupType";
import ky from "ky";


const api = ky.create({
  prefixUrl: "/api", 
  credentials: "include",
});

export const getGroupRank = async (type: 'score' | 'streak' | 'count'): Promise<GroupRankResponse> => {
  return await api.get(`rankings/groups/${type}`).json();
}

export const getUserRank = async (type: 'score' | 'streak' | 'count'): Promise<UserRankResponse> => {
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

export const joinGroup = async (groupId:number): Promise<GroupInfoResponse> => {
  return await api.post(`groups/${groupId}/applications`).json()
}

export const checkUser = async ():Promise<CheckUserResponse> => {
  return await api.get(`auth/me`).json()
}

export const acceptGroup = async ({groupId, handle} : {groupId : number, handle : string}):Promise<GroupInfoResponse> => {
  return await api.post(`groups/${groupId}/applications/${handle}/accept`).json()
}

export const getSignUpToken = async (inputData : {handle: string}) : Promise<SignUpTokenResponse> => {
  return await api.post('auth/code', {
    json: inputData
  }).json()
}

export const SignUp = async (inputData : SignUpFormData) : Promise<LoginResponse> => {
  return await api.post('auth/register', {
    json: inputData
  }).json()
}

export const createGroup = async (inputData : {groupName : string, description: string}) : Promise<GroupInfoResponse> => {
  return await api.post('groups', {
    json: inputData
  }).json()
}