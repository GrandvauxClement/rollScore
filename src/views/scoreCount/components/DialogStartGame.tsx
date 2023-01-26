import React, {useState} from "react";
import {Button, Dialog, Portal, Text, TextInput, List} from "react-native-paper";
import Player from "../class/Player";

type DialogSTartGameType = {
    players: Array<Player>,
    setPlayers: any,
    setInit: any
}

const DialogStartGame = ({players, setPlayers, setInit}: DialogSTartGameType): JSX.Element => {

    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [text, setText] = useState("");
    const addNewPlayer = () => {
      if (text !== ""){
          setPlayers([...players, {name: text, score: 0}])
          setText("")
      }
    }

    const beginGame = () => {
        hideDialog()
        setInit(true)
    }

    const removeUser = (index: number) => {
        if (players.length === 1){
            setPlayers([])
        } else {
            setPlayers(players.splice(index,1))
        }
    }
    return (
        <>
            <Button
                onPress={showDialog}
            >
                Commencer une nouvelle partie
            </Button>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Ajouter les joueurs</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label={"Nom du joueur"}
                            value={text}
                            onChangeText={text => setText(text)}
                        />
                        <Button
                            onPress={addNewPlayer}
                        >
                            Ajouter
                        </Button>
                        {players.length > 0 &&
                            <List.Section>
                                <List.Subheader>Joueur Inscrit</List.Subheader>
                                {players.map((player, index) => (
                                    <List.Item
                                        onPress={() => removeUser(index)}
                                        key={index}
                                        title={`${index + 1} - ${player.name}`}
                                        right={() => <List.Icon icon={"delete-forever"} />}
                                    />
                                ))}
                            </List.Section>
                        }
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Fermer</Button>
                        <Button onPress={beginGame}>Commencer la partie</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    )
}

export default DialogStartGame
