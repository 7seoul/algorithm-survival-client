import { GroupRankResponse, GroupMainResponse, GroupInfoResponse, GroupListResponse, UserRankResponse } from "@/types/GroupType";
import ky from "ky";


export const getGroupRank = async (type: 'score' | 'streak'): Promise<GroupRankResponse> => {
  return await ky.get(`/api/rankings/groups/${type}`).json();
}

export const getUserRank = async (type: 'score' | 'streak'): Promise<UserRankResponse> => {
  return await ky.get(`/api/rankings/users/${type}`).json();
}

export const getGroupMain = async (): Promise<GroupMainResponse> => {
  return await ky.get(`/api/rankings/groups/main`).json();
}

export const getGroupInfo = async (id: number): Promise<GroupInfoResponse> => {
  return await ky.get(`/api/groups/${id}`).json();
}

export const getGroupList = async (): Promise<GroupListResponse> => {
  return await ky.get(`/api/groups`).json();
}

export const getAvatarUrl = (id:number) : string =>{
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${id*10}&scale=80`
}
