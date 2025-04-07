import { GroupRankResponse, GroupMainResponse } from "@/types/GroupType";
import ky from "ky";


export const getGroupRank = async (type : 'score' | 'streak'):Promise<GroupRankResponse>=>{
  return await ky.get(`${import.meta.env.VITE_API_URL}/rankings/groups/${type}`).json()
}

export const getGroupMain = async ():Promise<GroupMainResponse> => {
  return await ky.get(`${import.meta.env.VITE_API_URL}/rankings/groups/main`).json()
}