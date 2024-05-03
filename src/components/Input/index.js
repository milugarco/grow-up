import { useState } from "react";
import { TextInput } from "react-native";

const InputCustom = ({ placeholder, backgroundColor, width, height, marginBottom, marginTop, top, onChange }) => {
    const [newValue, setNewValue] = useState();

    const handleChange = (value) => {
        setNewValue(value);
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
                height: height ? height : 45,
                padding: 15,
                textAlign: 'center',
                borderRadius: 50,
                marginBottom: marginBottom ? marginBottom : 0,
                marginTop: marginTop ? marginTop : 0,
                top: top ? top : 0
            }}
            textContentType="newPassword"
            onChangeText={handleChange}
        />
    );
};

export default InputCustom;
