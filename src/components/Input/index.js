import { useState } from "react";
import { TextInput } from "react-native";

const InputCustom = ({ placeholder, backgroundColor, width, marginBottom, marginTop, top, onChange }) => {
    const [newValue, setNewValue] = useState();

    const handleChange = (value) => {
        setNewValue(value);
        // Chama a função fornecida pelo componente pai para notificar sobre a mudança
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <TextInput
            value={newValue}
            placeholder={placeholder}
            style={{
                backgroundColor: backgroundColor,
                width: width,
                fontSize: 15,
                height: 45,
                padding: 15,
                textAlign: 'center',
                borderRadius: 50,
                marginBottom: marginBottom ? marginBottom : 0,
                marginTop: marginTop ? marginTop : 0,
                top: top ? top : 0
            }}
            onChangeText={handleChange}
        />
    );
};

export default InputCustom;