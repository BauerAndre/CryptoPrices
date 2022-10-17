import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import axios from 'axios';

export const DetailScreen = ({route}: {route: any}) => {
  const id = route.params.id;
  const [cryptoProfile, setCryptoProfile] = useState();
  const [cryptoMarketData, setCryptoMarketData] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/cryptos/market-data/${id}`)
      .then(response => {
        setCryptoMarketData(response.data);
      });

    axios.get(`http://localhost:3000/cryptos/profile/${id}`).then(response => {
      setCryptoProfile(response.data);
    });
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{cryptoProfile}</Text>
    </View>
  );
};
