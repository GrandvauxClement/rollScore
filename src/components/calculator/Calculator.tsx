import * as React from "react";
import {View} from "react-native";
import OperatorButton from "./OperatorButton";
import {Text} from "react-native-paper";

type Operator = 'addition'|'subtraction'|'multiplication'| 'division';
type CalculatorType = {
    handleUpdateScoreInfo: Function,
    defaultScore: number
}

const Calculator: React.FC<CalculatorType> = ({handleUpdateScoreInfo, defaultScore}): JSX.Element => {

    const [score, setScore] = React.useState<number>(defaultScore);
    const [operation, setOperation] = React.useState<Operator>(null);
    const [numberEnter, setNumberEnter] = React.useState<number>(0);
    const [historyCalcul, setHistoryCalcul] = React.useState<any[]>([0]);

    const concatenateTwoNumber = (number1: number, number2: number) => {
        return parseInt(number1.toString() + number2.toString());
    }

    React.useEffect(() => {
        // When user selected change default score too so reset score display by calculator
        setScore(defaultScore);
        console.log("###################################### Use effect reset score !! :) ")
    }, [defaultScore])

    const displayMethodInResume = (value: number | Operator) => {
        if (typeof value === 'number'){
            return value
        } else {
            if (value === 'subtraction'){
                return ' - '
            } else if (value === 'addition') {
                return ' + '
            } else if (value === 'multiplication') {
                return ' * '
            } else if (value === 'division') {
                return ' / '
            }
        }
    }

    const updateHistoryCalcul = (isOperator: boolean, value : string|number, isAdd: boolean = true) => {

        let tempHistory = historyCalcul;
        if (isOperator && typeof value === 'string'){
            if (typeof tempHistory[tempHistory.length- 1] === 'string'){
                tempHistory[tempHistory.length- 1] = value;
            } else {
                tempHistory.push(value);
            }
        } else {
            // if last index as string add new number
            if (typeof tempHistory[tempHistory.length- 1] === 'string'){
                tempHistory.push(value);
            }else{
                //We need to update last number
                tempHistory[tempHistory.length- 1] = value;
            }
        }
        setHistoryCalcul(tempHistory);
    }
    // Method to update score,
    const handleUpdateScore = (value: number) => {
        // If score null set score by first value selected
        if (score === 0){
            setScore(value);
            setNumberEnter(value);
            updateHistoryCalcul(false, value, true)
        } else {
            // else make operation selected by default addition
            const tempNumberEnter = numberEnter === 0 ?
                value :
                concatenateTwoNumber(numberEnter, value);
            setNumberEnter(tempNumberEnter)

            updateHistoryCalcul(false, tempNumberEnter, true)
            if(operation === null){
                setScore(concatenateTwoNumber(score, value))
            } else if (operation === 'addition'){
                setScore(score + tempNumberEnter)
            } else if (operation === 'subtraction'){
                setScore(score - tempNumberEnter)
            } else if (operation === 'multiplication'){
                setScore(score * tempNumberEnter)
            } else if (operation === 'division'){
                setScore(score / tempNumberEnter)
            }
        }
    }

    // method to handle operation selected
    const handleClickOperation = (kind: 'addition'|'subtraction'|'multiplication'| 'division') => {
      setOperation(kind);
      updateHistoryCalcul(true, kind, true)
      // set number stock to default (0)
      setNumberEnter(0)
    }

    const handleResetScore = () => {
        setScore(0)
    };

    const handleRemoveLastOperation = () => {
        // Method to cancel last operation
    }

    return (
        <View style={{backgroundColor: 'light'}}>
            <View style={{height: 60, alignItems: 'flex-end', justifyContent: 'center'}}>
                <Text variant={'titleLarge'}>
                    {score === null ? 0 : score}
                </Text>
                <View style={{flexDirection: 'row'}}>
                    {historyCalcul.length > 2 && historyCalcul.map((data, index) => (
                        <Text variant={'bodyMedium'} key={index}>
                            {displayMethodInResume(data)}
                        </Text>
                    ))}
                </View>

            </View>
            <View
                style={{
                    flexDirection: 'row',
                    marginVertical: 2
                }}
            >
                <OperatorButton
                    value={'C'}
                    handleClick={() => handleResetScore()}
                    specialWidth={true}
                    isOperator={true}
                />
                <OperatorButton
                    value={'Rem'}
                    handleClick={() => handleResetScore()}
                    specialWidth={false}
                    isOperator={true}
                />
                <OperatorButton
                    value={'/'}
                    handleClick={() => handleClickOperation('division')}
                    specialWidth={false}
                    isOperator={true}
                />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    marginVertical: 2
                }}
            >
                <OperatorButton
                    value={'7'}
                    handleClick={() => handleUpdateScore(7)}
                    specialWidth={false}
                    isOperator={false}
                />
                <OperatorButton
                    value={'8'}
                    handleClick={() => handleUpdateScore(8)}
                    specialWidth={false}
                    isOperator={false}
                />
                <OperatorButton
                    value={'9'}
                    handleClick={() => handleUpdateScore(9)}
                    specialWidth={false}
                    isOperator={false}
                />
                <OperatorButton
                    value={'X'}
                    handleClick={() => handleClickOperation('multiplication')}
                    specialWidth={false}
                    isOperator={true}
                />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    marginVertical: 2
                }}
            >
                <OperatorButton
                    value={'4'}
                    handleClick={() => handleUpdateScore(4)}
                    specialWidth={false}
                    isOperator={false}
                />
                <OperatorButton
                    value={'5'}
                    handleClick={() => handleUpdateScore(5)}
                    specialWidth={false}
                    isOperator={false}
                />
                <OperatorButton
                    value={'6'}
                    handleClick={() => handleUpdateScore(6)}
                    specialWidth={false}
                    isOperator={false}
                />
                <OperatorButton
                    value={'-'}
                    handleClick={() => handleClickOperation('subtraction')}
                    specialWidth={false}
                    isOperator={true}
                />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    marginVertical: 2
                }}
            >
                <OperatorButton
                    value={'1'}
                    handleClick={() => handleUpdateScore(1)}
                    specialWidth={false}
                    isOperator={false}
                />
                <OperatorButton
                    value={'2'}
                    handleClick={() => handleUpdateScore(2)}
                    specialWidth={false}
                    isOperator={false}
                />
                <OperatorButton
                    value={'3'}
                    handleClick={() => handleUpdateScore(3)}
                    specialWidth={false}
                    isOperator={false}
                />
                <OperatorButton
                    value={'+'}
                    handleClick={() => handleClickOperation('addition')}
                    specialWidth={false}
                    isOperator={true}
                />
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    marginVertical: 2
                }}
            >
                <OperatorButton
                    value={'.'}
                    handleClick={null}
                    specialWidth={false}
                    isOperator={false}
                />
                <OperatorButton
                    value={'0'}
                    handleClick={() => handleUpdateScore(0)}
                    specialWidth={false}
                    isOperator={false}
                />
                <OperatorButton
                    value={'OK'}
                    handleClick={() => handleUpdateScoreInfo(score === null ? 0 : score, true)}
                    specialWidth={false}
                    isOperator={false}
                />
                <OperatorButton
                    value={'Next'}
                    handleClick={() => handleUpdateScoreInfo(score === null ? 0 : score, false)}
                    specialWidth={false}
                    isOperator={true}
                />
            </View>
        </View>
    )
}

export default Calculator
