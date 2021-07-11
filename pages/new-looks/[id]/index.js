import React from 'react';
import dynamic from 'next/dynamic';
import { wrapper } from 'store';
import { getByIdNewlooks } from 'store/newlooks/actions';

const NewLookDetail = dynamic(() => import('containers/NewLookDetail'), { ssr: false });

const index = () => <NewLookDetail />;

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, query }) => {
    const { id } = query;
    
  await store.dispatch(getByIdNewlooks({
    data: {
      _id: id,
    },
    options: {
      isRequestApi: true,
      // extraParams: {
      //   includes: 'users',
      // },
    },
  }));
  return {
    props: {},
  };
  },
);

index.propTypes = {};

export default index;
