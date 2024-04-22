import Navbar from "./Navbar";

function Header() {

    return (
        <>
            <header>
                <img className="logo" alt="header logo" src="https://3wacademy.fr/assets/icons/meta.jpg" />
                <Navbar />
                <img className="account" alt="my account" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMJfyExEvZrs4fh94PPp9XPf8dGlKTXxqlysKVE4tq4w&s" />
            </header>
        </>
    )

}

export default Header;