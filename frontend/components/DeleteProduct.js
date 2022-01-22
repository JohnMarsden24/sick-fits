import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const update = (cache, payload) => {
  cache.evict(cache.identify(payload.data.deleteProduct));
};

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: {
      id,
    },
    update,
  });

  const handleClick = async () => {
    if (confirm('Are you sure want to delete this item?')) {
      try {
        await deleteProduct();
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <button type="button" onClick={handleClick} disabled={loading}>
      {children}
    </button>
  );
}
