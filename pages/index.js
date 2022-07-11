import React, { createRef, useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Xarrow from "react-xarrows";

const Home = () => {
  // Xarrows states
  const [startingRef, setStartingRef] = useState([]);
  const [endingRef, setEndingRef] = useState([]);
  const [startingIndex, setStartingIndex] = useState(null);
  const [endingIndex, setEndingIndex] = useState(null);

  // Linking states
  const [journey, setJourney] = useState([]);
  const [oddJourney, setOddJourney] = useState([]);
  const [evenJourney, setEvenJourney] = useState([]);
  const [highlight, setHighlight] = useState(false);
  const [clicked, setClicked] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // const columnStyle = {
  //   border: "1px solid white",
  //   padding: "10px",
  //   width: "50%",
  //   marginBottom: "30px",
  // };

  // assign 10 item to startingRef and endingRef
  const startingArr = Array.from({ length: 10 }, (_, i) => "starting point a" + (i + 1));
  const endingArr = Array.from({ length: 10 }, (_, i) => "ending point b" + (i + 1));

  useEffect(() => {
    setStartingRef((startingRef) =>
      Array(startingArr.length)
        .fill()
        .map((_, i) => startingRef[i] || createRef())
    );
    setEndingRef((endingRef) =>
      Array(endingArr.length)
        .fill()
        .map((_, i) => endingRef[i] || createRef())
    );
  }, []);

  useEffect(() => {
    startingIndex &&
      endingIndex &&
      setJourney((oldJourney) => [
        ...oldJourney,
        // startingIndex.current.textContent,
        // endingIndex.current.textContent,
        startingIndex,
        endingIndex,
      ]);
  }, [startingIndex, endingIndex]);

  // remove startingIndex and endingIndex value after stored in journey
  useEffect(() => {
    setStartingIndex(null);
    setEndingIndex(null);
  }, [journey]);

  useEffect(() => {
    const odd = [];
    const even = [];

    journey.map((item, index) => (index % 2 === 0 ? odd.push(item) : even.push(item)));

    setOddJourney(odd);
    setEvenJourney(even);
  }, [journey]);

  console.log(journey, "journey");

  return (
    <Container className="w-100">
      <h3 className="mt-4">Link the 2 columns</h3>

      <div className="d-flexjustify-content-start mb-3">
        <Button
          onClick={() => {
            setJourney([]);
            setOddJourney([]);
            setEvenJourney([]);
            setClicked([]);
            setSubmitted(false);
          }}
          disabled={submitted}
        >
          Redo
        </Button>

        <Button
          className="ms-1"
          disabled={journey.length == 0 || submitted}
          onClick={() => {
            alert("Context submitted!");
            setSubmitted(true);
          }}
        >
          Submit
        </Button>
      </div>

      <Row>
        <Col>
          {startingArr.map((item, index) => (
            <div
              style={{
                border: "1px solid white",
                padding: "10px",
                width: "50%",
                marginBottom: "30px",
                cursor: "pointer",
              }}
              key={index}
              ref={startingRef[index]}
              onClick={() => {
                setStartingIndex(startingRef[index]);
                setHighlight(true);
              }}
            >
              {item}
            </div>
          ))}
        </Col>

        <Col>
          {endingArr.map((item, index) => (
            <div
              style={{
                border: "1px solid white",
                padding: "10px",
                width: "50%",
                marginBottom: "30px",
                cursor: "pointer",
                outline:
                  highlight && !clicked.includes(endingRef[index]) ? "1px solid yellow" : "none",
                pointerEvents: clicked.includes(endingRef[index]) ? "none" : "auto",
              }}
              key={index}
              ref={endingRef[index]}
              onClick={() => {
                setEndingIndex(endingRef[index]);
                setHighlight(false);
                setClicked((prev) => [...prev, endingRef[index]]);
              }}
            >
              {item}
            </div>
          ))}
        </Col>

        <Col>
          <div style={{ display: "flex" }}>
            <div>
              {oddJourney.map((item, index) => (
                <h5 key={index}>{item.current.textContent}&nbsp;is related to&nbsp;</h5>
              ))}
            </div>

            <div>
              {evenJourney.map((item, index) => (
                <h5 key={index}>{item.current.textContent}</h5>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      {Array.from({ length: journey.length / 2 }, (_, i) => (
        <Xarrow key={i} start={oddJourney.length > 0 && oddJourney[i]} end={evenJourney[i]} />
      ))}
    </Container>
  );
};

export default Home;
