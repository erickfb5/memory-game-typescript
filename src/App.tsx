import { useState, useEffect } from "react";

import "./App.css";

const App = (): JSX.Element => {
  const [order, setOrder] = useState<number[]>([]);
  const [clickedOrder, setClickedOrder] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    playGame();
  }, []);

  const shuffleOrder = (): void => {
    const colorOrder: number = Math.floor(Math.random() * 4);
    setOrder((prevOrder: number[]) => [...prevOrder, colorOrder]);
    setClickedOrder([]);
    for (let i: number = 0; i < order.length; i++) {
      const elementColor: Element | null = createColorElement(order[i]);
      if (elementColor !== null) {
        lightColor(elementColor, i + 1);
      }
    }
  };

  const lightColor = (element: Element, number: number): void => {
    number = number * 500;
    setTimeout(() => {
      element.classList.add("selected");
    }, number - 250);
    setTimeout(() => {
      element.classList.remove("selected");
    });
  };

  const checkOrder = (): void => {
    for (let i: number = 0; i < clickedOrder.length; i++) {
      if (clickedOrder[i] !== order[i]) {
        gameOver();
        return;
      }
    }

    if (clickedOrder.length === order.length) {
      alert(`Score: ${score}\nWell done! Next level...`);
      nextLevel();
    }
  };

  const click = (color: number): void => {
    setClickedOrder((prevClickedOrder: number[]) => [
      ...prevClickedOrder,
      color,
    ]);
    const colorElement: Element | null = createColorElement(color);
    if (colorElement !== null) {
      colorElement.classList.add("selected");
      setTimeout(() => {
        colorElement.classList.remove("selected");
        checkOrder();
      }, 250);
    }
  };

  const createColorElement = (color: number): Element | null => {
    switch (color) {
      case 0:
        return document.querySelector(".green");
      case 1:
        return document.querySelector(".red");
      case 2:
        return document.querySelector(".yellow");
      case 3:
        return document.querySelector(".blue");
      default:
        return null;
    }
  };

  const nextLevel = (): void => {
    setScore((prevScore: number) => prevScore + 1);
    shuffleOrder();
  };

  const gameOver = (): void => {
    alert(`Score: ${score}!\nYou lose!\nClick OK to start a new game.`);
    setOrder([]);
    setClickedOrder([]);
    setScore(0);
    playGame();
  };

  const playGame = (): void => {
    alert("Welcome! Are you up for the challenge?");
    setScore(0);
    nextLevel();
  };

  return (
    <div className="main-game">
      <div className="genius">
        <div className="green" onClick={() => click(0)}></div>
        <div className="red" onClick={() => click(1)}></div>
        <div className="yellow" onClick={() => click(2)}></div>
        <div className="blue" onClick={() => click(3)}></div>
      </div>
    </div>
  );
};

export default App;
