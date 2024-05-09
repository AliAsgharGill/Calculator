import PropTypes from 'prop-types';
const History = ({ history, showHistory, theme, setHistory, setShowHistory }) => {
    const clearHistory = () => {
        setHistory([]);
        setShowHistory(false);
    };

    return (
        <>
  
            {showHistory && (
                // transition: transform 0.3s ease;
                <div className={` text-2xl text-end p-5 flex-col space-y-10 translate-x-2 duration-300 justify-evenly opacity-100 transition-opacity`}>

                    <div className='flex-col  justify-between  '>
                        <div className="overflow-y-auto max-h-80 mt-28 scroll-m-0 history-panel ">
                            <div>
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
                                <h2 className={` text-sm cursor-pointer text-[#48D0CE] justify-center ${theme === 'dark' ? 'bg-gray-800 text-teal-300 ' : 'bg-white text-teal-300'}  `} onClick={clearHistory}>Clear</h2>
                                : ""
                            }
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

History.propTypes = {
    history: PropTypes.array.isRequired,
    showHistory: PropTypes.bool.isRequired,
    theme: PropTypes.string.isRequired,
    setHistory: PropTypes.func.isRequired,
    setShowHistory: PropTypes.func.isRequired,
};

export default History
