import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions,
  useColorScheme
} from "react-native";
import theme from "../util/theme";

const DateList = ({ onDateSelect }) => {
    
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const flatListRef = useRef();
  const DATE_ITEM_HEIGHT = 50;
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const scheme = useColorScheme();
  const color = theme(scheme)

  const getItemLayout = (data, index) => ({
    length: DATE_ITEM_HEIGHT,
    offset: DATE_ITEM_HEIGHT * index,
    index,
  });

  useEffect(() => {
    setDates(getDatesForMonth(currentMonth));
    const today = new Date();
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    const todayIndex = dates.findIndex(
      (date) =>
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
    );

    if (todayIndex >= 0 && flatListRef.current && dates.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: todayIndex,
        });
        const selected = dates[todayIndex];
        setSelectedDate(selected);
      }, 100);
    }
  }, [dates, currentMonth]);

  const getDatesForMonth = (month) => {
    const dates = [];
    let date = new Date(new Date().getFullYear(), month, 1);

    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };
  const handleDatePress = (date) => {
    if (!date) return;
    const formattedDate = formatDate(date);
    setSelectedDate(date);
    onDateSelect && onDateSelect(formattedDate);
  };

  const renderItem = ({ item }) => {
    const isSelectedDate =
      selectedDate && item.toDateString() === selectedDate.toDateString();
  const itemStyle = isSelectedDate ? (scheme === 'dark' ? styles.dateTodayDark : styles.dateTodayLight) : styles.date;
  const textStyle = isSelectedDate ? (scheme === 'dark' ? styles.dateTextTodayDark : styles.dateTextTodayLight) : styles.dateText;

    return (
      <TouchableOpacity onPress={() => handleDatePress(item)} style={itemStyle}>
      <Text style={textStyle}>
          {item.toLocaleString("default", { month: "short" })}
          {"\n"}
          {item.getDate()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ width: "95%", alignSelf: 'center' }}>
      <FlatList
        ref={flatListRef}
        data={dates}
        renderItem={renderItem}
        keyExtractor={(item) => item.toDateString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dateList}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

export default DateList;

const styles = StyleSheet.create({
  dateList: {
    marginVertical: 5,
  },
  date: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: "#625F5F",
  },
  dateTodayLight: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "black",
    borderRadius: 10,
  },
  dateTodayDark:{
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10
  },
  dateText: {
    color: "#625F5F",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "300",
  },
  dateTextTodayLight: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "300",
  },

  dateTextTodayDark:{
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300'
  }
});
