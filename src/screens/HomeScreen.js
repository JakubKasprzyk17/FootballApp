import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../utils/color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Sizes } from "../utils/size";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import MatchInfo from "../components/activeMatch/MatchInfo";
import ActiveMatch from "../components/activeMatch/ActiveMatch";
import SmallTeam from "../components/teamInfo/SmallTeam";

const HomeScreen = ({ navigation }) => {
  const [teams, setTeams] = useState([]);
  const [token, setToken] = useState("");

  const getTeams = async () => {
    await fetch("http://api.cup2022.ir/api/v1/team", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzcxMzM0NWZkOWFhYzIyNjdmMjA5MmMiLCJpYXQiOjE2NjgzNjg5MTUsImV4cCI6MTY2ODQ1NTMxNX0.vO5XFrIE3e0uyE8hh1PC19LxHvzc8BZXpv-_lz-5ZXo",
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setTeams(data.data);
        });
      } else {
        console.warn(response);
      }
    });
  };

  useEffect(() => {
    getTeams();
  }, []);

  const renderItem = ({ item, index }) => (
    <SmallTeam item={item} index={index} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../assets/prof.jpg")}
              style={styles.avatar}
            />
            <Text style={styles.userName}>TypoJak</Text>
            <MaterialIcons
              name="navigate-next"
              size={Sizes.icon}
              color={Colors.white}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialCommunityIcons
            name="bell"
            size={Sizes.icon}
            color={Colors.white}
          />
          {/* <MaterialCommunityIcons name="bell-badge" size={24} color="black" /> */}
        </TouchableOpacity>
      </View>
      <View style={styles.activeMatches}>
        <ScrollView horizontal>
          <ActiveMatch />
          <ActiveMatch />
          <ActiveMatch />
        </ScrollView>
      </View>
      <View>
        <FlatList
          numColumns={2}
          horizontal={false}
          keyExtractor={(item) => item.id}
          data={teams}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const { height } = Dimensions.get("screen");
const heightLogo = height * 0.27 * 0.27;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  header: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    flex: 0.1,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: heightLogo,
    height: heightLogo,
    borderRadius: heightLogo / 2,
  },
  userName: {
    color: Colors.white,
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 18,
  },
  activeMatches: {
    marginVertical: 5,
  },
});
