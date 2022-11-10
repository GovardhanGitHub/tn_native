import { Component } from "react";
import PropTypes from "prop-types";
import {
  ActivityIndicator,
  FlatList,
  Text,
  Image,
  View,
  TouchableOpacity,
  Touchable,
  Pressable,
  Button,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import React from "react";
import APIKit from "./http-api";
import { SafeAreaView, StyleSheet } from "react-native";
import Card from "./card";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class MaintainerAssignedReservoir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loginUser: {},
      isLoading: true,
      reservoirID: 0,
      isAdmin: false,
    };
  }

  async findMaintainerByName(name) {
    const onSuccess = ({ data }) => {
      this.setState({
        isLoading: false,
        loginUser: data,
      });
      if (data?.reservoirs[0]?.id) {
        this.getReservoirEveryDayDetails(data?.reservoirs[0]?.id);
      } else alert("Reservoir ID not found!. ");
    };

    const onFailure = (error) => {
      alert(
        "🚀 ~ file: maintainerAssignedReservoir.js ~ line 32 ~ MaintainerAssignedReservoir ~ onFailure ~ error",
        error
      );
      this.setState({
        isLoading: false,
      });
    };

    await APIKit.post("/users/findMaintainerByName", name, {
      headers: {
        "content-type": "text/plain",
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  }

  async getReservoirEveryDayDetails(id) {
    this.setState({
      isLoading: true,
    });
    const url = "/reservoir/getReservoirEveryDayDetails/" + id;

    const onSuccess = ({ data }) => {
      this.setState({
        isLoading: false,
        data: data,
      });
    };

    const onFailure = (error) => {
      this.setState({
        isLoading: false,
      });
    };

    await APIKit.get(url).then(onSuccess).catch(onFailure);
  }

  componentDidMount() {
    const reservoirID = this.props.route.params || 0;
    if (reservoirID == 0)
      this.focusListener = this.props.navigation.addListener("focus", () => {
        const value = AsyncStorage.getItem("@storage_Key");
        value
          .then((v) => {
            const auth = JSON.parse(v);
            this.setState({
              loginUser: auth,
              isLoading: false,
            });
            this.findMaintainerByName(
              auth?.authentication?.principal?.username
            );
          })
          .catch((err) => {
            alert(
              "🚀 ~ file: maintainerAssignedReservoir.js ~ line 59 ~ MaintainerAssignedReservoir ~ componentDidMount ~ err",
              err
            );
          });
      });
    else {
      this.setState({
        isAdmin: true,
      });
      this.getReservoirEveryDayDetails(reservoirID);
    }
  }

  functionToOpenSecondActivity = () => {
    this.props.navigation.navigate("Details", {
      loginUser: this.state.loginUser,
    });
  };

  render() {
    Moment.locale("en");
    const { data, isLoading } = this.state;
    // console.log(
    // "🚀 ~ file: maintainerAssignedReservoir.js ~ line 107 ~ MaintainerAssignedReservoir ~ render ~ data",
    // data
    // );

    const styles = StyleSheet.create({
      margin_10: {
        padding: 25,
        margin: 25,
      },
      container: {
        // marginBottom: 10,
        backgroundColor: "white",
        // position: "relative",

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

        borderRadius: 15,
        elevation: 5,
        // shadowOpacity:10
      },

      listItem_white: {
        backgroundColor: "white",
      },

      listItem_blue_white: {
        backgroundColor: "white",
      },

      unit: {
        fontSize: 12,
      },
      //row 1

      row_1: {
        // backgroundColor: "lightblue",
        justifyContent: "space-between",
        flexDirection: "row",
        flex: 1,
        padding: 10,
        alignItems: "center",
        // backgroundColor:"blue"
        // borderWidth: 1,
        // borderRadius: 10,
        // borderColor:"lightgray",
        // elevation: 3,
        // backgroundColor: "white",
        // borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#edece8",
      },

      inside_left: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        justifyContent: "space-between",
      },
      inside_left_col1: {
        marginRight: 15,
      },
      inside_left_col2: {},

      inside_right: {},

      name1: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#1F75FE", //secondary blue color
      },

      name1_black: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "black", //secondary blue color
      },

      region: {
        color: "grey",
      },

      rainfall: {
        textAlign: "center",
      },

      value: {
        color: "#1F75FE",
        fontSize: 15,
        textAlign: "center",
      },
      //row 2

      row_2: {
        // backgroundColor: "red",
        justifyContent: "space-around",
        flexDirection: "row",
        flex: 1,
        // borderBottomWidth: 1,
        // borderBottomColor: "lightgray",
        alignItems: "center",
        padding: 10,
      },

      row2_inside_left: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },

      row2_inside_right: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },

      // row 3
      row_3: {
        // backgroundColor: "green",
        justifyContent: "space-around",
        flexDirection: "row",
        flex: 1,
        // padding: 10,
        // paddingHorizontal: 15,
        borderTopWidth: 1,
        // borderRadius: 10,
        borderColor: "#edece8",
        // margin:1,
        // elevation:3,
        // backgroundColor:"white",
      },

      row3_col1: {
        // borderRightWidth: 1,
        // borderRightColor: "lightgray",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingRight: 15,
      },

      row3_col2: {
        // borderRightWidth: 1,
        // borderRightColor: "lightgray",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingRight: 15,
      },

      row3_col3: {
        // borderRightWidth:1,
        // borderRightColor:"lightgray",

        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },

      row3_col3_one: {
        paddingTop: 5,
      },
      row3_col3_two: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // borderWidth:1,
      },
      in: {
        textAlign: "center",
        fontSize: 12,
      },
      out: {
        textAlign: "center",
        fontSize: 12,
      },
      in1: {
        padding: 6,
        textAlign: "center",
      },
      in2: {
        padding: 6,
        textAlign: "center",
      },
      rainfall1: {
        textAlign: "justify",
      },

      // backgroundColor_white: {
      //   backgroundColor: white,
      // },

      touchableOpacityStyle: {
        position: "absolute",
        right: 35,
        bottom: 30,
        // alignItems: "center",
        // justifyContent: "center",
        backgroundColor: "#fff",
        borderRadius: 55,
  
      },
      floatingButtonStyle: {
        // opacity: 0.8,
      },
    });

    return (
      <View>
        {this.state.isAdmin == true && (
          <View style={[this.state.isAdmin ? styles.margin_10 : null]}>
            <Text style={styles.name1_black}>Reservoir Details</Text>
          </View>
        )}

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <SafeAreaView style={styles.container}>
            <FlatList
              style={{ paddingTop: 5 }}
              data={data.sort((a, b) => b.id - a.id)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const { reservoir } = item;
                return (
                  <View
                    style={[
                      styles.listItem,
                      Moment(item.createdOn).isSame(new Date(), "day")
                        ? styles.listItem_white
                        : styles.listItem_blue_white,
                    ]}
                  >
                    <View style={styles.row_1}>
                      <View style={styles.inside_left}>
                        <View style={styles.inside_left_col1}>
                          <Text style={styles.name1}>
                            {reservoir.name || "NA"}
                          </Text>
                          <Text style={styles.region}>
                            {reservoir.region || "NA"}
                          </Text>
                        </View>

                        {item.rainfall > 0 ? (
                          <View style={styles.inside_left_col2}>
                            <Text style={styles.rainfall1}>
                              <Ionicons
                                name="rainy-outline"
                                size={24}
                                color="red"
                              />
                            </Text>

                            <Text style={[styles.rainfall, styles.value]}>
                              {item.rainfall || "NA"}
                              <Text style={styles.unit}> mm</Text>
                            </Text>
                          </View>
                        ) : (
                          <View style={styles.inside_left_col2}>
                            <Text style={styles.rainfall1}>
                              <Ionicons
                                name="cloud-offline-outline"
                                size={24}
                                color="red"
                              />
                            </Text>
                          </View>
                        )}
                      </View>

                      <View style={styles.inside_right}>
                        <Text style={styles.listItemText}>Last Updated on</Text>
                        <Text style={styles.value}>
                          {Moment(item.createdOn).format("lll") || "NA"}
                        </Text>
                      </View>
                    </View>

                    {/* row 2 */}
                    {/* <View style={styles.row_2}>
                      <View style={styles.row2_inside_left}>
                        <Text style={styles.listItemText}>Full Capacity</Text>

                        <Text style={styles.value}>
                          {reservoir.capacity || "NA"}
                          <Text style={styles.unit}>/mcft</Text>
                        </Text>
                      </View>

                      <View style={styles.row2_inside_right}>
                        <Text style={styles.listItemText}>Full Height</Text>

                        <Text style={styles.value}>
                          {reservoir.fullHeight || "NA"}
                          <Text style={styles.unit}>/ft</Text>
                        </Text>
                      </View>
                    </View> */}

                    {/* row 3 */}

                    <View style={styles.row_3}>
                      <View style={styles.row3_col1}>
                        <Text style={styles.listItemText}>PDOS</Text>

                        <Text style={styles.value}>
                          {item.presentDepthOfStorage || "-"}
                          <Text style={styles.unit}>/ft</Text>
                        </Text>
                      </View>

                      <View style={styles.row3_col2}>
                        <Text style={styles.listItemText}>PS</Text>

                        <Text style={styles.value}>
                          {item.presentStorage || "-"}
                          <Text style={styles.unit}>/mcft</Text>
                        </Text>
                      </View>

                      {/* row3-col3 */}
                      <View style={styles.row3_col3}>
                        <View style={styles.row3_col3_one}>
                          <Text style={styles.listItemText}>Flow in c/s</Text>
                        </View>
                        <View style={styles.row3_col3_two}>
                          <View style={styles.in1}>
                            <Text style={[styles.unit, styles.in]}>In</Text>
                            <Text style={styles.value}>
                              {item.inflow || "-"}
                            </Text>
                          </View>
                          <View style={styles.in2}>
                            <Text style={[styles.unit, styles.out]}>Out</Text>
                            <Text style={styles.value}>
                              {item.outflow || "-"}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    {/* ----end----row3 */}
                  </View>
                );
              }}
            />
          </SafeAreaView>
        )}

        {this.state.isAdmin == false && (
          <Pressable onPressIn={this.functionToOpenSecondActivity.bind(this)}>
            <View style={styles.touchableOpacityStyle}>
              <Ionicons name="add-circle" size={64} color="#4278cf" />

              {/* <FontAwesome name="plus-circle"  size={64} color="#4278cf" /> */}
            </View>
          </Pressable>
        )}
      </View>
    );
  }
}
