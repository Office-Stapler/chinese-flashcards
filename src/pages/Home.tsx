import { Button, Card, Col, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data/category_maps";

import styles from "./home.module.css";

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Select a Category</Title>
        <Paragraph>Choose a vocabulary set to start your practice session.</Paragraph>
      </div>
      <Row gutter={[16, 16]} justify="center" wrap={true}>
        {CATEGORIES.map((category) => (
          <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
            <Card
              size="default"
              hoverable={true}
              title={category.title}
              className={styles.card}
              styles={{
                body: {
                  flexGrow: 1,
                },
              }}
              onClick={() => navigate(`/category/${category.id}`)}
              actions={[
                <Button
                  type="link"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/test/${category.id}`);
                  }}
                >
                  Test
                </Button>,
              ]}
            >
              <div className={styles.cardInnerContent}>
                <p>{category.description}</p>
                <p style={{ color: "#888", fontSize: "0.9em" }}>{category.count} words</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
