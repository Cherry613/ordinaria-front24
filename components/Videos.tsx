import { FunctionComponent } from "preact";
import { VideoType } from "../types.ts";
import { Fav } from "../islands/Fav.tsx";



export const Videos: FunctionComponent<{videos: VideoType[]}> = ({videos}) => {

    return(
        <div class="video-list-container">
            {videos.map((elem) => {
                return(
                    <div class="video-item" key={elem.id}>
                        <a href={`/video/${elem.id}`}  class="video-link">
                            <img src={elem.thumbnail} alt={elem.title} class="video-thumbnail"/>
                            <div class="video-info">
                                <h3 class="video-info">{elem.title}</h3>
                                <p class="video-description">{elem.description}</p>
                                <p class="video-release-date">Release date: {elem.date}</p>
                            </div>
                        </a>
                        <Fav video={elem}/>
                    </div>
                )
            })}
        </div>
    )
}