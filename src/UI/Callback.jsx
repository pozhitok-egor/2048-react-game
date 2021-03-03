import React from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../store/actions';

const Callback = (props) => {
  var search = props.location.search.substring(1);

  const data = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

  axios.get("https://api.github.com/user", {
    headers: {
      authorization: `Bearer ${data.token}`,
      accept: 'application/json'
    }
  })
  .then((res) => {
    console.log(res);
    axios.post('https://twenty-forty-eight.herokuapp.com/user/login',
    {
      username: res.data.login,
      password: res.data.node_id
    } ,
    {
      method: 'post',
      headers: {
        accept: 'application/json'
      }
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
      props.fetchUser(res.data.token);
    }).catch((err) => console.log(err.message))
  })

  return <Redirect to="/" />
}

const mapDispatchToProps = {
  fetchUser
}

export default connect(null, mapDispatchToProps)(Callback);