import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import icon_rsschool from "../../assets/images/rs_school.svg";
import {Contacts, FooterBlock, InfoText, KeysText, Link} from "./Footer.styled";

const Footer = () => {
  return (
    <FooterBlock>
      <InfoText>
        <b>HOW TO PLAY:</b> You need to move the tiles. When
        two tiles with the same number touch, they <b>merge into one</b>!
      </InfoText>
      <Contacts>
        <Link href="https://github.com/pozhitok-egor">
          <FontAwesomeIcon icon={faGithub} /> pozhitok-egor
        </Link>
        2021
        <Link href="https://rs.school/js/">
          <img src={icon_rsschool} alt="The Rolling Scopes School" />
        </Link>
      </Contacts>
      <KeysText>
        <b>R</b> Restart | <b>F</b> Nightmode | <b>WASD & Arrows - </b> move
      </KeysText>
    </FooterBlock>
  );
};

export default Footer;
