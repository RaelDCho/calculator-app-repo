import './Button.css'

function Button({classname, action, text}) {

    return(
        <>
            <button className={classname} onClick={action}>{text}</button>
        </>
    )
}

export default Button;