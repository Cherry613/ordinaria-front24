import { FunctionComponent } from "preact";
import { VideoType } from "../types.ts";
import { useState } from "preact/hooks";


export const Fav: FunctionComponent<{video: VideoType}> = ({video}) => {
    const [fav, setFav] = useState<boolean>(video.fav);

    const marcarFav = async () => {
        const response = await fetch(`https://videoapp-api.deno.dev/fav/000000000000000000000000/${video.id}`,{
            method: "POST",
        })
        if(response.status===200){
           setFav(!fav);
           return;
        }
    }

    return(
        <button class="fav-button" onClick={() => marcarFav()}>{fav === true? "❤️ Remove from Favorite" : "🤍 Add to Favorites"}</button>
    )
}