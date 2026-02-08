import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card, Col, Row, Typography, Slider, Result, Progress, Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, ReloadOutlined, HomeOutlined } from "@ant-design/icons";
import { vocabList as everyDayList } from "../data/everyDay";
import { vocabList as faceList } from "../data/face";
import type { VocabItem } from "../data/vocab";
import { ProgressService, type Box } from "../utils/progress";

const { Title, Text, Paragraph } = Typography;

const dataMap: Record<string, VocabItem[]> = {
  everyDay: everyDayList,
  face: faceList,
};

type TestState = "setup" | "testing" | "summary";

const TestPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const allData = categoryId ? dataMap[categoryId] : [];

  const [state, setState] = useState<TestState>("setup");
  const [testCount, setTestCount] = useState<number>(10);
  const [testQueue, setTestQueue] = useState<VocabItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [results, setResults] = useState<{ word: VocabItem; correct: boolean; oldBox: Box; newBox: Box }[]>([]);

  // For progress bar
  const progressPercent = testQueue.length > 0 ? (currentIndex / testQueue.length) * 100 : 0;

  const handleStart = () => {
    const queue = ProgressService.getDueWords(allData, testCount);
    setTestQueue(queue);
    setCurrentIndex(0);
    setResults([]);
    setIsRevealed(false);
    setState("testing");
  };

  const handleAnswer = (correct: boolean) => {
    const currentWord = testQueue[currentIndex];
    const currentProgress = ProgressService.getWordProgress(ProgressService.loadProgress(), currentWord.chinese);

    // Update progress
    const updatedMap = ProgressService.updateProgress(ProgressService.loadProgress(), currentWord.chinese, correct);
    const newProgress = ProgressService.getWordProgress(updatedMap, currentWord.chinese);

    setResults([
      ...results,
      {
        word: currentWord,
        correct,
        oldBox: currentProgress.box,
        newBox: newProgress.box,
      },
    ]);

    if (currentIndex < testQueue.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsRevealed(false);
    } else {
      setState("summary");
    }
  };

  const handleRetry = () => {
    setState("setup");
    setTestCount(10);
    setResults([]);
    setCurrentIndex(0);
  };

  if (!allData || allData.length === 0) {
    return (
      <Result
        status="404"
        title="Category Not Found"
        subTitle="There is no data for this category."
        extra={
          <Button type="primary">
            <Link to="/">Back Home</Link>
          </Button>
        }
      />
    );
  }

  if (state === "setup") {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", padding: "2rem 0" }}>
        <Title level={2}>Test Setup</Title>
        <Paragraph>
          Select how many words you want to practice. The system will prioritize words you need to review.
        </Paragraph>
        <div style={{ margin: "3rem 0" }}>
          <Text>Number of Words: {testCount}</Text>
          <Slider
            min={5}
            max={Math.min(50, allData.length)}
            value={testCount}
            onChange={setTestCount}
            tooltip={{ open: true }}
          />
        </div>
        <Button type="primary" size="large" onClick={handleStart}>
          Start Test
        </Button>
      </div>
    );
  }

  if (state === "testing") {
    const currentWord = testQueue[currentIndex];
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "1rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <Progress percent={Math.round(progressPercent)} showInfo={false} />
          <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
            Word {currentIndex + 1} of {testQueue.length}
          </div>
        </div>

        <Card
          style={{
            minHeight: 300,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
          bodyStyle={{ width: "100%" }}
        >
          <Title level={1} style={{ fontSize: "4rem", marginBottom: "1rem" }}>
            {currentWord.chinese}
          </Title>

          {isRevealed ? (
            <>
              <Title level={3} style={{ color: "#1890ff", margin: 0 }}>
                {currentWord.pinyin}
              </Title>
              <Paragraph style={{ fontSize: "1.2rem", marginTop: "1rem" }}>{currentWord.english_meaning}</Paragraph>
              <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
                <Button
                  danger
                  size="large"
                  icon={<CloseCircleOutlined />}
                  onClick={() => handleAnswer(false)}
                  style={{ minWidth: 120 }}
                >
                  Incorrect
                </Button>
                <Button
                  type="primary"
                  style={{ backgroundColor: "#52c41a", borderColor: "#52c41a", minWidth: 120 }}
                  size="large"
                  icon={<CheckCircleOutlined />}
                  onClick={() => handleAnswer(true)}
                >
                  Correct
                </Button>
              </div>
            </>
          ) : (
            <div style={{ marginTop: "3rem" }}>
              <Button type="primary" size="large" onClick={() => setIsRevealed(true)}>
                Reveal
              </Button>
            </div>
          )}
        </Card>
      </div>
    );
  }

  // Summary View
  const score = results.filter((r) => r.correct).length;
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "1rem" }}>
      <Result
        status="success"
        title="Session Complete!"
        subTitle={`You got ${score} out of ${results.length} words correct.`}
        extra={[
          <Button type="primary" key="retry" icon={<ReloadOutlined />} onClick={handleRetry}>
            Test Again
          </Button>,
          <Link to="/" key="home">
            <Button icon={<HomeOutlined />}>Back Home</Button>
          </Link>,
        ]}
      />

      <Title level={4} style={{ marginTop: "2rem" }}>
        Summary
      </Title>
      <Row gutter={[16, 16]}>
        {results.map((res, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card
              size="small"
              title={res.word.chinese}
              extra={res.correct ? <Tag color="success">Correct</Tag> : <Tag color="error">Incorrect</Tag>}
            >
              <p>{res.word.pinyin}</p>
              <p>{res.word.english_meaning}</p>
              <div style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "#888" }}>
                SRS: Box {res.oldBox} → {res.newBox}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TestPage;
