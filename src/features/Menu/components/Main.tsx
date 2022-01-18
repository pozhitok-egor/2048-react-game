import {MouseEvent, useState} from "react";
import {Link} from "react-router-dom";
import Button from "../../../shared/components/Button";

const Main = () => {
  // TODO: replace with redux store data
  const [isAuthorized] = useState<boolean>(true);
  const user = {
    name: "User",
    isAuthorized,
  };

  const newGame = (e: MouseEvent) => {
    /* TODO: Implement new game creation */
  };

  return (
    <>
      <div>
        {isAuthorized ? (
          <div
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <h4 style={{textAlign: "center", width: "100%"}}>{user.name}</h4>
            <Button>Logout</Button>
          </div>
        ) : (
          <div style={{display: "flex", gap: "2rem", alignContent: "stretch"}}>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        )}
      </div>
      <Button onClick={(e) => newGame(e)}>New Game</Button>
      <Link to="/settings">
        <Button>Settings</Button>
      </Link>
      <Link to="/sound">
        <Button>Sound</Button>
      </Link>
    </>
  );
};

export default Main;
