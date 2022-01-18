import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import IDifficulty from "../../../interfaces/IDifficulty";
import Button from "../../../shared/components/Button";
import SettingsItem from "./shared/SettingsItem";

const Settings = () => {
  const [difficulty, setDifficulty] = useState<IDifficulty>("Medium");
  // TODO: Add gamemode change functionality
  const [gamemode, setGameMode] = useState("Classic");
  // TODO: replace with redux store data
  const [size, setSize] = useState(4);
  const [color, setColor] = useState(true);
  const [nightmode, setNightmode] = useState(true);

  const changeSize = (size: number) => {
    // TODO: replace with redux action dispatch
    setSize(size);
  };

  const changeColorSettings = (value: boolean) => {
    // TODO: replace with redux action dispatch
    setColor(value);
  };

  const changeThemeSettings = (value: boolean) => {
    // TODO: replace with redux action dispatch
    setNightmode(value);
  };

  const changeGameMode = () => {
    // TODO: Add gamemode change functionality
    setGameMode(gamemode);
  };

  useEffect(() => {
    switch (size) {
      case 3:
        setDifficulty("Easy");
        break;
      case 4:
        setDifficulty("Medium");
        break;
      case 5:
        setDifficulty("Hard");
        break;
    }
  }, [size]);

  return (
    <>
      <Link to="/">
        <Button>Back</Button>
      </Link>
      <SettingsItem>
        <h4>Gamemode</h4>
        <div>
          <Button onClick={(e) => changeGameMode()}>{gamemode}</Button>
        </div>
      </SettingsItem>

      <SettingsItem>
        <h4>Difficulty</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Button
              onClick={(e) => {
                changeSize(size - 1);
              }}
              disabled={size === 3}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
          </div>

          <div style={{width: "100%"}}>{difficulty}</div>

          <div>
            <Button onClick={(e) => changeSize(size + 1)} disabled={size === 5}>
              <FontAwesomeIcon icon={faAngleRight} />
            </Button>
          </div>
        </div>
      </SettingsItem>

      <SettingsItem>
        <h4>Colored</h4>
        <div>
          <Button onClick={(e) => changeColorSettings(!color)}>
            {color ? "OFF" : "ON"}
          </Button>
        </div>
      </SettingsItem>

      <SettingsItem>
        <h4>NightMode</h4>
        <div>
          <Button onClick={(e) => changeThemeSettings(!nightmode)}>
            {nightmode ? "OFF" : "ON"}
          </Button>
        </div>
      </SettingsItem>
    </>
  );
};

export default Settings;
