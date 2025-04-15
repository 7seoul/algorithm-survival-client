import Hero from "@/components/Hero"
import GroupCard from "@/components/GroupCard"
import { getGroupMain } from "@/apis/apis"
import { useQuery } from "@tanstack/react-query"
import { GroupMainResponse } from "@/types/GroupType"

function MainPage(){
    const {data, isLoading} = useQuery<GroupMainResponse>({
        queryKey: ['mainGroup'],
        queryFn: async () =>(await getGroupMain()),
        staleTime: 1000 * 10
    })

    if (isLoading){
    return (<div className='w-full h-dvh flex justify-center items-center'>
        <span className="items-center loading loading-spinner loading-xl"></span>
    </div>)
    }

    return (<>
        <Hero></Hero>
        <h2 className='text-1xl font-bold'>그룹 점수 TOP3</h2>
        <section className="flex justify-between gap-4">
        {data?.success === true && (
            data.score.map((group)=>(
                <GroupCard key={group._id} data={group} />
            ))
        )}
        </section>
        <h2 className='text-1xl font-bold'>그룹 생존 스트릭 TOP3</h2>
        <section className="flex justify-between gap-4">
        {
            data?.success === true && (
                data.streak.map((group)=>(
                    <GroupCard key={group._id} data={group} />
                ))
            )
        }
        </section>
    </>)
}

export default MainPage