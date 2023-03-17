import "./ProfilePage.css";
import { useState, useEffect } from "react";
import exampleService from "../../services/example.service";
import { Link, useNavigate } from "react-router-dom";
import FavouritesSection from "../../components/FavouritesSection/FavouritesSection";
import CreatedSection from "../../components/CreatedSection/CreatedSection";
import Following from "../../components/Following/Following";
import NavLogIn from "../../components/NavLogIn/NavLogIn";

function ProfilePage({ toggleHiddenH }) {
  const [user, setUser] = useState(null);
  const [favourites, setFavourites] = useState(false);
  const [created, setCreated] = useState(true);
  const [hiddenF, setHiddenF] = useState(true);

  const navigate = useNavigate();

  const toggleFavourites = () => {
    setFavourites(true);
    setCreated(false);
  };

  const toggleCreated = () => {
    setCreated(true);
    setFavourites(false);
  };

  const toggleFollowing = () => {
    setHiddenF(!hiddenF);
  };

  const getUser = async () => {
    try {
      const response = await exampleService.getUser();
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <NavLogIn toggleHiddenH={toggleHiddenH} />
      <section>
        {!hiddenF && <Following toggleFollowing={toggleFollowing} />}
        {user && (
          <div>
            <img src={user.imgUrl} alt={user.username} />
            <h2>{user.username}</h2>
            {!user.following.length ? (
              <h2>Following: {user.following.length}</h2>
            ) : (
              <button onClick={toggleFollowing}>
                Following: {user.following.length}
              </button>
            )}
          </div>
        )}
        <div>
          <Link to={"/editProfile"}>Edit Profile</Link>
        </div>
        <button onClick={toggleCreated}>Created</button>{" "}
        <button onClick={toggleFavourites}>Favourites</button>
        {user && !favourites && <CreatedSection user={user} />}
        {user && !created && <FavouritesSection user={user} />}
      </section>
    </>
  );
}

export default ProfilePage;
