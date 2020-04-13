import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from '../_Shared/ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: auto;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

function SingleItem({ id }) {
  console.log(id);
  return (
    <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
      {({ error, loading, data }) => {
        if (!data) return null;
        const { item } = data;
        if (error) return <Error error={error} />;
        if (loading) return <p>Loading!</p>;
        if (!data.item) return <p>No item found!</p>;
        return (
          <SingleItemStyles>
            <Head>
              <title>Sick Fits | {item.title}</title>
            </Head>
            <img src={data.item.largeImage} />
            <div className="details">
              <h2>Viewing {item.title}</h2>
              <p>{item.description}</p>
            </div>
          </SingleItemStyles>
        )
      }}
    </Query>
  );
}

export default SingleItem;
export { SINGLE_ITEM_QUERY };