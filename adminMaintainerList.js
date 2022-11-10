import { Component } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import React from "react";
import APIKit from "./http-api";
import { SafeAreaView, StyleSheet } from "react-native";
import Card from "./card";
import { Colors } from "react-native/Libraries/NewAppScreen";

import Ionicons from "@expo/vector-icons/Ionicons";

export default class AdminMaintainerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }

  async findAllUsers() {
    const onSuccess = ({ data }) => {
      // console.log(
      // "🚀 ~ file: adminMaintainerList.js ~ line 23 ~ AdminMaintainerList ~ onSuccess ~ data",
      // data
      // );

      this.setState({
        data: data,
        isLoading: false,
      });
    };

    const onFailure = (error) => {
      console.log(
      "🚀 ~ file: adminMaintainerList.js ~ line 28 ~ AdminMaintainerList ~ onFailure ~ error",
      error.response
      );
      alert("findAll failed " + JSON.stringify(error.response));
      this.setState({
        isLoading: false,
      });
    };

    await APIKit.get("/users/findAllUsers", {
      headers: {
        "content-type": "application/json",
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  }

  componentDidMount() {
    this.findAllUsers();
  }

  render() {
    const { data, isLoading } = this.state;

    const styles = StyleSheet.create({
      container: {
        // margin: 8,
        backgroundColor: "white",
        // paddingTop:15,
        // alignItems: "center", // Centered horizontally
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
        marginBottom: 15,
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
        backgroundColor: "#ededed",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,

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
    });

    return (
      <View style={{ flex: 1, padding: 2 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <SafeAreaView style={styles.container}>
            <FlatList
              style={{ paddingTop: 8 }}
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                // console.log(
                // "🚀 ~ file: adminMaintainerList.js ~ line 170 ~ AdminMaintainerList ~ render ~ item",
                // item
                // );

                return (
                  <View>
                    <View style={styles.listItem}>
                      {/* col 1 */}
                      <View style={styles.col_1}>
                        <View style={styles.col_1_row_1}>
                          <Text style={styles.rainfall1}>
                            <Ionicons
                              name="people-outline"
                              size={60}
                              color="#1F75FE"
                            />
                          </Text>
                        </View>
                        <View style={styles.col_1_row_2}>
                          <Text style={styles.email}>
                            {item.username || "-"}
                          </Text>
                          <View style={styles.password}>
                            <Text>{item.plainPassword || "-"}</Text>

                            {/* <Ionicons
                            name="eye"
                            size={13}
                            color="grey"
                            style={styles.icon}
                          /> */}
                          </View>
                        </View>
                      </View>

                      {/* col 2 */}
                      <View style={styles.col_2}>
                        {/* <View style={styles.group}>
                        <Text style={styles.small}>Name:</Text>
                        <Text style={styles.big}>{item.name || "-XXXXXXXXXX-"}</Text>
                      </View> */}
                        <View style={styles.group}>
                          <Text style={styles.small}>Phone:</Text>
                          <Text style={styles.big}>
                            {item.phone || "-00000 00000-"}
                          </Text>
                        </View>
                        <View style={styles.group}>
                          <Text style={styles.small}>Assignd Reservoir:</Text>
                          <Text style={[styles.big, styles.reservior]}>
                            {item?.reservoirs[0]?.name || "-"}
                          </Text>
                        </View>
                        <View style={styles.group}>
                          <Text style={styles.small}>Role:</Text>
                          <Text style={styles.big}>
                            {item?.roles[0]?.name || "-"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </SafeAreaView>
        )}
      </View>
    );
  }
}
