import { useState, useEffect } from "react";
import exampleService from "../../services/example.service";
import { useParams } from "react-router-dom";
import FavouritesSection from "../../components/FavouritesSection/FavouritesSection";
import CreatedSection from "../../components/CreatedSection/CreatedSection";
import NavLogIn from "../../components/NavLogIn/NavLogIn";
import "./UserProfile.css";

function UserProfile({toggleHiddenH}) {
  const [user, setUser] = useState(false);
  const [favourites, setFavourites] = useState(false);
  const [created, setCreated] = useState(true);
  const [thisUser, setThisUser] = useState(false);
  const [check, setCheck] = useState(false);

  const { id } = useParams();

  const toggleFavourites = () => {
    setFavourites(true);
    setCreated(false);
  };
  const toggleCreated = () => {
    setCreated(true);
    setFavourites(false);
  };

  const getThisUser = async () => {
    try {
      const response = await exampleService.getUser();

      setThisUser(response.data);
      const checked = response.data.following.filter((el) => el._id === id);

      //double bang - transforms into boolean
      setCheck(!!checked.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await exampleService.getSpecificUser(id);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const follow = async () => {
    try {
      await exampleService.followUser(id);
      setCheck(true);
    } catch (error) {
      console.log(error);
    }
  };

  const dontFollow = async () => {
    try {
      await exampleService.notFollowingUser(id);
      setCheck(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getThisUser();
  }, []);

  return (
    <>
    <NavLogIn toggleHiddenH={toggleHiddenH} />
    <section>
      {user && (
        <>
          <div className="profile">
            <img className="profilePic" src={user.imgUrl} alt={user.username} />
            <h2>{user.username}</h2>
            {!user.following.length ? (
              <h2>Following: {user.following.length}</h2>
            ) : (
              <button className="button-48">
                <span className="text">Following: {user.following.length}</span>
              </button>
            )}
            <div className="editDiv">
              {thisUser && check ? (
                <button className="button-48 " onClick={dontFollow}>
                 <span className="text">Unfollow</span>
                </button>
              ) : (
                <button className="button-48" onClick={follow}>
                <span className="text">Follow</span>
                </button>
              )}
            </div>
          </div>
        </>
      )}
      <div className="postSection">
        <div className="createdDiv">
          <button className="button-48 editDiv" onClick={toggleCreated}>
            <span className="text">Created</span>
          </button>
        </div>
        <div>
          <button className="button-48 editDiv" onClick={toggleFavourites}>
            <span className="text">Favourites</span>
          </button>
        </div>
      </div>
      {user && !favourites && <CreatedSection user={user} />}
      {user && !created && <FavouritesSection user={user} />}
    </section>
    </>
  );
}

export default UserProfile;
