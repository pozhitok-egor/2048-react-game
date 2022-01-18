import {Table} from "./Leaderboard.styled";

const Leaderboard = () => {
  // TODO: Replace with redux store data

  return (
    <div style={{width: "auto"}}>
      <h4 style={{textAlign: "center", margin: "2rem 0"}}>
        Difficulty: Medium
      </h4>
      <Table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="position">#1</td>
            <td>Test user 123</td>
            <td>9000000</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Leaderboard;
