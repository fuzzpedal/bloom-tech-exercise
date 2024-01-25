import { StyleSheet } from "react-native";
import { colours } from "./src/design/colours";

export default StyleSheet.create({
    container: {
        backgroundColor: colours.nearBlack,
        flex: 1,
    },

    label: {
        color: colours.white,
        fontSize: 24,
        padding: 20,
        letterSpacing: 2
    },

    nextButton: {
        backgroundColor: colours.purple,
        padding: 20,
        borderRadius: 8,
        margin: 20,
        marginTop: 80,
    },
    
    nextButtonText: {
        fontSize: 18,
        textAlign: 'center',
    }
})