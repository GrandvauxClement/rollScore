import React from "react";
import {Button, Dialog, List, Portal, TextInput} from "react-native-paper";

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

export default AddScoreModal
