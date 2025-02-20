import './Display.css'

function Display({former, current, operation, flag, after}) {

    return(
        <div className="calculator-output">  
            <p>
                {former != 0 ? former + ' ' + operation + (flag ? ' ' + after : ''): <br/>}
            </p>
            <h3>{current}</h3>
        </div>
    )
}

export default Display;