import { useEffect, useState } from "react";
import Flashcard from "./Flashcard";
import type { VocabItem } from "../data/vocab";
import { useLocalStorage } from "../hooks/useLocalStorage";
import styles from "./CardList.module.css";
import { Button, Col, Flex, Row, Statistic, Typography } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

interface CardListProps {
  data: VocabItem[];
  id: string;
}

const CardList = ({ data, id }: CardListProps) => {
  const { setValue: setLocalCurrIndex, value: localCurrIndex } = useLocalStorage<number>(
    `current-index-${id}`,
    0,
  );
  const [currentIndex, setCurrentIndex] = useState(localCurrIndex);

  const { setValue: setLocalKnownWords, value: localKnownWords } = useLocalStorage<number[]>(
    `known-words-${id}`,
    [],
  );
  const [knownWords, setKnownWords] = useState<Set<number>>(new Set(localKnownWords));

  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => setIsFlipped(!isFlipped);

  useEffect(() => {
    setLocalKnownWords(Array.from(knownWords));
  }, [knownWords, setLocalKnownWords]);

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % data.length;
      setLocalCurrIndex(newIndex);
      return newIndex;
    });
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? data.length - 1 : prevIndex - 1;
      setLocalCurrIndex(newIndex);
      return newIndex;
    });
  };

  const toggleKnown = () => {
    setKnownWords((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentIndex)) {
        newSet.delete(currentIndex);
      } else {
        newSet.add(currentIndex);
      }
      return newSet;
    });
  };

  if (!data || data.length === 0) {
    return <div className={styles.emptyState}>No vocabulary available.</div>;
  }

  const currentCard = data[currentIndex];
  // Safety check in case index is out of bounds
  if (!currentCard) return null;

  const isKnown = knownWords.has(currentIndex);

  return (
    <div className={styles.cardListContainer}>
      <Flex justify="flex-end">
        <Statistic
          prefix={<CheckOutlined />}
          title="Known Words"
          value={knownWords.size}
          suffix={`/ ${data.length}`}
        />
      </Flex>

      <main className={styles.cardSection}>
        <Flashcard item={currentCard} isFlipped={isFlipped} onClick={handleFlip} />

        <Button
          variant={isKnown ? "solid" : undefined}
          color={isKnown ? "primary" : undefined}
          onClick={toggleKnown}
          aria-label={isKnown ? "Mark as unknown" : "Mark as known"}
        >
          <Row gutter={5}>
            <Col>{isKnown ? <CheckCircleFilled /> : <CheckCircleOutlined />}</Col>
            <Col>{isKnown ? "Mastered" : "Mark as Known"}</Col>
          </Row>
        </Button>
      </main>

      <Row align="middle" justify="center" gutter={10}>
        <Col>
          <Button onClick={prevCard} aria-label="Previous card" icon={<ArrowLeftOutlined />}>
            Prev
          </Button>
        </Col>

        <Col>
          <Text>
            {currentIndex + 1} / {data.length}
          </Text>
        </Col>

        <Col>
          <Button onClick={nextCard} aria-label="Next card" icon={<ArrowRightOutlined />}>
            Next
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CardList;
