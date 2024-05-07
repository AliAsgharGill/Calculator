import { useState, useEffect } from 'react';
import Button from './Button';
import { CgBackspace } from "react-icons/cg";
import { FaDivide } from "react-icons/fa6";
import { CiSun } from "react-icons/ci";
import { IoCloudyNightSharp } from "react-icons/io5";
import { BiHistory } from "react-icons/bi";

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
    if (value === '%') {
      setExpression((prevExpression) => {
        if (prevExpression.trim() === '') {
          return '';
        }
        const parts = prevExpression.split('-');
        if (parts.length === 2 && !isNaN(parts[0].trim()) && !isNaN(parts[1].trim())) {
          const number = parseFloat(parts[0]);
          const percentage = parseFloat(parts[1]) / 100;
          const result = number - (number * percentage);
          return result.toString();
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

  return (
    <div className='flex justify-center items-center'>
      {showHistory && (
        // <div className={` text-2xl text-end p-5 flex-col space-y-10 justify-evenly ${showHistory ? 'opacity-100 transition-opacity  duration-1000' : 'opacity-0'}`}>
        <div className={`text-2xl text-end p-5 flex-col space-y-10 justify-evenly opacity-100 transition-opacity duration-1000`}>

          <div className='flex flex-col  justify-between  '>
            <div className="overflow-y-auto max-h-80 mt-28 scroll-m-0 history-panel ">
              <div className="divide-y divide-gray-200">
                {history.map((item, index) => (
                  <div key={index} className="py-2">
                    <p className='text-gray-300 text-xs ' >{item.expression}</p>
                    <p className={` text-sm ${theme === 'dark' ? 'bg-gray-800 text-white ' : 'bg-white text-black'}`} >{item.result}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex justify-center items-center '>
              {history.length > 0 ?

                <h2 className={` text-sm cursor-pointer text-[#48D0CE] justify-center ${theme === 'dark' ? 'bg-gray-800 text-teal-300 ' : 'bg-white text-teal-300'}  `} onClick={() => { setHistory([]), setShowHistory(false) }}>Clear</h2>
                : ""
              }
            </div>
          </div>
        </div>
      )}
      <div className='space-y-20' >
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
            <div className="keypad grid grid-cols-4 gap-1">
              <Button value="C" onClick={handleClear} />
              <Button value="%" onClick={() => handleButtonClick('%')} />
              <Button value={<CgBackspace />} onClick={handleDelete} />
              <Button value={<FaDivide className='fill-[#48D0CE]' />} onClick={() => handleButtonClick('/')} />
              <Button value="7" onClick={() => handleButtonClick('7')} />
              <Button value="8" onClick={() => handleButtonClick('8')} />
              <Button value="9" onClick={() => handleButtonClick('9')} />
              <Button className="text-[#48D0CE]" value="x" onClick={() => handleButtonClick('*')} />
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
      </div>
    </div>
  );
};

export default Calculator;
