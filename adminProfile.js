import { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import APIKit from "./http-api";
import { SafeAreaView, StyleSheet } from "react-native";
import Card from "./card";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";

export default class AdminProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUser: {},
      data: {},
      role: "",
      isLoading: true,
    };
  }

  findMaintainerByName(name) {
    // console.log(
    // "🚀 ~ file: adminProfile.js ~ line 32 ~ AdminProfile ~ findMaintainerByName ~ name",
    // name
    // );

    const onSuccess = ({ data }) => {
      // console.log(
      // "🚀 ~ file: adminProfile.js ~ line 34 ~ AdminProfile ~ onSuccess ~ res",
      // data
      // );

      this.setState({
        loginUser: data,
        role: data?.roles[0].name || "NA",
        isLoading: false,
      });
    };

    const onFailure = (error) => {
      // console.log(
      // "🚀 ~ file: adminProfile.js ~ line 42 ~ AdminProfile ~ onFailure ~ error",
      // error
      // );
      alert("findAll failed " + JSON.stringify(error.response));
      this.setState({
        isLoading: false,
      });
    };

    APIKit.post("/users/findMaintainerByName", name, {
      headers: {
        "content-type": "text/plain",
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  }

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      this.props.navigation.navigate("Login");
      APIKit.interceptors.request.clear();
      return true;
    } catch (exception) {
      return false;
    }
  }

  componentDidMount() {
    const value = AsyncStorage.getItem("@storage_Key");
    value
      .then((v) => {
        const auth = JSON.parse(v);
        // console.log("🚀 ~ file: adminProfile.js ~ line 84 ~ AdminProfile ~ .then ~ auth", auth)
        this.setState({
          data: auth,
          isLoading: false,
        });

        this.findMaintainerByName(auth?.authentication?.principal?.username);
      })
      .catch((err) => {
        // console.log("🚀 ~ file: adminProfile.js ~ line 95 ~ AdminProfile ~ componentDidMount ~ err", err)
      });
  }

  render() {
    const { isLoading, loginUser, role } = this.state;

    const styles = StyleSheet.create({
      container: {
        // margin: 8,
        backgroundColor: "white",
        minHeight: "100%",
        // alignItems: "center", // Centered horizontally
        // justifyContent:"space-evenly"
      },
      baseText: {
        fontWeight: "bold",
        fontSize: 24,
      },
      innerText: {
        color: "red",
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: "white",
      },
      card: {
        height: 200,
        width: "100%",
        marginTop: 8,
        backgroundColor: Colors.white,
        padding: 9,
      },
      text: {
        fontSize: 20,
        color: "#101010",
        marginTop: 60,
        fontWeight: "700",
      },
      listItem: {
        marginTop: 15,
        marginHorizontal: 12,
        padding: 0,
        // borderColor: "#0087BD",
        // borderWidth: 1,
        backgroundColor: "#f5f6f3",
        borderRadius: 15,
        elevation: 5,

        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between",
      },
      //col 1

      col_1: {
        borderRightWidth: 1,
        borderRightColor: "#e5e6e6",
        width: "40%",
        padding: 15,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // borderRadius: 15,
      },

      email: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: 15,
      },
      password: {
        fontWeight: "600",
        fontSize: 15,
        color: "grey",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },

      icon: {
        paddingHorizontal: 5,
      },

      // col-2
      col_2: {
        width: "60%",
        padding: 15,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#ededed",
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,

        // alignItems:"center",
      },

      group: {
        marginBottom: 3,
      },
      small: {
        fontSize: 12,
        color: "grey",
        fontWeight: "400",
        paddingBottom: 0,
        marginBottom: -5,
      },
      big: {
        fontSize: 16,
        fontWeight: "600",
      },

      //button

      logoutbtn: {
        marginVertical: 15,
        marginHorizontal: 10,
      },
      logout: {
        borderRadius: 15,
      },
    });

    return (
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <SafeAreaView style={styles.container}>
            <View style={styles.listItem}>
              {/* col 1 */}
              <View style={styles.col_1}>
                <View style={styles.col_1_row_1}>
                  <Text style={styles.rainfall1}>
                    <Ionicons name="person-circle" size={60} color="#1F75FE" />
                  </Text>
                </View>
                <View style={styles.col_1_row_2}>
                  <Text style={styles.email}>{loginUser.username || "-"}</Text>
                  <View style={styles.password}>
                    <Text>{loginUser.plainPassword || "-"}</Text>
                  </View>
                </View>
              </View>

              {/* col 2 */}
              <View style={styles.col_2}>
                {/* <View style={styles.group}>
                  <Text style={styles.small}>Name:</Text>
                  <Text style={styles.big}>
                    {loginUser.name || "-XXXX Xxxx-"}
                  </Text>
                </View> */}

                <View style={styles.group}>
                  <Text style={styles.small}>Phone:</Text>
                  <Text style={styles.big}>
                    {loginUser.phone || "-00000 00000-"}
                  </Text>
                </View>

                <View style={styles.group}>
                  <Text style={styles.small}>Role:</Text>
                  <Text style={styles.big}>{role || "-"}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.logoutbtn}>
              <Button
                title="Logout"
                color="#4278cf"
                onPress={() => {
                  this.removeItemValue("@storage_Key");
                }}
                buttonStyle={styles.logout}
              />
            </TouchableOpacity>
          </SafeAreaView>
        )}
      </View>
    );
  }
}
