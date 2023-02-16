import PropTypes from 'prop-types'
//button component
const Button = ({ text, onClick }) => {

    return (
        <button onClick={onClick}
            className='btn'>
            {text}
        </button>

    )
}

Button.defaultProps = {
    // color: 'grey',
    // text: 'but'

}
Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}
export default Button