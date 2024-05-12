import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

function AdminSideNavItem({item}) {
    const navigation = useNavigation();
    return ( 
        <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
        onPress={() => navigation.navigate(item?.to || "")}
      >
        <View style={{ width: 30 }}>
          <Icon name={item?.icon} size={20} color="#3498db" />
        </View>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: "700",
          }}
        >
           {item?.title}
        </Text>
      </TouchableOpacity>

     );
}

export default AdminSideNavItem;