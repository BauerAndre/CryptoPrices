import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import axios from 'axios';
import { API_URL } from '../consts/app-costs';

export const DetailScreen = ({route}: {route: any}) => {
  const id = route.params.id;
  const [cryptoProfile, setCryptoProfile] = useState();
  const [cryptoMarketData, setCryptoMarketData] = useState();

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/cryptos/market-data/${id}`),
      axios.get(`${API_URL}/cryptos/profile/${id}`),
    ]).then(([resMarketData, resProfile]) => {
      setCryptoMarketData(resMarketData.data);
      setCryptoProfile(resProfile.data);
    });
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{JSON.stringify(cryptoProfile)}</Text>
    </View>
  );
};
