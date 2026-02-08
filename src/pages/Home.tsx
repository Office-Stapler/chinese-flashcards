import { Button, Card, Col, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { vocabList as everyDayList } from '../data/everyDay';
import { vocabList as faceList } from '../data/face';

const { Title, Paragraph } = Typography;

type Category = {
  id: string;
  title: string;
  description: string;
  count: number;
}

const categories: Category[] = [
  {
    id: 'everyDay',
    title: 'Everyday Words',
    description: 'Common vocabulary used in daily life.',
    count: everyDayList.length,
  },
  {
    id: 'face',
    title: 'Face',
    description: 'Vocabulary related to the face.',
    count: faceList.length,
  },
  // Future categories can be added here
] as const;

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Select a Category</Title>
        <Paragraph>Choose a vocabulary set to start your practice session.</Paragraph>
      </div>
      <Row gutter={[16, 16]} justify="center">
        {categories.map((category) => (
          <Col xs={24} sm={12} md={8} lg={6} key={category.id}>
            <Card
              hoverable={true}
              title={category.title}
              onClick={() => navigate(`/category/${category.id}`)}
              actions={[
                <Button type="link" onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/test/${category.id}`);
                }}>Test</Button>
              ]}
            >
              <p>{category.description}</p>
              <p style={{ color: '#888', fontSize: '0.9em' }}>{category.count} words</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
