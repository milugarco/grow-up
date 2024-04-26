import { Text, TouchableOpacity } from "react-native"

const CustomButton = ({ title, backgroundColor, width, marginBottom, marginTop, textColor, fontSize, top, onPress }) => {

    const bgColor = backgroundColor ? backgroundColor : 'transparent'
    const w = width ? width : 0
    const mb = marginBottom ? marginBottom : 0
    const mt = marginTop ? marginTop : 0
    const color = textColor ? textColor : 'white'
    const font = fontSize ? fontSize : 16

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: bgColor,
                width: w,
                height: 45,
                marginBottom: mb,
                marginTop: mt,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                top: top ? top : 0
            }}>
            <Text style={{ color: color, fontSize: font, fontWeight: 'bold' }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton