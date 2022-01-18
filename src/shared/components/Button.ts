import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #7D7171;
  border-radius: 10px;
  font-family: 'Lato', sans-serif;
  text-transform: uppercase;
  font-size: 18px;
  background-color: transparent;
  &:hover {
    background-color: #BBADA0;
    color: #EDE3DA;
  }
  &:disabled {
    color: rgb(150, 150, 150);
    background-color: rgb(220, 220, 220);
    border-color: rgb(150, 150, 150);
  }
`

export default Button;