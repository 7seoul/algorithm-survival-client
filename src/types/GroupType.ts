export interface groupType{
    _id : Number,
    groupName : String,
    description: String,
    score : Number,
    maxStreak : Number,
    size: Number
}

export interface GroupInfoType{
    _id : Number
    groupName : String
    admin : {
        handle : String
        name : String
    }
    memberData : Array<MemberType>
    description : String
    score : Number
    initialStreak: Number
    currentStreak: Number
    createdAt: Date
    updatedAt: Date
    size: Number
    maxStreak: Number
    todayAllSolved: Boolean
    todaySolvedMembers: Array<any>
}

interface MemberType{
    name : String
    handle : String
    streak : Number
    score : Number
}

export interface GroupRankResponse{
    success : Boolean
    result : Array<groupType>
}

export interface GroupMainResponse{
    success : Boolean
    score : Array<groupType>
    streak : Array<groupType>
}