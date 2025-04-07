import { GroupRankResponse, GroupMainResponse, GroupInfoResponse } from "@/types/GroupType";
import ky from "ky";


export const getGroupRank = async (type : 'score' | 'streak'):Promise<GroupRankResponse>=>{
  return await ky.get(`${import.meta.env.VITE_API_URL}/rankings/groups/${type}`).json()
}

export const getGroupMain = async ():Promise<GroupMainResponse> => {
  return await ky.get(`${import.meta.env.VITE_API_URL}/rankings/groups/main`).json()
}

export const getGroupInfo = async (id:string) : Promise<GroupInfoResponse> => {
  return await ky.get(`${import.meta.env.VITE_API_URL}/groups/${id}`).json()
}

export const getAvatarUrl = (id:number) : string =>{
  return `https://api.dicebear.com/9.x/thumbs/svg?seed=${id*10}&scale=80`
}