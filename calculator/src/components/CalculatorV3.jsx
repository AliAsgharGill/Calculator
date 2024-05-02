import { useState, useEffect } from 'react';
import Button from './Button';

const CalculatorV3 = () => {
    const [expression, setExpression] = useState('');
    const [theme, setTheme] = useState('light');
    const [memory, setMemory] = useState(null);
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
            } else if (key === 'm' && event.ctrlKey) {
                handleMemoryRecall();
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
        setExpression((prevExpression) => prevExpression + value);
    };

    const handleClear = () => {
        setExpression('');
    };

    const handleDelete = () => {
        setExpression((prevExpression) => prevExpression.slice(0, -1));
        setHistory((prevHistory) => prevHistory.slice(-1));
    };

    const handleCalculate = () => {
        try {
            const calculatedResult = eval(expression.replace('x', '*'));
            setHistory([{ expression, result: calculatedResult }]);
            setExpression(calculatedResult.toString());
        } catch (error) {
            setExpression('Error');
        }
    };

    const handleMemoryStore = () => {
        setMemory(expression);
    };

    const handleMemoryRecall = () => {
        if (memory !== null) {
            setExpression((prevExpression) => prevExpression + memory);
        }
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className={`calculator ${theme}`}>
            <div className="display">
                <input type="text" value={expression} className='w-64' readOnly />
                <div className="result-history">
                    {history.map((item, index) => (
                        <div key={index}>{`${item.expression} = ${item.result}`}</div>
                    ))}
                </div>
            </div>
            <div className="keypad">
                <Button value="AC" onClick={handleClear} />
                <Button value="M+" onClick={handleMemoryStore} />
                <Button value="MR" onClick={handleMemoryRecall} />
                <Button value="(" onClick={() => handleButtonClick('(')} />
                <Button value=")" onClick={() => handleButtonClick(')')} />
                <Button value="^" onClick={() => handleButtonClick('^')} />
                <Button value="7" onClick={() => handleButtonClick('7')} />
                <Button value="8" onClick={() => handleButtonClick('8')} />
                <Button value="9" onClick={() => handleButtonClick('9')} />
                <Button value="/" onClick={() => handleButtonClick('/')} />
                <Button value="4" onClick={() => handleButtonClick('4')} />
                <Button value="5" onClick={() => handleButtonClick('5')} />
                <Button value="6" onClick={() => handleButtonClick('6')} />
                <Button value="*" onClick={() => handleButtonClick('*')} />
                <Button value="1" onClick={() => handleButtonClick('1')} />
                <Button value="2" onClick={() => handleButtonClick('2')} />
                <Button value="3" onClick={() => handleButtonClick('3')} />
                <Button value="-" onClick={() => handleButtonClick('-')} />
                <Button value="0" onClick={() => handleButtonClick('0')} />
                <Button value="." onClick={() => handleButtonClick('.')} />
                <Button value="=" onClick={handleCalculate} />
                <Button value="+" onClick={() => handleButtonClick('+')} />
                <Button value="Del" onClick={handleDelete} />
                <Button value="Toggle Theme" onClick={toggleTheme} />
            </div>
        </div>
    );
};

export default CalculatorV3;
