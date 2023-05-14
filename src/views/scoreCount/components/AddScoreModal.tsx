import React from "react";
import {Appbar, Button, Dialog, List, Portal, TextInput} from "react-native-paper";
import {StyleSheet} from "react-native";

type AddScoreModalType = {
    addScore: any,
    visible: boolean,
    setVisible: any,
    scoreInfo: any
}

const AddScoreModal = ({addScore, visible, setVisible, scoreInfo} : AddScoreModalType): JSX.Element => {

    return (
            <Portal>
                <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                    <Appbar.Header elevated={true} style={sylesAddScoreModal.appBar}>
                        <Appbar.BackAction
                            onPress={() => (setVisible(false))}
                        />
                        <Appbar.Content title={`${scoreInfo.namePlayer} - Tour : ${scoreInfo.turn}`}/>
                        <Appbar.Action icon={"calendar"} />
                    </Appbar.Header>
                    <Dialog.Title>Ajouter les joueurs</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label={"Nom du joueur"}
                            value={`nom : ${scoreInfo.namePlayer} - tour: ${scoreInfo.turn} - value : ${scoreInfo.score}`}
                          //  onChangeText={text => setText(text)}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setVisible(false)}>Fermer</Button>
                     {/*   <Button onPress={beginGame}>Commencer la partie</Button>*/}
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
