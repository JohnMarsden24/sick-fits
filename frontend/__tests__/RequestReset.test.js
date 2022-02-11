import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import RequestReset, {
  REQUEST_RESET_MUTATION,
} from '../components/RequestReset';
import { fakeUser } from '../lib/testUtils';

const user = fakeUser();

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: {
        email: user.email,
      },
    },
    result: {
      data: {
        sendUserPasswordResetLink: null,
      },
    },
  },
];

describe('<RequestReset/>', () => {
  it('Renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it('Calls the mutation properly', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );
    await userEvent.type(
      screen.getByPlaceholderText('Your email address'),
      user.email
    );
    await userEvent.click(screen.getByText('Request reset'));

    await screen.findByText('Success! Check your email for a link');
  });
});
