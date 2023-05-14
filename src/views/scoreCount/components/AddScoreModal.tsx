import React from "react";
import {Appbar, Button, Dialog, List, Portal, TextInput} from "react-native-paper";
import {StyleSheet} from "react-native";
import Calculator from "../../../components/calculator/Calculator";

type AddScoreModalType = {
    addScore: any,
    visible: boolean,
    setVisible: any,
    scoreInfo: any
}

const AddScoreModal = ({addScore, visible, setVisible, scoreInfo} : AddScoreModalType): JSX.Element => {
    console.log("Score info --> ", scoreInfo);
    return (
            <Portal>
                <Dialog visible={visible} onDismiss={() => setVisible(false)} style={{width: "100%", marginHorizontal: 3}}>
                    <Appbar.Header elevated={true} style={sylesAddScoreModal.appBar}>
                        <Appbar.BackAction
                            onPress={() => setVisible(false)}
                        />
                        <Appbar.Content title={`${scoreInfo.namePlayer} - Tour : ${scoreInfo.turn}`}/>
                    </Appbar.Header>
                    <Dialog.Content>
                        <Calculator />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setVisible(false)}>Fermer</Button>
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
