import { Layout, Menu, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import styles from './header.module.css';

const AppLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine selected key based on path
  const selectedKey = location.pathname === "/" ? "home" : "other";

  const items = [
    {
      key: "home",
      label: <Link to="/">Home</Link>,
    },
  ];

  const onTitleClick = useCallback(() => navigate(`/`), [navigate])

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className={styles.title} onClick={onTitleClick}>
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
      <Content style={{ marginTop: "24px" }}>
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
