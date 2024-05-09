import PropTypes from 'prop-types';

const Button = ({ value, onClick, className }) => {
    const handleClick = () => {
        onClick(value);
    };

    return (
        <button className={`flex justify-center items-center p-4 text-xl rounded ${className} `} onClick={handleClick}>
            {value}
        </button>
    );
};

Button.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
};

export default Button;
