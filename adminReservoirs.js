import { Component } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import React from "react";
import APIKit from "./http-api";
import { SafeAreaView, StyleSheet } from "react-native";
import Card from "./card";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default class AdminReservoir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }

  async findAll() {
    const onSuccess = ({ data }) => {
      // console.log(
      // "🚀 ~ file: adminReservoirs.js ~ line 20 ~ AdminReservoir ~ onSuccess ~ data",
      // data
      // );
      this.setState({
        data: data,
        isLoading: false,
      });
    };

    const onFailure = (error) => {
      // console.log(
      // "🚀 ~ file: adminReservoirs.js ~ line 28 ~ AdminReservoir ~ onFailure ~ error",
      // error
      // );
      alert("findAll failed " + JSON.stringify(error.response));
      this.setState({
        isLoading: false,
      });
    };

    await APIKit.get("/reservoir/findAll").then(onSuccess).catch(onFailure);
  }

  componentDidMount() {
    this.findAll();
  }

  render() {
    const { data, isLoading } = this.state;

    const styles_1 = StyleSheet.create({
      container: {
        flex: 1,
        margin: 8,
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
        marginTop: 10,
        padding: 20,
        // alignItems: "center",
        backgroundColor: "#fff",
        width: "100%",
      },
    });

    const styles = StyleSheet.create({
      container: {
        // margin: 8,
        // marginBottom: 5,
        
        backgroundColor: "white",
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
        // shadowOpacity:10
      },

      unit: {
        fontSize: 12,
      },
      //row 1

      row_1: {
        // backgroundColor: "lightblue",
        justifyContent: "center",
        flexDirection: "row",
        flex: 1,
        padding: 10,
        alignItems: "center",
        // backgroundColor:"blue"
        // borderWidth: 1,
        // borderRadius: 10,
        borderColor: "#edece8",
        // elevation: 3,
        // backgroundColor: "white",
        // borderRadius: 10,
        borderBottomWidth: 1,
        // borderBottomColor:"#edece8",
      },

      inside_left: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        justifyContent: "center",
      },
      inside_left_col1: {},
      inside_left_col2: {},

      inside_right: {},

      name1: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#1F75FE",
        textAlign: "center",
      },

      region: {
        color: "grey",
        textAlign: "center",
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
    });

    return (
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <SafeAreaView style={styles.container}>
            {/* <View style={{paddingBottom:15}}></View> */}
            <FlatList
            style={{paddingTop:8}}
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <View style={styles.row_1}>
                    <View style={styles.inside_left}>
                      <View style={styles.inside_left_col1}>
                        <Text style={styles.name1}>{item.name || "NA"}</Text>

                        <Text style={styles.region}>{item.region || "NA"}</Text>
                      </View>
                    </View>
                  </View>

                  {/* row 2 */}
                  <View style={styles.row_2}>
                    <View style={styles.row2_inside_left}>
                      <Text style={styles.listItemText}>Full Capacity</Text>

                      <Text style={styles.value}>
                        {item.capacity || "-"}
                        <Text style={styles.unit}>/mcft</Text>
                      </Text>
                    </View>

                    <View style={styles.row2_inside_right}>
                      <Text style={styles.listItemText}>Full Height</Text>

                      <Text style={styles.value}>
                        {item.fullHeight || "-"}
                        <Text style={styles.unit}>/ft</Text>
                      </Text>
                    </View>
                  </View>

                  {/* row 3 */}

                  {/* ----end----row3 */}
                </View>
              )}
            />
          </SafeAreaView>
        )}
      </View>
    );
  }
}

// <View style={styles.listItem}>
//   <Text style={styles.listItemText}>
//     ID : {item.id || "NA"}
//   </Text>

//   <Text style={styles.listItemText}>
//     Name : {item.name || "NA"}
//   </Text>

//   <Text style={styles.listItemText}>
//     Region : {item.region || "NA"}
//   </Text>

//   <Text style={styles.listItemText}>
//     Capacity : {item.capacity || "NA"}
//   </Text>

//   <Text style={styles.listItemText}>
//     Full Height : {item.fullHeight || "NA"}
//   </Text>

//   {/* <Text style={styles.listItemText}>
//     Reservoirs :
//     {item.reservoirs.map(function (r, index) {
//       return <Text key={index}>{r.name}, </Text>;
//     })}
//   </Text> */}

//   {/*
//   <Text style={styles.listItemText}>
//     Reservoirs : {item.reservoirs || "NA"}
//   </Text>

//   <Text style={styles.listItemText}>
//     Roles : {item.roles || "NA"}
//   </Text> */}
// </View>
