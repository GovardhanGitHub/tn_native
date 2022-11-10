import { Component } from "react";
import {
  Text,
  Image,
  View,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import moment from "moment";

import { CommonActions } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import APIKit from "./http-api";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

export class SecondActivity extends Component {
  constructor(props) {
    super(props);

    const { loginUser } = this.props.route.params;

    // console.log(
    // "🚀 ~ file: updateDataModel.js ~ line 24 ~ SecondActivity ~ constructor ~ props",
    // loginUser?.reservoirs[0]?.id
    // );

    // Don't do this!
    this.state = {
      userId: loginUser?.id,
      reservoirId: loginUser?.reservoirs[0]?.id,
      reservoirName: loginUser?.reservoirs[0]?.name,
      inflow: 0.0,
      outflow: 0.0,
      presentDepthOfStorage: 0.0,
      presentStorage: 0.0,
      rainfall: 0.0,
      show: false,
      date: new Date(),
      displayFormat: "DD/MM/YYYY",
    };
  }

  async updateReservoirEveryDayDetails() {
    const url = "/reservoir/updateEveryDayDetails";
    const onSuccess = ({ data }) => {
      this.goBack();
    };

    const onFailure = (error) => {
      alert("authentication token expired! please logout and try again..");
      this.setState({
        isLoading: false,
      });
    };

    if (this.state.presentDepthOfStorage && this.state.presentStorage)
      await APIKit.post(url, this.state, {
        headers: {
          "content-type": "application/json",
        },
      })
        .then(onSuccess)
        .catch(onFailure);
    else alert("Present Stroge and Present Depth of Stroage is required!");
  }

  goBack() {
    this.props.navigation.dispatch(CommonActions.goBack());
  }

  render() {
    const styles = StyleSheet.create({
      containerView: {
        flex: 1,
        padding: 16,
        marginBottom: 50,
        marginTop: 50,
      },

      loginScreenContainer: {
        flex: 1,
        backgroundColor: "white",
        elevation: 1,
        borderRadius: 15,
        justifyContent: "center",
      },

      row1: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 10,
        // borderWidth:1
        borderBottomWidth: 1,
        borderBottomColor: "#edece8",
      },

      row2: {
        padding: 10,
      },

      logoText: {
        fontSize: 32,
        fontWeight: "800",
        // marginTop: 30,
        // marginBottom: 30,
        textAlign: "center",
        marginLeft: 5,
        // borderBottomWidth: 1,
        // borderBottomColor: "lightgray",
      },

      loginFormView: {
        flex: 1,
      },
      loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#1F75FE",
        backgroundColor: "#fafafa",
        paddingLeft: 10,
        marginTop: 5,
        marginBottom: 5,
      },

      loginButton: {
        backgroundColor: "#3897f1",
        borderRadius: 10,
        height: 45,
        marginTop: 10,
        marginBottom: 100,
        width: 350,
        alignItems: "center",
      },

      lable: {
        fontSize: 17,
        fontWeight: "600",
      },

      both: {
        padding: 10,
      },
    });

    const onChange = (event, selectedDate) => {
      this.setState({
        show: false,
        date: selectedDate,
      });
    };

    const showDatepicker = () => {
      this.setState({
        show: true,
      });
    };

    const { date } = this.state;

    return (
      <ScrollView style={styles.containerView} behavior="height">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              {/* row1 */}
              <View style={styles.row1}>
                <View>
                  <Pressable onPressIn={() => this.goBack()}>
                    <Ionicons
                      name="arrow-back-circle"
                      size={32}
                      color="black"
                    />
                  </Pressable>
                </View>
                <View>
                  <Text style={styles.logoText}>Update Today's Details</Text>
                </View>
              </View>
              {/* row2 */}
              <View style={styles.row2}>
                <Text style={styles.lable}>Date</Text>
                <Pressable onPress={showDatepicker}>
                  <View pointerEvents="none">
                    <TextInput
                      placeholder="Date"
                      placeholderColor="#c4c3cb"
                      value={
                        date
                          ? moment(date).format(this.state.displayFormat)
                          : ""
                      }
                      style={styles.loginFormTextInput}
                    />
                  </View>
                </Pressable>

                {this.state.show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    onChange={onChange}
                  />
                )}

                <Text style={styles.lable}>Rainfall (in mm)</Text>
                <TextInput
                  placeholder="Rainfall"
                  placeholderColor="#c4c3cb"
                  value={this.state.rainfall}
                  onChangeText={(e) =>
                    this.setState({
                      rainfall: e,
                    })
                  }
                  keyboardType="decimal-pad"
                  style={styles.loginFormTextInput}
                />

                <Text style={styles.lable}>
                  Present Depth Of Storage (in ft)
                </Text>
                <TextInput
                  placeholder="Present Depth Of Storage"
                  placeholderColor="#c4c3cb"
                  value={this.state.presentDepthOfStorage}
                  onChangeText={(e) =>
                    this.setState({
                      presentDepthOfStorage: e,
                    })
                  }
                  keyboardType="decimal-pad"
                  style={styles.loginFormTextInput}
                />
                <Text style={styles.lable}>Present Storage (in mcft)</Text>
                <TextInput
                  placeholder="Present Storage"
                  placeholderColor="#c4c3cb"
                  value={this.state.presentStorage}
                  onChangeText={(e) =>
                    this.setState({
                      presentStorage: e,
                    })
                  }
                  keyboardType="decimal-pad"
                  style={styles.loginFormTextInput}
                />
                <Text style={styles.lable}>Inflow (c/s)</Text>
                <TextInput
                  placeholder="Inflow"
                  placeholderColor="#c4c3cb"
                  value={this.state.inflow}
                  onChangeText={(e) =>
                    this.setState({
                      inflow: e,
                    })
                  }
                  keyboardType="decimal-pad"
                  style={styles.loginFormTextInput}
                />
                <Text style={styles.lable}>OutFlow (c/s)</Text>
                <TextInput
                  placeholder="OutFlow"
                  placeholderColor="#c4c3cb"
                  value={this.state.outflow}
                  onChangeText={(e) =>
                    this.setState({
                      outflow: e,
                    })
                  }
                  keyboardType="decimal-pad"
                  style={styles.loginFormTextInput}
                />
              </View>

              <View style={styles.both}>
                <TouchableOpacity>
                  <Button
                    onPress={this.updateReservoirEveryDayDetails.bind(this)}
                    buttonStyle={styles.loginButton}
                    title="Submit"
                    color="#1F75FE"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}
