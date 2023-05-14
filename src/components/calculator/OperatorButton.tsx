import * as React from "react";
import {Button} from "react-native-paper";
type OperatorButtonType = {
    value: string,
    handleClick: any,
    specialWidth : boolean,
    isOperator: boolean,
}
const OperatorButton: React.FC<OperatorButtonType> = ({value, handleClick, specialWidth= false, isOperator}) => {

    return (
        <Button
            mode={isOperator ? "contained" : "outlined"}
            onPress={handleClick}
            style={{
                justifyContent: "center",
                alignItems: "center",
                width: specialWidth ? '50%' : '25%',
                borderRadius: 16,
                marginHorizontal: 1
            }}
        >
            {value}
        </Button>
    )

}

export default OperatorButton
