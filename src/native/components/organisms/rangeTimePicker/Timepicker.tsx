import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScrollPicker from 'react-native-picker-scrollview';
import { theme } from '../../../../utils';

type Props = {
  defaultValue?: string;
  onChangeValue: (value: string) => void;
};

const TimePicker = (props: Props) => {
  const [hour, setHour] = useState(props.defaultValue ? props.defaultValue?.substring(0, 2) : '12');
  const [minute, setMinute] = useState(props.defaultValue ? props.defaultValue?.substring(3, 5) : '00');

  const onHourChange = (data: string) => {
    setHour(data);
  };

  const onMinuteChange = (data: string) => {
    setMinute(Number(data) <= 9 ? `0${data}` : data);
  };

  useEffect(() => {
    const getHours = () => {
      let h = hour;
      if (h.length > 1){
        return h;
      }
      return Number(h) <= 9 ? `0${h}` : h;
    };
    let hh = getHours();
    let mm = minute;
    let selectedTime = `${hh}:${mm}`;
    props.onChangeValue(selectedTime);
  }, [hour, minute, props]);

  return (
    <View style={styles.container}>
      <ScrollPicker
        dataSource={Array.from(
          { length: 24 },
          (_, i) => i
        )}
        wrapperColor={'white'}
        selectedIndex={Number(hour)}
        highlightColor={'#d8d8d8'}
        renderItem={(data: string) => {
          return (
            <Text style={styles.textTime}>{data}</Text>
          );
        }}
        onValueChange={onHourChange}
      />
      <ScrollPicker
        dataSource={Array.from({ length: 4 }, (_, i) => i*15 )}
        wrapperColor={'white'}
        selectedIndex={Number(minute)/15}
        highlightColor={'#d8d8d8'}
        renderItem={(data: string) => {
          return (
            <Text style={styles.textTime}>{data}</Text>
          );
        }}
        onValueChange={onMinuteChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '40%',
    height: 170,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  textTime: {
    fontSize: 23,
    fontWeight: '400',
    lineHeight: 34.5,
    color: theme.colors['neutral-900'],
  }
});

export default TimePicker;
