export type groupType = {
    _id : number,
    groupName : string,
    description: string,
    score : number,
    maxStreak : number,
    size: number
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
    count : number
    maxStreak: number
    currentStreak: number
    createdAt : string
    updatedAt: string
    size: number
    todayAllSolved: boolean
    todaySolvedMembers: Array<any>
    scoreRank : number
    streakRank : number
    countRank : number
    isMember : boolean
}

export type MemberType = {
    name : string
    handle : string
    maxStreak : number
    score : number
    imgSrc : string
    count : number
}

export type BaseGroupRank = {
    groupName: string
    _id: number
}

export type GroupRank = BaseGroupRank & RankDataType

type UserType = {
    _id: string,
    name: string,
    handle: string,
    joinedGroupList: Array<
        {
            _id: number,
            groupName: string
        }
        >
    maxStreak: number,
    initialStreak: number,
    currentStreak: number,
    initialSolved: number,
    currentSolved: number,
    score: number,
    tier: number,
    imgSrc: string,
    updatedAt: string
}

type BaseUserRank = {
    name : string
    handle : string
    imgSrc : string
}

type RankDataType = {maxStreak:number} | {score:number} | {count:number}

export type UserRank= BaseUserRank & RankDataType

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
    result : Array<UserRank>
}>

export type CheckUserResponse = ResponseBase<{
    user: UserType
}>

type SuccessResponse = {
    success : true
}


type FailResponse = {
    success : false
    message : string
}

export type ResponseBase<T = undefined> = SuccessResponse & T | FailResponse
