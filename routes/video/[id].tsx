import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Video } from "../../components/Video.tsx";
import { VideoType } from "../../types.ts";
import { State } from "../_middleware.ts";


type Data = {
    video: VideoType,
    userid: string
}

export const handler: Handlers = {
    GET: async ( req: Request, ctx: FreshContext<State, Data>) => {
        const {id} = ctx.params;
        const userid = ctx.state.id;

        const response = await fetch(`https://videoapp-api.deno.dev/video/${userid}/${id}`)

        if(response.status === 404){
            return new Response("usuario con userid no encontrado")
        }

        if(response.status === 500){
            return new Response("error inesperado")
        }

        if(response.status === 200) {
            const data = await response.json();
            return ctx.render({video: data, userid: userid})
        }

        return ctx.render()

    }
}

const Page = (props: PageProps) => {
    return(
        <Video video={props.data.video} userid={props.data.userid}/>
    )
}

export default Page;