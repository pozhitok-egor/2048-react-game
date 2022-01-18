import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {Route, Switch} from "react-router";
import Button from "../../shared/components/Button";
import Main from "./components/Main";
import Settings from "./components/Settings";
import Sound from "./components/Sound";
import {BurgerButton, Header, Items, Logo, LogoText, MenuBlock} from "./Menu.styled";

const Menu = () => {
  // TODO: Remove with redux store data
  const [nightmode] = useState(false);
  const [menuState, setMenuState] = useState(false);

  function changeMenuShowState( value: boolean ) {
    setMenuState(value)
  }

  return (
    <MenuBlock {...{nightmode, menuState}}>
      <Header>
        <Logo>
          <LogoText>
            2048
          </LogoText>
          <p>
            Join the numbers and get to the <b>2048 tile</b>!
          </p>
        </Logo>
        <BurgerButton>
          <Button onClick={() => changeMenuShowState(!menuState)}>
            { menuState ?
              <FontAwesomeIcon icon={faTimes} />
             :
              <FontAwesomeIcon icon={faBars} />
            }
          </Button>
        </BurgerButton>
      </Header>
      <Items menuState={menuState}>
        <Switch>
          <Route path="/settings" render={() => <Settings />} />
          <Route path="/sound" render={() => <Sound />} />
          <Route path="/*" render={() => <Main />} />
        </Switch>
      </Items>
    </MenuBlock>
  );
};

export default Menu;
