import {
  View,
  Dimensions,
  Image,
} from 'react-native'
import NavBar from '../../layout/navbar'

const HomeApp = () => {
  return (
    <NavBar>
      <View
        style={{
    
        }}
      >
         <Image
            source={require('../../../assets/background.png')}
            style={{width: Dimensions.get('window').width , height: Dimensions.get('window').height}}
          />
      </View>
    </NavBar>
  )
}


export default HomeApp
