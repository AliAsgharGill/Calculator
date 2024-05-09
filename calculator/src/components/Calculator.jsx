import { useState, useEffect } from 'react';
import Button from './Button';
import { CiSun } from "react-icons/ci";
import { IoCloudyNightSharp } from "react-icons/io5";
import { BiHistory } from "react-icons/bi";
import History from './History';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [theme, setTheme] = useState('light');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    document.body.classList.add(theme === 'dark' ? 'bg-gray-800' : 'bg-white');
    return () => {
      document.body.classList.remove('bg-gray-800', 'bg-white');
    };
  }, [theme]);

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
    switch (value) {
      case 'C':
        handleClear();
        break;
      case '%':
        handlePercentage();
        break;
      case '00':
        setExpression((prevExpression) => prevExpression + '00');
        break;
      case '=':
        handleCalculate();
        break;
      case '⌫':
        handleDelete();
        break;
      case '÷':
        setExpression((prevExpression) => prevExpression + '/');
        break;
      default:
        setExpression((prevExpression) => prevExpression + value);
        break;
    }
  };

  const handlePercentage = () => {
    setExpression((prevExpression) => {
      if (prevExpression.trim() === '') {
        return '';
      }

      const parts = prevExpression.split(/(\+|-|\*|\/)/);
      if (parts.length === 3) {
        const number = parseFloat(parts[0]);
        const operator = parts[1];
        const percentage = parseFloat(parts[2]) / 100;
        let result = 0;

        switch (operator) {
          case '-':
            result = number - (number * percentage);
            break;
          case '+':
            result = number + (number * percentage);
            break;
          case '*':
            result = number * (1 + percentage);
            break;
          case '/':
            result = number / (1 + percentage);
            break;
          default:
            break;
        }

        return result.toString();
      }

      return prevExpression;
    });
  };




  const handleCalculate = () => {
    try {
      if (expression.trim() === '') {
        setExpression('');
        return;
      }
      const calculatedResult = eval(expression.replace('x', '*'));
      setHistory([{ expression, result: calculatedResult }, ...history]);
      setExpression(calculatedResult.toString());
    } catch (error) {
      setExpression('Error');
    }
  };

  const handleClear = () => {
    setExpression('');
  };

  const handleDelete = () => {
    setExpression((prevExpression) => prevExpression.slice(0, -1));
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleHistory = () => {
    setShowHistory((prevShowHistory) => !prevShowHistory);
  };

  const themeIcon = theme === 'light' ? <IoCloudyNightSharp /> : <CiSun />;
  const themeText = theme === 'light' ? 'Dark' : 'Light';

  const buttonValues = [
    "C", "%", "⌫", "÷",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "00", "0", ".", "="
  ];

  return (
    <div className='flex justify-center items-center'>
      {/* History */}
      <History
        history={history}
        showHistory={showHistory}
        theme={theme}
        setHistory={setHistory}
        setShowHistory={setShowHistory}
      />

      <div className={` ${showHistory ? ' transform translate-x-5 transition duration-1000 ' : ''}  space-y-20`} >
        <label htmlFor="" className='text-teal-400 font-bold ' >Calculator</label>
        <div>
          <div className='flex justify-between items-center space-x-2 ' >
            <BiHistory onClick={toggleHistory} className={`size-7 cursor-pointer duration-500 hover:-translate-y-1 ${theme === 'dark' ? ' text-teal-300 ' : ' text-black'} `} />
            <div className='flex items-center justify-center duration-500 hover:-translate-y-1'>
              <label htmlFor="theme" className={`cursor-pointer ${theme === 'dark' ? 'bg-gray-800 text-teal-300 ' : 'bg-white text-black'} `} onClick={toggleTheme} >{themeText}</label>
              <Button className={`cursor-pointer ${theme === 'dark' ? 'bg-gray-800 text-teal-300 ' : 'bg-white text-black'} `} value={themeIcon} id="theme" onClick={toggleTheme} />
            </div>
          </div>
          <div className={`rounded-lg border-gray-500 w-80 shadow-teal-300 shadow-lg  ${theme === 'dark' ? 'bg-gray-800 text-white ' : 'bg-white text-black'}`}>
            <div className="display flex justify-center flex-col">
              <input type="text" value={expression} readOnly className={`w-64 text-2xl outline-none bg-transparent h-20 p-5 `} />
            </div>
            {/* Buttons Using map  */}
            <div className="keypad grid grid-cols-4 gap-1">
              {buttonValues.map((value, index) => (
                <Button key={index} value={value} onClick={() => handleButtonClick(value)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
