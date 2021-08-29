import React, { useState } from 'react';
import { View, Text, StyleSheet,Platform ,Vibration} from 'react-native';
import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { CountDown } from '../../components/CountDown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from "./timing";
import { ProgressBar } from 'react-native-paper';
import {useKeepAwake} from 'expo-keep-awake';

const DEFAULT_TIME = 0.1;
export const Timer = ({focusSubject,onTimerEnd,clearSubject}) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const onProgress = (progress) => {
    setProgress(progress);
  };

  const onChangeTime =(min) =>{
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  }

  const vibrate=()=>{
    if(Platform.OS == 'ios'){
        const interval = setInterval(()=> Vibration.vibrate(),1000);
        setTimeout(()=>clearInterval(interval),1000);
    }
    else{
      Vibration.vibrate('10s');
    }
  }
  
  const onEnd = () => {
     setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
    }

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <CountDown 
        onEnd = {onEnd}
        minutes={minutes} isPaused={!isStarted} onProgress={onProgress} />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on: </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          color="#5E84E2"
          progress={progress}
          style={{ height: 10 }}
        />
      </View>
         <View style={styles.buttonWrapper}>
        <Timing changeTime={onChangeTime} />
      </View>

      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>

      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: "center"
  },
  countDown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection:'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
    clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
