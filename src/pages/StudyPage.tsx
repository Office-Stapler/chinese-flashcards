import { useParams, Link } from "react-router-dom";
import { Button, Result, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import CardList from "../components/CardList";
import { VOCAB_MAP as dataMap } from "../data/category_maps";
import { stringToCategoryId } from "../utils/vocab";

const { Title } = Typography;

const StudyPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const currCategoryId = stringToCategoryId(categoryId);

  if (!currCategoryId) {
    return (
      <Result
        status="404"
        title="Category Not Found"
        subTitle="Sorry, the vocabulary category you visited does not exist."
        extra={
          <Button type="primary">
            <Link to="/">Back Home</Link>
          </Button>
        }
      />
    );
  }

  const data = dataMap[currCategoryId];
  const title = categoryId === "everyDay" ? "Everyday Words" : "Vocabulary";

  return (
    <div>
      <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>
          <Button icon={<ArrowLeftOutlined />} type="text">
            Back
          </Button>
        </Link>
        <Title level={3} style={{ margin: 0 }}>
          {title}
        </Title>
      </div>
      <CardList data={data} id={currCategoryId} />
    </div>
  );
};

export default StudyPage;
