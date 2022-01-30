import styled from 'styled-components';

import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import RequestReset from '../components/RequesttReset';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

export default function SignInPage() {
  return (
    <Grid>
      <SignIn />
      <SignUp />
      <RequestReset />
    </Grid>
  );
}