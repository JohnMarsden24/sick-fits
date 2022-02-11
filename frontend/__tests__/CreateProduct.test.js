import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';

import wait from 'waait';
import CreateProduct, {
  CREATE_PRODUCT_MUTATION,
} from '../components/CreateProduct';
import { ALL_PRODUCTS_QUERY } from '../components/Products';
import { fakeItem } from '../lib/testUtils';

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

const item = fakeItem();

const mocks = [
  {
    request: {
      query: CREATE_PRODUCT_MUTATION,
      variables: {
        name: item.name,
        description: item.description,
        image: '',
        price: item.price,
      },
    },
    result: {
      data: {
        createProduct: {
          ...item,
          id: 'test',
          __typename: 'Item',
        },
      },
    },
  },
  {
    request: {
      query: ALL_PRODUCTS_QUERY,
      variables: { skip: 0, first: 2 },
    },
    result: {
      data: {
        allProducts: [item],
      },
    },
  },
];

describe('<CreateProduct/>', () => {
  it('Renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );

    expect(container).toMatchSnapshot();
  });

  it('Handles the updating', async () => {
    const { container } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );
    await userEvent.type(screen.getByPlaceholderText('Name'), item.name);
    await userEvent.type(screen.getByPlaceholderText('Price'), `${item.price}`);
    await userEvent.type(
      screen.getByPlaceholderText('Description'),
      item.description
    );

    expect(screen.getByDisplayValue(item.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.price)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.description)).toBeInTheDocument();
  });

  it('Creates the items when the form is submitted', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <CreateProduct />
      </MockedProvider>
    );
    await userEvent.type(screen.getByPlaceholderText('Name'), item.name);
    await userEvent.type(screen.getByPlaceholderText('Price'), `${item.price}`);
    await userEvent.type(
      screen.getByPlaceholderText('Description'),
      item.description
    );

    await userEvent.click(screen.getByText('Add product'));
    await waitFor(() => wait(1));
    expect(Router.push).toHaveBeenCalled();
    expect(Router.push).toHaveBeenCalledWith({ pathname: '/product/test' });
  });
});
