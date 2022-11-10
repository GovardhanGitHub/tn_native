// import { Component } from "react";
// import { ActivityIndicator, FlatList, Text, View, Button } from "react-native";
// import React from "react";
// import APIKit from "./http-api";
// import { SafeAreaView, StyleSheet } from "react-native";
// import Card from "./card";
// import { Colors } from "react-native/Libraries/NewAppScreen";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";

// export default class MaintainerProfile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       reservoir: {},
//       loginUser: {},
//       data: {},
//       isLoading: true,
//     };
//   }

//   async findMaintainerByName(name) {
//     const onSuccess = ({ data }) => {
//       this.setState({
//         loginUser: data,
//         reservoir: data.reservoirs[0],
//         isLoading: false,
//       });
// //       console.log(
// //         "🚀 ~ file: maintainerProfile.js ~ line 27 ~ MaintainerProfile ~ onSuccess ~ loginUser",
// //         this.state.loginUser
// //       );
//     };

//     const onFailure = (error) => {
// //       console.log(
// //         "🚀 ~ file: MaintainerProfile.js ~ line 42 ~ MaintainerProfile ~ onFailure ~ error",
// //         error
// //       );
//       alert("findAll failed " + JSON.stringify(error.response));
//       this.setState({
//         isLoading: false,
//       });
//     };

//     await APIKit.post("/users/findMaintainerByName", name, {
//       headers: {
//         "content-type": "text/plain",
//       },
//     })
//       .then(onSuccess)
//       .catch(onFailure);
//   }

//   componentDidMount() {
//     const value = AsyncStorage.getItem("@storage_Key");
//     value
//       .then((v) => {
//         const auth = JSON.parse(v);
//         this.setState({
//           data: auth,
//           isLoading: false,
//         });
//         console.log(
//           "🚀 ~ file: MaintainerProfile.js ~ line 49 ~ MaintainerProfile ~ .then ~ this.setState",
//           auth
//         );
//         this.findMaintainerByName(auth?.authentication?.principal?.username);
//       })
//       .catch((err) => {
//         console.log("can't fetch profile...", err);
//       });
//   }

//   logoutCallBack = () => {
//     this.props.navigation.navigate("Login");
//   };

//   render() {
//     const { isLoading, loginUser, reservoir } = this.state;
//     // const reservoir = loginUser.reservoirs[0];
// //     console.log(
// //       "🚀 ~ file: maintainerProfile.js ~ line 75 ~ MaintainerProfile ~ render ~ loginUser",
// //       reservoir
// //     );

//     const Item = ({ item }) => (
//       <Card style={styles.card}>
//         <Text style={styles.baseText}>{item.id}</Text>
//       </Card>
//     );
//     const renderItem = ({ item }) => <Item title={item} />;

//     const styles = StyleSheet.create({
//       container: {
//         flex: 1,
//         margin: 8,
//         // alignItems: "center", // Centered horizontally
//       },

//       baseText: {
//         fontWeight: "bold",
//         fontSize: 24,
//       },
//       innerText: {
//         color: "red",
//       },
//       sectionTitle: {
//         fontSize: 24,
//         fontWeight: "600",
//         color: "white",
//       },
//       card: {
//         marginTop: 8,
//         marginBottom: 8,
//         backgroundColor: "rgba(242, 247, 249,.3)",
//         padding: 9,
//         borderRadius: 5,
//       },
//       text: {
//         fontSize: 20,
//         color: "#101010",
//         marginTop: 60,
//         fontWeight: "700",
//       },
//       listItem: {
//         marginTop: 10,
//         padding: 20,
//         // alignItems: "center",
//         backgroundColor: "#fff",
//         width: "100%",
//       },
//       baseText2: {
//         fontSize: 18,
//         fontWeight: "normal",
//       },
//       both: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//       },
//       boxWithShadow: {
//         shadowColor: "#838785",
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.8,
//         shadowRadius: 5,
//       },
//     });

//     return (
//       <View style={{ flex: 1, padding: 2 }}>
//         {isLoading ? (
//           <ActivityIndicator />
//         ) : (
//           <SafeAreaView style={styles.container}>
//             <View style={styles.listItem}>
//               <Text style={styles.baseText}>
//                 Username : {loginUser.username || "NA"}
//               </Text>

