import React from 'react';
import dynamic from 'next/dynamic';
import { wrapper } from 'store';
import withSession from 'hoc/session';
import { getByIdItems } from 'store/items/actions';
import { setInitHeader } from 'utils/request';

const BoutiqueDetail = dynamic(() => import('containers/BoutiqueDetail'), { ssr: false });

const index = props => <BoutiqueDetail {...props} />;

export const getServerSideProps = withSession(wrapper.getServerSideProps(
  async ({ store, query, req }) => {
    const token = req.session.get('token');
    if (token) {
      setInitHeader({
        token,
      })
    }
    const { id } = query;
    
  const { payload } = await store.dispatch(getByIdItems({
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
      boutique: payload?.data,
    },
  };
  },
));

index.propTypes = {};

export default index;
