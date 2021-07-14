import React from 'react';
import dynamic from 'next/dynamic';
import { wrapper } from 'store';
import withSession from 'hoc/session';
import { getByIdNewlooks } from 'store/newlooks/actions';
import { setInitHeader } from 'utils/request';

const NewLookDetail = dynamic(() => import('containers/NewLookDetail'), { ssr: false });

const index = props => <NewLookDetail {...props} />;

export const getServerSideProps = withSession(wrapper.getServerSideProps(
  async ({ store, query, req }) => {
    const token = req.session.get('token');
    if (token) {
      setInitHeader({
        token,
      })
    }
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
));

index.propTypes = {};

export default index;
