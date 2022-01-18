import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import icon_rsschool from "../../assets/images/rs_school.svg";
import {Contacts, FooterBlock, Link, Text} from "./Footer.styled";

const Footer = () => {
  return (
    <FooterBlock>
      <Text>
        <b>HOW TO PLAY:</b> Use your <b>arrow keys</b> to move the tiles. When
        towo tiles with the same number touch, they <b>merge into one</b>!
      </Text>
      <Contacts>
        <Link href="https://github.com/pozhitok-egor">
          <FontAwesomeIcon icon={faGithub} /> pozhitok-egor
        </Link>
        2021
        <Link href="https://rs.school/js/">
          <img src={icon_rsschool} alt="The Rolling Scopes School" />
        </Link>
      </Contacts>
      <Text>
        <b>R</b> Restart | <b>F</b> Nightmode | <b>WASD</b> move
      </Text>
    </FooterBlock>
  );
};

export default Footer;
