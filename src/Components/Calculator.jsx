import { useState } from "react";

import Display from "./Display";
import Button from "./Button";

import './Calculator.css';


function Calculator() {
    /*
        Defining React hooks
    */
    const [displayNumber, setDisplayNumber] = useState(0);
    const [storageNumber, setStorageNumber] = useState(0);
    const [storageNumber1, setStorageNumber1] = useState(0);
    const [fullEquation, setFullEquation] = useState('');
    const [operation, setOperation] = useState('');
    const [operationFlag, setOperationFlag] = useState(false);

    /*
        Function to display selected numbers onto screen.
        Numbers will concatenate.
        If operationFlag is set (calculate (=) button has been pressed), then 
        If first number is 0, it will be overrided until a non-zero number is inputted.
        Otherwise, the number will be concatenated onto the existing displayNumber.
    */
    const setToDisplay = (number) => {
        /*
            If first number is 0 overwrite with another number or operationFlag has been set to true.
            OperationFlag will be set true when calculate button (=) has been clicked.
        */
        if (operationFlag) {
            setOperation('');
            // setStorageNumber(displayNumber);
            // setDisplayNumber(number);
            // setStorageNumber1(0);

            setDisplayNumber(number);
            setStorageNumber(0);
            setStorageNumber1(0);

            setFullEquation(number.toString());
            setOperationFlag(false);    // Set operationFlag to false again, so that input will not overwrite.
        } else if (displayNumber == 0) {
            setDisplayNumber(number);
        } else {
            const result = displayNumber.toString() + number.toString();
            setDisplayNumber(Number(result)); // concat integers
            setFullEquation(result);
        }

        // if (displayNumber == 0 || operationFlag) {
        //     setOperation('');
        //     setDisplayNumber(number);
        //     setFullEquation(number.toString());
        // } else {
        //     const result = displayNumber.toString() + number.toString();
        //     setDisplayNumber(Number(result)); // concat integers
        //     setFullEquation(result);
        // }
    }

    /* 
        Function for backspace
    */
    const backspace = () => {
        const str = displayNumber.toString();
        const newStr = str.substring(0, str.length - 1);
        setDisplayNumber(Number(newStr));
    }

    /*
        Function for Clearing (C) - reset calculator for user selection.
    */
    const clear = () => {
        setDisplayNumber(0);
        setStorageNumber(0);
        setStorageNumber1(0);
        setFullEquation('');
        setOperation('');
    }

    /*
        Function for reset - reset calculator for operations.
    */
    const reset = () => {
        setDisplayNumber(0);
    }

    /*
        Function for storing number and resetting the display when an operation button
        has been selected.
    */
    const operate = () => {
        if (displayNumber != 0) {
            setStorageNumber(displayNumber);
        }

        setOperationFlag(false);
        reset();
    }

    /*
        Function for addition
        Set operation sign to + and call operate function.
    */
    const add = () => {
        setOperation('+');
        // setFullEquation(fullEquation + '+');
        operate();
    }

    /*
        Function for multiplication
        Set operation sign to x and call operate function.
    */
    const multiply = () => {
        setOperation('x');
        operate();
    }

    /*
        Function for subtraction
        Set operation sign to - and call operate function.
    */
    const subtract = () => {
        setOperation('-');
        operate();
    }

    /*
        Function for division
        Set operation sign to ÷ and call operate function.
    */
    const divide = () => {
        setOperation('÷');
        operate();
    }

    /*
        Function for when calculate (=) is selected
        1. Addition (+)
            Condition: when user has selected the addition option.
            Add numbers and set displayNumber to the result.
        2. Multiplication (x)
            Condition: when user has selected the multiplication option.
            Multiply numbers and set displayNumber to the result.
        3. Subtraction (-)
            Condition: when user has selected the subtraction option.
            Subtract storageNumber by current displayNumber and set displayNumber to the result.
        4. Division (÷)
            Condition: when user has selected the subtraction option.
            Divide storageNumber by current displayNumber and set displayNumber to the result.
        5. Default
            Condition: when no operation has been selected or user has selected an unintended 
                       option outside of the provided calculator options.
            Display a default message and do nothing other than returning out of function.
    */
    const calculate = () => {
        
        setOperationFlag(true);   // set operation flag to true so overwrite can happen
        setStorageNumber1(displayNumber);
        switch(operation) {
            case '+':
                console.log('Commencing addition...');
                setDisplayNumber(storageNumber + displayNumber);
                break;
            case 'x':
                console.log('Commencing multiplication...');
                setDisplayNumber(storageNumber * displayNumber);
                break;
            case '-':
                console.log('Commencing subtraction...');
                setDisplayNumber(storageNumber - displayNumber);
                break;
            case '÷':
                console.log('Commencing division');
                setDisplayNumber(storageNumber/displayNumber);
                break;
            default:
                console.log('Default... Exiting with code 0...');
                return(0);
        }

        console.log('Display Number: ', displayNumber);
        console.log('Storage Number: ', storageNumber);
    }

    return(
        <div className="calculator">
            <Display former={storageNumber} current={displayNumber} 
            operation={operation} flag={operationFlag}
            after={storageNumber1} className="calculator-output"/>

            <div className="calculator-keys">
                {/* First Row */}
                <Button classname="calculator-key" action={() => setDisplayNumber(0)} text='CE'/>
                <Button classname="calculator-key" action={clear} text='C'/>
                <Button classname="calculator-key" action={backspace} text={"\u232b"}/>
                <Button classname="calculator-key" action={divide} text='÷'/>
                {/* Second Row */}
                <Button classname="calculator-key" action={() => setToDisplay(7)} text='7'/>
                <Button classname="calculator-key" action={() => setToDisplay(8)} text='8'/>
                <Button classname="calculator-key" action={() => setToDisplay(9)} text='9'/>
                <Button classname="calculator-key" action={multiply} text='x'/>
                {/* Third Row */}
                <Button classname="calculator-key" action={() => setToDisplay(4)} text='4'/>
                <Button classname="calculator-key" action={() => setToDisplay(5)} text='5'/>
                <Button classname="calculator-key" action={() => setToDisplay(6)} text='6'/>
                <Button classname="calculator-key" action={subtract} text='-'/>
                {/* Fourth Row */}
                <Button classname="calculator-key" action={() => setToDisplay(1)} text='1'/>
                <Button classname="calculator-key" action={() => setToDisplay(2)} text='2'/>
                <Button classname="calculator-key" action={() => setToDisplay(3)} text='3'/>
                <Button classname="calculator-key" action={add} text='+'/>
                {/* Fifth Row */}
                <Button classname="calculator-key calculator-key-zero" action={() => setToDisplay(0)} text='0'/>
                <Button classname="calculator-key calculator-key-enter" action={calculate} text='='/><br/>
            </div>
        </div>
    )
}

export default Calculator;