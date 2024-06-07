

export const Logout = () => {
    const out = () => {
        document.cookie= "auth=; path=/;";
        window.location.href="/login";
    }

    return(
        <a class="logout-button" onClick={() => out()}> Logout</a>
    )
}