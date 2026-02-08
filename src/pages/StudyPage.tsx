import { useParams, Link } from "react-router-dom";
import { Button, Result, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import CardList from "../components/CardList";
import { vocabList as everyDayList } from "../data/everyDay";
import { vocabList as faceList } from "../data/face";
import type { VocabItem } from "../data/vocab";

const { Title } = Typography;

// Map category IDs to data sources
const dataMap: Record<string, VocabItem[]> = {
  everyDay: everyDayList,
  face: faceList,
};

const StudyPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const data = categoryId ? dataMap[categoryId] : undefined;

  if (!data) {
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
      <CardList data={data} id={categoryId || "default"} />
    </div>
  );
};

export default StudyPage;