//               <View style={[styles.card, styles.boxWithShadow]}>
//                 <Text style={[styles.baseText, styles.baseText2]}>
//                   Reservoir Name : {reservoir.name || "NA"}
//                 </Text>
//                 <View style={styles.both}>
//                   <Text style={[styles.baseText, styles.baseText2]}>
//                     Full Height : {reservoir.fullHeight || "NA"}
//                   </Text>

//                   <Text style={[styles.baseText, styles.baseText2]}>
//                     Capacity : {reservoir.capacity || "NA"}
//                   </Text>
//                 </View>
//               </View>

//               <Button
//                 title="Logout"
//                 color="skyblue"
//                 onPress={() => {
//                   AsyncStorage.removeItem("@storage_Key", this.logoutCallBack);
//                 }}
//               ></Button>
//             </View>
//           </SafeAreaView>
//         )}
//       </View>
//     );
//   }
// }

import { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import APIKit from "./http-api";
import { SafeAreaView, StyleSheet } from "react-native";
import Card from "./card";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";

export default class MaintainerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUser: {},
      data: {},
      role: "",
      assignedReservoir: {},
      isLoading: true,
    };
  }

  findMaintainerByName(name) {
    // console.log(
    // "🚀 ~ file: MaintainerProfile.js ~ line 32 ~ MaintainerProfile ~ findMaintainerByName ~ name",
    // name
    // );

    const onSuccess = ({ data }) => {
      // console.log(
      // "🚀 ~ file: MaintainerProfile.js ~ line 34 ~ MaintainerProfile ~ onSuccess ~ res",
      // data
      // );

      this.setState({
        loginUser: data,
        role: data?.roles[0].name || "NA",
        assignedReservoir: data?.reservoirs[0],

        isLoading: false,
      });
    };

    const onFailure = (error) => {
      // console.log(
      // "🚀 ~ file: MaintainerProfile.js ~ line 42 ~ MaintainerProfile ~ onFailure ~ error",
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
        // console.log("🚀 ~ file: maintainerProfile.js ~ line 277 ~ MaintainerProfile ~ .then ~ auth", auth)
        this.setState({
          data: auth,
          isLoading: false,
        });

        this.findMaintainerByName(auth?.authentication?.principal?.username);
      })
      .catch((err) => {
        // console.log("🚀 ~ file: maintainerProfile.js ~ line 286 ~ MaintainerProfile ~ componentDidMount ~ err", err)
      });
  }

  render() {
    const { isLoading, loginUser, role, assignedReservoir } = this.state;

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
      rev: {
        flexDirection: "row-reverse",
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
      col_1_n: {
        // borderRightWidth: 1,
        // borderRightColor: "#e5e6e6",
        // width: "40%",
        // padding: 15,
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
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

      image: {
        width: 60,
        height: 60,
        borderWidth: 1,
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
                    <Ionicons name="person" size={60} color="#1F75FE" />
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
                <View style={styles.group}>
                  <Text style={styles.small}>Name:</Text>
                  <Text style={styles.big}>
                    {loginUser.name || "-XXXX Xxxx-"}
                  </Text>
                </View>

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

            <View style={[styles.listItem]}>
              {/* col 1 */}
              <View style={[styles.col_1]}>
                <View style={styles.col_1_row_1}>
                  {/* <Ionicons
                  <Text style={styles.rainfall1}>
                      name="library-outline"
                      size={60}
                      color="#1F75FE"
                    />
                      </Text>
                    */}
                  <Image
                    style={styles.image}
                    source={require("./assets/dam.png")}
                  />
                </View>
              </View>

              {/* col 2 */}
              <View style={[styles.col_2, styles.cen]}>
                <View style={styles.group}>
                  <Text style={styles.small}>Assignd Reservoir:</Text>
                  <Text style={styles.big}>
                    {assignedReservoir.name || "-"}
                  </Text>
                </View>

                <View style={styles.group}>
                  <Text style={styles.small}>Region:</Text>
                  <Text style={styles.big}>
                    {assignedReservoir.region || "-"}
                  </Text>
                </View>

                <View style={styles.group}>
                  <Text style={styles.small}>Capacity:</Text>
                  <Text style={styles.big}>
                    {assignedReservoir.capacity || "-"}
                  </Text>
                </View>

                <View style={styles.group}>
                  <Text style={styles.small}>Full Height:</Text>
                  <Text style={styles.big}>
                    {assignedReservoir.fullHeight || "-"}
                  </Text>
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
