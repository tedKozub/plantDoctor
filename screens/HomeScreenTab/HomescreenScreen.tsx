import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal, Button} from 'react-native';
import useNewsList from '../../hooks/useNewsList';
import NewsList from './NewsList';
import {COLOR_PRIMARY, COLOR_SECONDARY} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeModal from '../../components/WelcomeModal';


/**
 * The main screen of the Homescreen tab. Contains the Get Started
 * tutorial, and a NewsList component which uses useNewsList custom
 * hook to fetch the news.
 */
// @ts-ignore
function HomeScreen({navigation}) {
  const {newsList} = useNewsList();
  const [showModal, setShowModal] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  
  useEffect(() => {
    // Check if app has been launched before
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
      console.log(isFirstLaunch);
    });
  }, []);


  return (
    <View style={styles.container}>
      {isFirstLaunch && <WelcomeModal showModal={showModal} setShowModal={setShowModal}/>}
      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('HomescreenHelp')}>
        <Ionicons name="leaf" size={50} color="#8cd253" style={styles.iconLeft}/>
        <Text style={styles.buttonText}> New? Get started! </Text>
        <Ionicons name="chevron-forward" size={50} color="#8cd253" style={styles.iconRight} />
      </TouchableOpacity>
      <Text style={styles.titleText}>News: </Text> 
      {newsList 
      ? <NewsList news={newsList} />
      : <Text style={{textAlign: 'center', marginTop: 30, fontSize: 14, padding: 10, color: COLOR_SECONDARY}}>No news available</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  actionButton: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    marginTop: 20,
    backgroundColor: COLOR_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  buttonText: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
  },
  iconLeft: {
    marginRight: 30
  },
  iconRight: {
    marginLeft: 5
  },
  titleText: {
    color: COLOR_SECONDARY,
    fontWeight: '500',
    fontSize: 18,
    marginTop: 32
  }
});

export default HomeScreen;