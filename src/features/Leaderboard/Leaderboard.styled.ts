import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  font-size: 1rem;
  & th {
    font-size: 1.6rem;
  }
  & td {
    max-width: auto;
    font-size: 1.4rem;
  }
  & td {
    max-width: 80px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .position {
    font-weight: bold;
  }
`;

export const MainBlock = styled.div`
  width: auto;
  @media (max-width: 991px) {
    display: none;
  }
`
