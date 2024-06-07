import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Video } from "../../components/Video.tsx";

export const handler: Handlers = {
    GET: async ( req: Request, ctx: FreshContext) => {
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
            return ctx.render(data)
        }

        return ctx.render()

    }
}

const Page = (props: PageProps) => {
    return(
        <Video video={props.data}/>
    )
}

export default Page;