import React from 'react';
import dynamic from 'next/dynamic';
import { wrapper } from 'store';
import { getByIdNewlooks } from 'store/newlooks/actions';

const NewLookDetail = dynamic(() => import('containers/NewLookDetail'), { ssr: false });

const index = props => <NewLookDetail {...props} />;

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, query }) => {
    const { id } = query;
    
  const { payload } = await store.dispatch(getByIdNewlooks({
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
    props: {
      newLook: payload?.data,
    },
  };
  },
);

index.propTypes = {};

export default index;
