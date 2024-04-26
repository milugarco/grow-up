import { Image } from 'react-native'

const logo = require('../../../assets/LOGO.png')

const Logo = ({ width, height, marginBottom, marginTop, }) => {
    return (
        <Image
            style={{
                resizeMode: 'cover',
                width: width ? width : 0,
                height: height ? height : 0,
                marginBottom: marginBottom ? marginBottom : 0,
                marginTop: marginTop ? marginTop : 0,
            }}
            source={logo} />
    )
}

export default Logo