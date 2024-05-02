import { useState, useEffect } from 'react';
import Button from './Button';
import { CgBackspace } from "react-icons/cg";
import { FaDivide } from "react-icons/fa6";
import { CiSun } from "react-icons/ci";
import { IoCloudyNightSharp } from "react-icons/io5";

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [theme, setTheme] = useState('light');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      if (key === 'Enter') {
        handleCalculate();
      } else if (key === 'Escape') {
        handleClear();
      } else if (key === 'Backspace') {
        handleDelete();
      } else if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')', '^'].includes(key)) {
        handleButtonClick(key);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleButtonClick = (value) => {
    if (value === '%') {
      setExpression((prevExpression) => {
        if (prevExpression.trim() === '') {
          return '';
        }
        const lastChar = prevExpression.slice(-1);
        if (!isNaN(lastChar) || lastChar === '.') {
          const percentage = parseFloat(prevExpression) / 100;
          return percentage.toString();
        }
        return prevExpression;
      });
    } else {
      setExpression((prevExpression) => prevExpression + value);
    }
  };

  const handleCalculate = () => {
    try {
      if (expression.trim() === '') {
        setExpression('');
        return;
      }
      const calculatedResult = eval(expression.replace('x', '*'));
      setHistory([{ expression, result: calculatedResult }]);
      setExpression(calculatedResult.toString());
    } catch (error) {
      setExpression('Error');
    }
  };

  const handleClear = () => {
    setExpression('');
    setHistory([]);
  };

  const handleDelete = () => {
    setExpression((prevExpression) => prevExpression.slice(0, -1));
    setHistory((prevHistory) => prevHistory.slice(-1));
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeIcon = theme === 'light' ? <CiSun /> : <IoCloudyNightSharp />;
  const themeText = theme === 'light' ? 'Light' : 'Dark';

  return (
    <div>
      <div className='flex justify-start items-center ' >
        <label htmlFor="theme" className='cursor-pointer' >{themeText}</label>
        <Button value={themeIcon} id="theme" onClick={toggleTheme} />
      </div>
      <div className={`rounded-lg border-gray-500 w-80 shadow-teal-300 shadow-lg  ${theme === 'dark' ? 'bg-gray-800 text-white ' : 'bg-white text-black'}`}>
        <div className="display flex justify-center flex-col">
          <input type="text" value={expression} readOnly className="w-64 text-2xl outline-none bg-transparent h-20 p-5 " />
          <div className="text-2xl text-end p-5 ">
            {history.map((item, index) => (
              <div key={index}>{`${item.expression} = ${item.result}`}</div>
            ))}
          </div>
        </div>
        <div className="keypad grid grid-cols-4 gap-1">
          <Button value="C" onClick={handleClear} />
          <Button value="%" onClick={() => handleButtonClick('%')} />
          <Button value={<CgBackspace />} onClick={handleDelete} />
          <Button value={<FaDivide className='fill-[#48D0CE]' />} onClick={() => handleButtonClick('/')} />
          <Button value="7" onClick={() => handleButtonClick('7')} />
          <Button value="8" onClick={() => handleButtonClick('8')} />
          <Button value="9" onClick={() => handleButtonClick('9')} />
          <Button className="text-[#48D0CE]" value="X" onClick={() => handleButtonClick('*')} />
          <Button value="4" onClick={() => handleButtonClick('4')} />
          <Button value="5" onClick={() => handleButtonClick('5')} />
          <Button value="6" onClick={() => handleButtonClick('6')} />
          <Button className="text-[#48D0CE]" value="-" onClick={() => handleButtonClick('-')} />
          <Button value="1" onClick={() => handleButtonClick('1')} />
          <Button value="2" onClick={() => handleButtonClick('2')} />
          <Button value="3" onClick={() => handleButtonClick('3')} />
          <Button className="text-[#48D0CE]" value="+" onClick={() => handleButtonClick('+')} />
          <Button value="00" onClick={() => handleButtonClick('00')} />
          <Button value="0" onClick={() => handleButtonClick('0')} />
          <Button value="." onClick={() => handleButtonClick('.')} />
          <Button className="text-[#48D0CE]" value="=" onClick={handleCalculate} />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
