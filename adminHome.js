import { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  Modal,
  Alert,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  View,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import React from "react";
import APIKit from "./http-api";
import { SafeAreaView, StyleSheet } from "react-native";
import Card from "./card";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Moment from "moment";
import moment from "moment";
import Ionicons from "@expo/vector-icons/Ionicons";

export default class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      backupData: [],
      isLoading: true,
      modalVisible: false,
      district: "District",
      districtList: [],
      selectedId: 0,
      reservoirList: [],
      //for filtering the data
      show: false,
      date: new Date(),
      displayFormat: "DD/MM/YYYY",
      filterDateFormat: "YYYY-MM-DD",
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  clearFilter = () => {
    // if (this.state.backupData.length > 0)
    //   this.setState({
    //     data: this.state.backupData,
    //   });

    this.getRecentUpdatedData(this.state.reservoirList);
  };

  async findAllReservoirs() {
    this.setState({
      reservoirList: [],
      data: [],
      backupData: [],
    });

    const onSuccess = ({ data }) => {
      this.setState({
        reservoirList: data,
        isLoading: false,
      });
      if (data != null) this.getRecentUpdatedData(data);
    };

    const onFailure = (error) => {
      this.setState({
        isLoading: false,
      });
      alert("findAll failed " + JSON.stringify(error.response));
    };

    await APIKit.get("/reservoir/findAll").then(onSuccess).catch(onFailure);
  }

  findTodayReservoirEveryDayDetails = [];
  getReservoirEveryDayDetails(element, id) {
    const url = "/reservoir/findTodayReservoirEveryDayDetails/" + id;
    const onSuccess = ({ data }) => {
      element = { ...element, data };
      // console.log(
      // "🚀 ~ file: adminHome.js ~ line 42 ~ AdminHome ~ onSuccess ~ element",
      // element
      // );
      this.findTodayReservoirEveryDayDetails.push(element);
    };

    const onFailure = (error) => {
      // console.log(
      // "🚀 ~ file: adminHome.js ~ line 44 ~ AdminHome ~ onFailure ~ error",
      // error
      // );
    };

    APIKit.get(url).then(onSuccess).catch(onFailure);
  }

  getRecentUpdatedData(reservoirList) {
    this.findTodayReservoirEveryDayDetails = [];
    for (const element of reservoirList) {
      this.getReservoirEveryDayDetails(element, element?.id);
    }

    setTimeout(() => {
      this.setState({
        data: this.findTodayReservoirEveryDayDetails,
        backupData: this.findTodayReservoirEveryDayDetails,
        isLoading: false,
      });
    }, 2000);
  }

  componentDidMount() {
    this.findAllReservoirs();
  }

  openPopup(reservoirID) {
    if (reservoirID)
      this.props.navigation.navigate("ReservoirModel", reservoirID);
  }

  render() {
    const { data, isLoading, modalVisible, selectedId, reservoirList } =
      this.state;

    filterdreservoirList = reservoirList.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.region === value.region)
    );

    const onChange = (event, selectedDate) => {
      const { reservoirList } = this.state;
      // console.log(
      // "🚀 ~ file: adminHome.js ~ line 104 ~ AdminHome ~ onChange ~ selectedDate",
      // selectedDate,
      // reservoirList
      // );
      this.setState({
        show: false,
        isLoading: true,
        date: selectedDate,
      });
      // call API for filter by date

      this.findTodayReservoirEveryDayDetails = [];
      for (let element of reservoirList) {
        const url =
          "reservoir/findByDateReservoirEveryDayDetails/" +
          element?.id +
          "/" +
          moment(selectedDate).format(this.state.filterDateFormat);
        // console.log(
        // "🚀 ~ file: adminHome.js ~ line 113 ~ AdminHome ~ onChange ~ url",
        // url
        // );

        const onSuccess = ({ data }) => {
          // console.log(
          // "🚀 ~ file: adminHome.js ~ line 131 ~ AdminHome ~ onSuccess ~ data",
          // data
          // );
          element = { ...element, data };
          this.findTodayReservoirEveryDayDetails.push(element);
        };

        const onFailure = (error) => {
          // console.log(
          // "🚀 ~ file: adminHome.js ~ line 94 ~ AdminHome ~ findByDateReservoirEveryDayDetails ~ error",
          // error
          // );
        };
        APIKit.get(url).then(onSuccess).catch(onFailure);
      }

      setTimeout(() => {
        this.setState({
          data: this.findTodayReservoirEveryDayDetails,
          backupData: this.findTodayReservoirEveryDayDetails,
          isLoading: false,
        });
      }, 2000);
    };

    const showDatepicker = () => {
      this.setState({
        show: true,
      });
    };

    const selectedDistrict = (region) => {
      this.setState({
        data: this.state.backupData.filter((t) => t.region === region),
      });

      this.setModalVisible(!modalVisible);
    };

    const styles = StyleSheet.create({
      modalView: {
        marginVertical: 40,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
      },
      container: {
        // marginBottom: 10,
        backgroundColor: "white",
        // alignItems: "center", // Centered horizontally

        overflow: "scroll",
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
        // padding: 0,
        // borderColor: "#0087BD",
        // borderWidth: 1,
        backgroundColor: "#f5f6f3",
        borderRadius: 15,
        elevation: 5,

        // shadowOpacity:10
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

      region: {
        color: "grey",
      },

      rainfall: {
        textAlign: "center",
      },

      value: {
        color: "#1F75FE",
        fontWeight: "300",
        fontSize: 18,
        textAlign: "center",
      },

      value_date: {
        color: "#1F75FE",

        fontSize: 14,
        textAlign: "center",
      },
      value_time: {
        color: "black",
        fontSize: 10,
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

      item: {
        padding: 4,
        margin: 4,
      },
      title: {
        fontSize: 18,
        fontWeight: "400",
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

      // Filter styles

      filter_group: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // padding: 7,
        // marginHorizontal: 12,

        // borderWidth:1
      },

      filter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 7,
        marginHorizontal: 12,

        // borderWidth:1
      },
      filter_date: {
        marginRight: 4,
        fontSize: 13,
      },
    });

    const DistrictItemLayout = ({
      item,
      onPress,
      backgroundColor,
      textColor,
    }) => (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.item, backgroundColor]}
      >
        <Text style={[styles.title, textColor]}>{item.region}</Text>
      </TouchableOpacity>
    );

    const districtItem = ({ item }) => {
      // console.log(
      // "🚀 ~ file: adminHome.js ~ line 466 ~ AdminHome ~ districtItem ~ item",
      // item
      // );

      const backgroundColor = item.id === selectedId ? "blue" : "white";
      const color = item.id === selectedId ? "white" : "black";

      return (
        <DistrictItemLayout
          item={item}
          onPress={() => selectedDistrict(item.region)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    };

    return (
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <SafeAreaView style={styles.container}>
            <View style={styles.filter_group}>
              <Pressable onPress={showDatepicker}>
                <View style={styles.filter}>
                  <Text style={styles.filter_date}>
                    {this.state.date
                      ? moment(this.state.date).format(this.state.displayFormat)
                      : ""}
                  </Text>
                  <Ionicons name="calendar" size={19} color="#464747" />
                  {this.state.show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={this.state.date}
                      mode="date"
                      onChange={onChange}
                    />
                  )}
                </View>
              </Pressable>

              <Pressable onPress={() => this.setModalVisible(true)}>
                <View style={styles.filter}>
                  <Text style={styles.filter_date}>{this.state.district}</Text>
                  <Ionicons name="filter" size={19} color="#464747" />

                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      this.setModalVisible(!modalVisible);
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <SafeAreaView>
                          <FlatList
                            data={filterdreservoirList}
                            renderItem={districtItem}
                            keyExtractor={(item) => item.id}
                            extraData={selectedId}
                          />
                        </SafeAreaView>

                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => this.setModalVisible(!modalVisible)}
                        >
                          <Text style={styles.textStyle}>close</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                </View>
              </Pressable>

              <Pressable onPressIn={() => this.clearFilter()}>
                <View style={styles.filter}>
                  <Ionicons name="filter" size={19} color="red">
                    X
                  </Ionicons>
                </View>
              </Pressable>
            </View>

            <FlatList
              style={{ paddingTop: 5 }}
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const { data } = item;

                return (
                  <TouchableOpacity
                    onPress={this.openPopup.bind(this, item.id)}
                  >
                    <View style={styles.listItem}>
                      <View style={styles.pad}>
                        <View style={styles.row_1}>
                          <View style={styles.inside_left}>
                            <View style={styles.inside_left_col1}>
                              <Text style={styles.name1}>
                                {item.name || "NA"}
                              </Text>
                              <Text style={styles.region}>
                                {item.region || "NA"}
                              </Text>
                            </View>

                            {item.data[item.data?.length - 1]?.rainfall > 0 ? (
                              <View style={styles.inside_left_col2}>
                                <Text style={styles.rainfall1}>
                                  <Ionicons
                                    name="rainy-outline"
                                    size={24}
                                    color="red"
                                  />
                                </Text>

                                <Text style={[styles.rainfall, styles.value]}>
                                  {item.data[item.data?.length - 1]?.rainfall ||
                                    "NA"}
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

                          {item.data[item.data?.length - 1]?.createdOn ? (
                            <View style={styles.inside_right}>
                              <Text style={styles.listItemText}>
                                Last Updated on
                              </Text>
                              <Text style={styles.value_date}>
                                {moment(
                                  item.data[item.data?.length - 1]?.createdOn
                                ).format("LL") || "NA"}

                                <Text style={styles.value_time}>
                                  {"\n" +
                                    moment(
                                      item.data[item.data?.length - 1]
                                        ?.createdOn
                                    ).format("LT") || "NA"}
                                </Text>
                              </Text>
                            </View>
                          ) : (
                            <View style={styles.inside_right}>
                              <Text style={styles.listItemText}>
                                Last Updated on
                              </Text>
                              <Text style={styles.value_date}>{"NA"}</Text>
                            </View>
                          )}
                        </View>

                        {/* row 2 */}
                        <View style={styles.row_2}>
                          <View style={styles.row2_inside_left}>
                            <Text style={styles.listItemText}>
                              Full Capacity
                            </Text>

                            <Text style={styles.value}>
                              {item.capacity || "NA"}
                              <Text style={styles.unit}>/mcft</Text>
                            </Text>
                          </View>

                          <View style={styles.row2_inside_right}>
                            <Text style={styles.listItemText}>Full Height</Text>

                            <Text style={styles.value}>
                              {item.fullHeight || "NA"}
                              <Text style={styles.unit}>/ft</Text>
                            </Text>
                          </View>
                        </View>

                        {/* row 3 */}

                        <View style={styles.row_3}>
                          <View style={styles.row3_col1}>
                            <Text style={styles.listItemText}>
                              Present Depth {"\n"} of Storage
                            </Text>

                            <Text style={styles.value}>
                              {item.data[item.data?.length - 1]
                                ?.presentDepthOfStorage || "-"}
                              <Text style={styles.unit}>/ft</Text>
                            </Text>
                          </View>

                          <View style={styles.row3_col2}>
                            <Text style={styles.listItemText}>
                              Present Storage
                            </Text>

                            <Text style={styles.value}>
                              {item.data[item.data?.length - 1]
                                ?.presentStorage || "-"}
                              <Text style={styles.unit}>/mcft</Text>
                            </Text>
                          </View>

                          {/* row3-col3 */}
                          <View style={styles.row3_col3}>
                            <View style={styles.row3_col3_one}>
                              <Text style={styles.listItemText}>
                                Flow in c/s
                              </Text>
                            </View>
                            <View style={styles.row3_col3_two}>
                              <View style={styles.in1}>
                                <Text style={[styles.unit, styles.in]}>In</Text>
                                <Text style={styles.value}>
                                  {item.data[item.data?.length - 1]?.inflow ||
                                    "-"}
                                </Text>
                              </View>
                              <View style={styles.in2}>
                                <Text style={[styles.unit, styles.out]}>
                                  Out
                                </Text>
                                <Text style={styles.value}>
                                  {item.data[item.data?.length - 1]?.outflow ||
                                    "-"}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        {/* ----end----row3 */}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </SafeAreaView>
        )}
      </View>
    );
  }
}
