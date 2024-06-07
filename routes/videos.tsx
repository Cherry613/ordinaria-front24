import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Videos } from "../components/Videos.tsx";
import { VideoType } from "../types.ts";
import { State } from "./_middleware.ts";

type Data = {
    videos: VideoType[],
    userid: string
}


export const handler: Handlers = {
    GET: async (req: Request, ctx: FreshContext<State, Data>) => {

        const userid = ctx.state.id;

        const response = await fetch(`https://videoapp-api.deno.dev/videos/${userid}`)
    
        if(response.status === 500) {
            throw new Error("Error inesperado")
        }
        if(response.status === 404){
            throw new Error("Usuario con userid no encontrado")
        }

        if(response.status === 200){
            const data = await response.json()
            return ctx.render({videos: data, userid: userid});
        }

        return ctx.render()
    }
}

const Page = (props: PageProps) => {


    return(
        <div class="video-page-container">
            <h1 class="video-list-title">Curso Deno Fresh</h1>
            <Videos videos={props.data.videos} userid={props.data.userid}/>
        </div>
    )
}

export default Page;