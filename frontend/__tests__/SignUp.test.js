import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import SignUp, { SIGN_UP_MUTATION } from '../components/SignUp';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

const user = fakeUser();
const password = 'test';

const mocks = [
  {
    request: {
      query: SIGN_UP_MUTATION,
      variables: {
        name: user.name,
        email: user.email,
        password,
      },
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: 'test',
          name: user.name,

          email: user.email,
        },
      },
    },
  },
  // {
  //   request: {
  //     query: CURRENT_USER_QUERY,
  //   },
  //   result: { data: { authenticatedItem: user } },
  // },
];

describe('<SignUp/>', () => {
  it('Renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <SignUp />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('Calls the mutation properly', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <SignUp />
      </MockedProvider>
    );

    await userEvent.type(screen.getByPlaceholderText('Your name'), user.name);
    await userEvent.type(
      screen.getByPlaceholderText('Your email address'),
      user.email
    );
    await userEvent.type(screen.getByPlaceholderText('Password'), password);
    await userEvent.click(screen.getByText('Sign up!'));

    await screen.findByText(
      `Signed up with ${user.email}, please go ahead and sign in`
    );
  });
});
