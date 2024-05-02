import { useState, useEffect } from 'react';

const CalculatorV2 = () => {
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
                setExpression((prevExpression) => prevExpression.slice(0, -1));
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

    const handleCalculate = () => {
        try {
            const calculatedResult = eval(expression.replace('x', '*'));
            setHistory([...history, { expression, result: calculatedResult }]);
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
                <input type="text" value={expression} readOnly />
                <div className="result-history">
                    {history.map((item, index) => (
                        <div key={index}>{`${item.expression} = ${item.result}`}</div>
                    ))}
                </div>
            </div>
            <div className="keypad">
                <button onClick={handleClear}>AC</button>
                <button onClick={handleMemoryStore}>M+</button>
                <button onClick={handleMemoryRecall}>MR</button>
                <button onClick={() => handleButtonClick('(')}>(</button>
                <button onClick={() => handleButtonClick(')')}>)</button>
                <button onClick={() => handleButtonClick('^')}>^</button>
                <button onClick={() => handleButtonClick('7')}>7</button>
                <button onClick={() => handleButtonClick('8')}>8</button>
                <button onClick={() => handleButtonClick('9')}>9</button>
                <button onClick={() => handleButtonClick('/')}>/</button>
                <button onClick={() => handleButtonClick('4')}>4</button>
                <button onClick={() => handleButtonClick('5')}>5</button>
                <button onClick={() => handleButtonClick('6')}>6</button>
                <button onClick={() => handleButtonClick('*')}>x</button>
                <button onClick={() => handleButtonClick('1')}>1</button>
                <button onClick={() => handleButtonClick('2')}>2</button>
                <button onClick={() => handleButtonClick('3')}>3</button>
                <button onClick={() => handleButtonClick('-')}>-</button>
                <button onClick={() => handleButtonClick('0')}>0</button>
                <button onClick={() => handleButtonClick('.')}>.</button>
                <button onClick={handleCalculate}>=</button>
                <button onClick={() => handleButtonClick('+')}>+</button>
                <button onClick={toggleTheme}>Toggle Theme</button>
            </div>
        </div>
    );
};

export default CalculatorV2;
