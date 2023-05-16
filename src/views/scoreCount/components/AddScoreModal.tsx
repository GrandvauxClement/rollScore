import React from "react";
import {Appbar, Button, Dialog, List, Portal, TextInput} from "react-native-paper";
import {StyleSheet} from "react-native";
import Calculator from "../../../components/calculator/Calculator";
import Player from "../class/Player";
import {PlayerUpdateScore} from "./PlayersArea";

type AddScoreModalType = {
    addScore: any,
    visible: boolean,
    setVisible: any,
    scoreInfo: PlayerUpdateScore,
    setScoreInfo: Function,
    players: Player[]
}

const AddScoreModal = ({addScore, visible, setVisible, scoreInfo, players, setScoreInfo} : AddScoreModalType): JSX.Element => {


    const [indexSelected, setIndexSelected] = React.useState(scoreInfo.indexUserSelected)
    const [defaultScore, setDefaultScore] = React.useState(0);

    React.useEffect(() => {
        //Reset index when dialog was open
        console.log("*************************************** reopen dialog index user --> ", scoreInfo.indexUserSelected);
        setIndexSelected(scoreInfo.indexUserSelected)
    }, [visible])

    React.useEffect(() => {
        console.log("€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€€")
        console.log("ON MODAL COMPONENT ************************************ indexSelected --> ", indexSelected);
        console.log("Score select --> ", scoreInfo.newScore[indexSelected])
        if (typeof scoreInfo.newScore[indexSelected] === "undefined"){
            setDefaultScore(0)
        } else {
            setDefaultScore(scoreInfo.newScore[indexSelected])
        }

    }, [indexSelected]);

    // handle click set score of an user & go next
    const handleUpdateScoreInfo = (scoreReceived: number, isFinish: boolean = false) => {
        console.log("================================================================ U¨PDATE SCORE index selected --> ", indexSelected)
        let tempScore = [...scoreInfo.newScore];
        tempScore[indexSelected] = scoreReceived;
        console.log(" temp score new value --> ", tempScore)
        setScoreInfo({
            ...scoreInfo,
            newScore: tempScore
        })
        //Check if his last user and on this case close modal & update score on datatable
        console.log("================================================================")
        console.log("On update score actualscore info ---> ", scoreInfo)
        if (indexSelected === players.length - 1 || isFinish){

            addScore(tempScore);
            setVisible(false);
        }else {
            // Else spend to next user
            console.log("Next user FIND SO GO NEXT !!! :)")
            setIndexSelected(indexSelected + 1);
        }
    }

    const handleCloseDialog = () => {
        console.log("00000000000000000 JE FERME passe là !!! :)")
        addScore(scoreInfo.newScore);
        setVisible(false);
    }

    return (
            <Portal>
                <Dialog visible={visible} onDismiss={handleCloseDialog} style={{width: "100%", marginHorizontal: 3}}>
                    <Appbar.Header elevated={true} style={sylesAddScoreModal.appBar}>
                        <Appbar.BackAction
                            onPress={() => setVisible(false)}
                        />
                        <Appbar.Content title={`${players[indexSelected].name} - Tour : ${scoreInfo.turn}`}/>
                    </Appbar.Header>
                    <Dialog.Content>
                        <Calculator
                            handleUpdateScoreInfo={handleUpdateScoreInfo}
                            defaultScore={defaultScore}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={handleCloseDialog}>Fermer</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
    )
}

const sylesAddScoreModal = StyleSheet.create({
    appBar:{
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dataTableWidthItem:{
        width: 300,
        color: "red"
    }
});

export default AddScoreModal
