export type groupType = {
    _id : number,
    groupName : string,
    description: string,
    score : number,
    maxStreak : number,
    size: number
}

export type GroupRank = {
    groupName: string
    _id: number
    score : number
    currentStreak: number
    maxStreak: number
}

export type GroupInfoType = {
    _id : number
    groupName : string
    admin : {
        handle : string
        name : string
    }
    applications: Array<{
        handle : string
        name : string
    }>
    memberData : Array<MemberType>
    description : string
    score : number
    initialStreak: number
    currentStreak: number
    createdAt: string
    updatedAt: string
    size: number
    maxStreak: number
    todayAllSolved: boolean
    todaySolvedMembers: Array<any>
    scoreRank : number
    streakRank : number
    isMember : boolean
}

export type MemberType = {
    name : string
    handle : string
    streak : number
    score : number
}



export type GroupRankResponse = ResponseBase<{
    result : Array<GroupRank>
}>


export type GroupMainResponse = ResponseBase<{
    score : Array<groupType>
    streak : Array<groupType>
}>


export type GroupInfoResponse = ResponseBase<{
    group : GroupInfoType
}>

export type GroupListResponse = ResponseBase<{
    groups : Array<groupType>
}>

export type UserRankResponse = ResponseBase<{
    result : Array<MemberType>
}>

type SuccessResponse = {
    success : true
}


type FailResponse = {
    success : false
    message : string
}

type ResponseBase<T = undefined> = T extends undefined 
    ? FailResponse
    : SuccessResponse & T