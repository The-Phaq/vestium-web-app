import React from 'react';
import Divider from 'components/Divider';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { getCurrentTab } from 'utils/tools';
import Link from 'next/link';
import { useTranslation } from 'i18n';
import { PlusCircleFilled } from '@ant-design/icons';
import SiderWrapper from './styles';

const buttons = [
  {
    text: 'button.newLook',
    isPrimary: true,
    url: '/',
    key: 'new-looks',
  },
  {
    text: 'button.boutique',
    url: '/boutique',
    key: 'boutique',
  },
  {
    text: 'button.vestiumSista',
    url: '/my-creations',
    key: 'my-creations',
  },
  {
    text: 'button.createNewLook',
    isHighlight: true,
    Icon: PlusCircleFilled,
    url: '/create-new-look',
    key: 'create-new-look',
  },
];

const Sider = ({ FilterSection, pageSource }) => {
  const { pathname } = useRouter();
  const url = getCurrentTab(pathname, 1);
  const { t } = useTranslation();

  return (
    <SiderWrapper width={255}>
      <div className="sider-content">
        <div className="logo">
          <img
            alt="logo"
            src="/images/logo.png"
          />
        </div>
        <div className="title sider-title">
          {t('app.appName')}
        </div>
        <div className="sider-content-children">
          <div className="actions-section">
            {buttons.map(({ Icon, text, key, isHighlight, url: btnUrl }, index) => (
              <Link href={btnUrl} key={`button-${String(index)}`}>
                <Button
                  {...(url || 'new-looks') === key && {
                    type: 'primary',
                  }}
                  {...Icon && {
                    icon: <Icon />,
                  }}
                  {...isHighlight && {
                    className: 'highlight-btn',
                  }}
                >
                  {t(text)}
                </Button>
              </Link>
            ))}
          </div>
          <Divider className="divider" />
          <FilterSection pageSource={pageSource} />
        </div>
      </div>
      <Divider className="divider-vertical" vertical color="#fff" />
    </SiderWrapper>
  )
}

export default Sider;
