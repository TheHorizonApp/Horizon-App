import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  useColorScheme
} from 'react-native';
import AnimatedDots from '../components/AnimatedDots'
import * as Haptics from 'expo-haptics'
import theme from '../util/theme';



const { width } = Dimensions.get('window');

const OnboardingScreen = ({navigation}) => {
  const scheme = useColorScheme();
  const color = theme(scheme)

  const onboardingData = [
    {
      title: 'Organize your Day',
      description: 'Plan your day with ease, stay on top of your responsibilities.',
      // image: scheme === 'dark' ? require('../assets/onboarding1dark.png') : require('../assets/onboarding1.png'),
    },
    {
      title: 'Set Your Goals',
      description: 'Visualize your ambitions, track your progress effortlessly.',
      // image: scheme === 'dark' ? require('../assets/onboarding2dark.png') : require('../assets/onboarding2.png'),
    },
    {
      title: 'Motivate',
      description: 'See friends\' goals and schedules, inspire and celebrate achievements together.',
      // image: scheme === 'dark' ? require('../assets/onboarding3dark.png') : require('../assets/onboarding3.png'),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const renderItem = ({ item, index }) => (
    <View style={[styles.slide, { 
        backgroundColor: color.background,
        width: width 
      }]}>
      {/* <Image source={item.image} style={[styles.image]}/> */}
      <Text style={[styles.title, {color: color.text}]}>  
        {item.title}
      </Text>
      <Text style={[styles.description, {color: color.text}]}> 
        {item.description}
      </Text>
      <AnimatedDots activeIndex={currentIndex} count={onboardingData.length} />
      <TouchableOpacity
        style={[styles.button, {backgroundColor: color.button}]}
        onPress={() => {
          if (currentIndex < onboardingData.length - 1) {
            flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
          }else{
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            navigation.navigate("RegisterScreen")
          }
        }}
      >
        <Text style={[styles.buttonText, {color: color.buttonText}]}>
          {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={[styles.container,{backgroundColor: color.background}]}>
      <FlatList
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
          setCurrentIndex(index);
          Haptics.selectionAsync(); 
        }}        
        ref={flatListRef}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    margin: 0,
    padding: 0, 
  
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  image: {
    width: 500,
    height: 300,
    bottom: 60,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    bottom: 50,
    marginTop: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    bottom: 40,
    width: '85%',
    fontWeight: '300',
    
  },
  button: {
    padding: 25,
    position: 'absolute',
    bottom: 80,
    borderRadius: 20,
    width: '60%',

    borderWidth: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  
  },
});