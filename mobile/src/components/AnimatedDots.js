import React, { useRef, useEffect } from 'react';
import { View, Animated, useColorScheme } from 'react-native';
import theme from '../util/theme';
//joe's animated dot component

const Dot = ({ active }) => {
    const scheme = useColorScheme()
    const color = theme(scheme)

    const scale = useRef(new Animated.Value(active ? 1.5 : 1)).current;
    const scaleX = useRef(new Animated.Value(active ? 1 : 1)).current; 
    const width = useRef(new Animated.Value(active ? 20 : 10)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: active ? 1.5 : 1,
          friction: 2,
          useNativeDriver: false,
        }),
        Animated.timing(scaleX, {
          toValue: active ? 1 : 1, 
          duration: 150,
          useNativeDriver: false,
        })
      ]).start();
    }, [active, scale, scaleX]);
  
    useEffect(() => {
        Animated.timing(width, {
            toValue: active ? 20 : 10, 
            duration: 150,
            useNativeDriver: false,
        }).start();
    }, [active, width]);

    
    return (
      <Animated.View
        style={{
          margin: 20,
          width: width,
          height: 10,
          borderRadius: 5,
          backgroundColor: active ? `${color.activeDot}` : '#BFBEBE',
          transform: [{ scale }, { scaleX }],
        }}
      />
    );
  };

const AnimatedDots = ({ activeIndex, count }) => {
  
  const dots = Array.from({ length: count }, (_, index) => (
    <Dot key={index} active={index === activeIndex} />
  ));

  return <View style={{ flexDirection: 'row' }}>{dots}</View>;
};

export default AnimatedDots;