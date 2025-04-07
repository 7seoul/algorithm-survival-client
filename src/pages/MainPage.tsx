import Hero from "@/components/Hero"
import GroupCard from "@/components/GroupCard"
import { getGroupRank } from "@/apis/apis"
import { useQuery } from "@tanstack/react-query"
import { groupType } from "@/types/GroupType"

interface GroupResponse{
    success : Boolean
    result : Array<groupType>
}

function MainPage(){
    const {data} = useQuery<GroupResponse>({
        queryKey: ['test'],
        queryFn: async () =>(await getGroupRank('score')),
        staleTime: 1000 * 10
    })
    return (<>
        <Hero></Hero>
        <section className="flex flex-wrap justify-between">
        {data?.success == true && data.result.map((group)=>(
            <GroupCard data={group} />
        ))} 
        </section>
    </>)
}

export default MainPage