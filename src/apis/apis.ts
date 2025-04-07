import { groupType } from "@/types/GroupType";
import ky from "ky";
interface GroupResponse{
    success : Boolean
    result : Array<groupType>
}
export const getGroupRank = async (type : 'score' | 'streak'):Promise<GroupResponse>=>{
  return await ky.get(`${import.meta.env.VITE_API_URL}/rankings/groups/${type}`).json()
}