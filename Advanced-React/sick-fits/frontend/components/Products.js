import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
  # Write your query or mutation here
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListWithStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...{error.message}</p>;
  }

  return (
    <div>
      <ProductsListWithStyles>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListWithStyles>
    </div>
  );
}
