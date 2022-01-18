import {useState} from "react";
import {Link} from "react-router-dom";
import Button from "../../../shared/components/Button";
import SettingsItem from "./shared/SettingsItem";

const Sound = () => {
  // TODO: replace with redux store data
  const [music, setMusicState] = useState<boolean>(true);
  const [sound, setSoundState] = useState<boolean>(true);
  const [musicVolume, setMusicVolume] = useState<number>(0.5);
  const [soundVolume, setSoundVolume] = useState<number>(0.5);

  const changeMusicState = (value: boolean) => {
    // TODO: replace with redux action dispatch
    setMusicState(value);
  };

  const changeMusicVolume = (value: number) => {
    // TODO: replace with redux action dispatch
    setMusicVolume(value);
  };

  const changeSoundState = (value: boolean) => {
    // TODO: replace with redux action dispatch
    setSoundState(value);
  };

  const changeSoundVolume = (value: number) => {
    // TODO: replace with redux action dispatch
    setSoundVolume(value);
  };

  return (
    <>
      <Link to="/">
        <Button>Back</Button>
      </Link>
      <SettingsItem>
        <h4>Music</h4>
        <div>
          <Button onClick={(e) => changeMusicState(!music)}>
            {music ? "OFF" : "ON"}
          </Button>
        </div>
      </SettingsItem>
      <SettingsItem>
        <h4>Music Volume</h4>
        <div>
          <input
            onChange={(e) => {
              let value = Number(e.target.value);
              changeMusicVolume(value / 30);
            }}
            type="range"
            min="0"
            max="30"
            defaultValue={musicVolume * 30}
          />
        </div>
      </SettingsItem>
      <SettingsItem>
        <h4>Sound</h4>
        <div>
          <Button onClick={(e) => changeSoundState(!sound)}>
            {sound ? "OFF" : "ON"}
          </Button>
        </div>
      </SettingsItem>
      <SettingsItem>
        <h4>Sound Volume</h4>
        <div>
          <input
            onChange={(e) => {
              let value = Number(e.target.value);
              changeSoundVolume(value / 30);
            }}
            type="range"
            min="0"
            max="30"
            defaultValue={soundVolume * 30}
          />
        </div>
      </SettingsItem>
    </>
  );
};

export default Sound;
