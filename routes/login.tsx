import { FreshContext, Handlers, LayoutConfig, PageProps } from "$fresh/server.ts";
import { LoginForm } from "../components/LoginForm.tsx";
import jwt from "jsonwebtoken"
import {setCookie} from "$std/http/cookie.ts"

export const config: LayoutConfig = {
    skipInheritedLayouts: true, // Skip already inherited layouts
  };
  

export const handler: Handlers = {
    POST: async (req :Request, ctx: FreshContext) => {
        const url = new URL(req.url);
        const form = await req.formData()
        const email = form.get("email")
        const password = form.get("password");

        try{
            const response = await fetch("https://videoapp-api.deno.dev/checkuser", {
                method: "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            if(response.status === 404){
                return ctx.render({message: "Incorrect credentials or user does not exist"})
            }
            if(response.status === 400){
                throw new Error ("Usuario no encontrado o datos incorrectos");
            }
            if(response.status === 200){
                const JWT_SECRET = Deno.env.get("JWT_SECRET");
                if(!JWT_SECRET){
                    throw new Error("JWT_SECRET is not set in the environment")
                }

                const data = await response.json()
                const token = jwt.sign({name: data.name, email, id: data.id}, JWT_SECRET,{
                    expiresIn: "24h",
                })

                const headers = new Headers();
                setCookie(headers, {
                    name: "auth",
                    value: token,
                    sameSite: "Lax",
                    domain: url.hostname,
                    path :"/",
                    secure: true
                })
                headers.set("location", "/videos");
                return new Response (null,{
                    status:303,
                    headers
                })
            }
            return;
        }catch(e){
            console.error(e)
        }
    }
}



const Page = (props: PageProps) => {
    return(
        <LoginForm message={props.data?.message}/>
    )
}

export default Page;