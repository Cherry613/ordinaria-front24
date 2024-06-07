import { FreshContext } from "$fresh/server.ts";
import { Menu } from "../components/Menu.tsx";

export default async function Layout(req: Request, ctx: FreshContext) {


  return (
    <div class="page-container">
        <header class="header-container">
            <Menu username={`${ctx.state.name}` || "unknown"}/>
        </header>
        <ctx.Component />
    </div>
  );
}