import Hero from "@/components/Hero"
import GroupCard from "@/components/GroupCard"
import { getGroupMain } from "@/apis/apis"
import { useQuery } from "@tanstack/react-query"
import { GroupMainResponse } from "@/types/GroupType"
import { Link } from 'react-router'


function MainPage(){
    const {data} = useQuery<GroupMainResponse>({
        queryKey: ['test'],
        queryFn: async () =>(await getGroupMain()),
        staleTime: 1000 * 10
    })


    return (<>
        <Hero></Hero>
        <h2 className='text-1xl font-bold'>그룹 점수 TOP3</h2>
        <section className="flex justify-between gap-4">
        {data?.success === true && (
            data.score.map((group)=>(
                <GroupCard data={group} />
            ))
        )}
        </section>
        <h2 className='text-1xl font-bold'>그룹 생존 스트릭 TOP3</h2>
        <section className="flex justify-between gap-4">
        {
            data?.success === true && (
                data.streak.map((group)=>(
                    <GroupCard data={group} />
                ))
            )
        }
        </section>
        <button className='btn btn-primary w-2xs self-center'><Link to={'/groups/streak'}>전체 그룹 보기</Link></button>
    </>)
}

export default MainPage