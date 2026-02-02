import { Layout, Menu, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AppLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();

  // Determine selected key based on path
  const selectedKey = location.pathname === '/' ? 'home' : 'other';

  const items = [
    {
      key: 'home',
      label: <Link to="/">Home</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', marginRight: '2rem' }}>
          Chinese Flashcards
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px', marginTop: '24px' }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default AppLayout;
