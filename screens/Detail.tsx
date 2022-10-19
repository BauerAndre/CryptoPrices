import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView} from 'react-native';
import axios from 'axios';
import {API_URL} from '../consts/app-costs';

export const DetailScreen = ({route}: {route: any}) => {
  const id = route.params.id;
  const [cryptoProfile, setCryptoProfile] = useState();
  const [cryptoMarketData, setCryptoMarketData] = useState();
  const [cryptoDataLoaded, setCryptoDataLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/cryptos/market-data/${id}`),
      axios.get(`${API_URL}/cryptos/profile/${id}`),
    ]).then(([resMarketData, resProfile]) => {
      setCryptoMarketData(resMarketData.data);
      setCryptoProfile(resProfile.data);
      setCryptoDataLoaded(true);
    });
  }, []);

  return (
    <>
      {cryptoDataLoaded && (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>{cryptoProfile.name}</Text>
              <Text style={styles.symbol}>{cryptoProfile.symbol}</Text>
              <Text style={styles.price}>
                {`$ ${convert(cryptoMarketData.market_data.price_usd)}`}
              </Text>
            </View>
            <View style={styles.headerTagLine}>
              <Text style={styles.line}>
                {cryptoProfile.profile.general.overview.tagline}
              </Text>
            </View>
          </View>
          <ScrollView style={styles.cryptoInfo}>
            <View style={styles.cryptoInfoRow}>
              <Text style={styles.cryptoInfoTitle}>Overview</Text>
              <Text style={styles.line}>
                {cryptoProfile.profile.general.overview.project_details}
              </Text>
            </View>
            <View style={styles.cryptoInfoRow}>
              <Text style={styles.cryptoInfoTitle}>Background</Text>
              <Text style={styles.line}>
                {cryptoProfile.profile.general.background.background_details}
              </Text>
            </View>
          </ScrollView>
        </View>
      )}

      {!cryptoDataLoaded && <ActivityIndicator size="large" color="#00ff00" />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272d42',
    padding: 10,
    flex: 1,
  },
  header: {
    backgroundColor: '#000',
    height: 100,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTagLine: {
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    color: '#fff',
  },
  symbol: {
    fontSize: 15,
    padding: 5,
    backgroundColor: '#272d42',
    color: '#fff',
  },
  price: {
    fontSize: 28,
    color: '#ffab00',
    width: 150,
    textAlign: 'right',
  },
  line: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },

  cryptoInfo: {
    backgroundColor: '#000',
    padding: 10,
    flex: 1,
    borderRadius: 12,
    marginBottom: 15,
  },
  cryptoInfoTitle: {
    color: '#ffab00',
    fontSize: 22,
  },
  cryptoInfoRow: {
    flex: 1,
  },
});

const convert = (price: number) => {
  return Math.round(price * 100) / 100;
};
