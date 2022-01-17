import React from 'react';
import { MenuBlock, Button} from './Elements';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { newField } from '../../store/actions';

const Main = (props) => {
  return (
    <MenuBlock>
        <Button onClick={(e) => props.newField(3)}>New Game</Button>
        <Link to='/settings'><Button>Settings</Button></Link>
        <Link to='/sound'><Button>Sound</Button></Link>
    </MenuBlock>
  )
}

const mapDispatchToProps = {
  newField
}

export default connect(null, mapDispatchToProps)(Main);
