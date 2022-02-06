import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/dist/client/link';
import gql from 'graphql-tag';
import styled from 'styled-components';

import ErrorMessage from '../components/ErrorMessage';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import formatMoney from '../lib/formatMoney';

const USER_ORDER_QUERY = gql`
  query USER_ORDER_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

const countItemsInOrder = (order) =>
  order.items.reduce((prev, curr) => prev + curr.quantity, 0);

export default function OrdersPage() {
  const { data, error, loading } = useQuery(USER_ORDER_QUERY);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { allOrders } = data;

  return (
    <div>
      <Head>
        <title>Your orders {allOrders.length}</title>
      </Head>
      <h2>You have {allOrders.length} orders!</h2>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>
                    {countItemsInOrder(order)} item{order.items.length && 's'}
                  </p>
                  <p>
                    {order.items.length} Product{order.items.length && 's'}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={`image-${item.id}`}
                      src={item.photo?.image?.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
}
