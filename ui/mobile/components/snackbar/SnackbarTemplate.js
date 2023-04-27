import { Snackbar } from "react-native-paper";
import { Text } from "react-native";
import { useEffect, useState } from "react";

export default function SnackbarTemplate(props) {

    const {
        snackbarText,
        snackbarDuration,
        snackbarVisible,
        snackbarVariant,
        setSnackbarVisible
    } = props;

    const [backgroundColor, setBackgroundColor] = useState("");

    useEffect(() => {
        switch (snackbarVariant) {
            case "info":
                setBackgroundColor("#1976d2")
        break;
            case "error":
                setBackgroundColor("#d32f2f");
        break;
            case "success":
                setBackgroundColor("#2e7d32");
        break;
            default:
                setBackgroundColor("#9c27b0");
      }
    });

    return (
        <Snackbar
            visible={snackbarVisible}
            duration={snackbarDuration || 7000}
            onDismiss={() => { setSnackbarVisible(false) }}
            style={{ backgroundColor: backgroundColor }}
        >
            <Text style={{ color: 'white' }}>{snackbarText}</Text>
        </Snackbar>
    );
}