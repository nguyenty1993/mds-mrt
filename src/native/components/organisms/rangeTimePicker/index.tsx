import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { View, StyleSheet, Text } from 'react-native';
import TimePicker from './Timepicker';
import { useTranslation } from 'react-i18next';
import Button from '../../atom/button';
import { theme } from '../../../../utils';

export type RangeTimePickerProps = {
  visible: boolean;
  title?: string;
  onClose: () => void;
  onSelect: (timeRange: { startTime: any; endTime: any }) => void;
  marginBottom?: number; 
  timeRange?: string; 
};

const TimeRangePicker: React.FC<RangeTimePickerProps> = (
  props: RangeTimePickerProps
) => {
  const { t } = useTranslation("common");
  const [selectedStartTime, setSelectedStartTime] = useState<string>('12:00');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('12:00');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const onChangeStartTime = (value: string) => {
    setSelectedStartTime(value);
  };

  const onChangeEndTime = (value: string) => {
    setSelectedEndTime(value);
  };

  const onCancel = () => {
    setSelectedStartTime('');
    setSelectedEndTime('');
    props.onClose();
    setIsVisible(false);
  };

  const onBackdropPress = () => {
    props.onClose();
    setIsVisible(false)
  }

  const onConfirm = () => {
    props.onSelect({
      startTime: selectedStartTime,
      endTime: selectedEndTime,
    });
    setIsVisible(false);
  };

  // check if endTime is after startTime
  useEffect(() => {
    let endTimeHour = selectedEndTime.substring(0, 2);
    let endTimeMinute = selectedEndTime.substring(3, 5);
    let startTimeHour = selectedStartTime.substring(0, 2);
    let startTimeMinute = selectedStartTime.substring(3, 5);

    // if no endTime is selected, set isValid to true
    if (selectedStartTime === '00:00' || selectedEndTime === '00:00') {
      setIsChanged(false);
      setIsValid(false);
      return;
    } else {
      setIsChanged(true);
    }

    // if endTimeHour less than startTimeHour
    if (Number(endTimeHour) < Number(startTimeHour)) {
      setIsValid(false);
    } else if (
      Number(endTimeHour) === Number(startTimeHour) &&
      Number(endTimeMinute) <= Number(startTimeMinute)
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [selectedStartTime, selectedEndTime]);

  useEffect(() => {
    if (props.visible && !isVisible) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [props.visible]);

  const buttons = (
    <View
      style={{
        flexDirection: "row",
        paddingTop: 8,
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: 'white',
      }}
    >
      <Button
        title={t('cancel')}
        bgColor={'white'}
        style={{ flex: 1, marginRight: 8}}
        textColor={theme.colors["neutral-600"]}
        borderColor={theme.colors["neutral-300"]}
        onPress={onCancel}
      />
      <Button
        title={t('choose')}
        style={{ flex: 1, opacity: !isValid ? 0.5 : 1 }}
        onPress={onConfirm}
        disabled={!isValid}
      />
    </View>
  );
  
  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onBackdropPress}
        animationInTiming={200}
        animationOutTiming={200}
        style={styles.modal}
      >
        <View style={[styles.container, {paddingBottom: props?.marginBottom ? props?.marginBottom : 0}]}>
          <View style={styles.header}>
            <Text style={styles.boldCenterText}>{props.title || ''}</Text>
            <View style={styles.viewTextTime}>
              <View style={styles.viewChildTextTime}>
                <Text style={styles.regularCenterText}>{t('from')}</Text>
                <Text style={styles.boldCenterText}>{selectedStartTime}</Text>
              </View>
              <View style={[styles.viewChildTextTime, {marginLeft: 8}]}>
                <Text style={styles.regularCenterText}>{t('to')}</Text>
                <Text style={styles.boldCenterText}>{selectedEndTime}</Text>
              </View>
            </View>
          </View>
          <View style={styles.pickerContainer}>
            <TimePicker onChangeValue={onChangeStartTime} defaultValue={props.timeRange != '' ? props.timeRange?.substring(0,6) : '17:00'} />
            <TimePicker onChangeValue={onChangeEndTime} defaultValue={props.timeRange != '' ? props.timeRange?.substring(8,13) : '18:30'}/>
          </View>
          {buttons}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  header: {
    paddingTop: 20,
  },
  viewTextTime: {
    flexDirection: 'row',
    margin: 16
  },
  viewChildTextTime: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors['neutral-300'],
    paddingVertical: 6,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footer: {
    paddingTop: 20,
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 2,
    borderTopColor: 'grey',
  },
  boldCenterText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    color: theme.colors['neutral-900'],
    textAlign: 'center',
  },
  regularCenterText: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: theme.colors['neutral-600'],
    textAlign: 'center',
  },
  warningText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'red',
  },
});

export default TimeRangePicker;
