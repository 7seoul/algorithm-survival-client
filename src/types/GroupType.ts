export interface groupType{
    _id : number,
    groupName : string,
    description: string,
    score : number,
    maxStreak : number,
    size: number
}

export interface GroupInfoType{
    _id : number
    groupName : string
    admin : {
        handle : string
        name : string
    }
    memberData : Array<MemberType>
    description : string
    score : number
    initialStreak: number
    currentStreak: number
    createdAt: Date
    updatedAt: Date
    size: number
    maxStreak: number
    todayAllSolved: boolean
    todaySolvedMembers: Array<any>
}

interface MemberType{
    name : string
    handle : string
    streak : number
    score : number
}

export interface GroupRankResponse{
    success : boolean
    result : Array<groupType>
}

export interface GroupMainResponse{
    success : boolean
    score : Array<groupType>
    streak : Array<groupType>
}