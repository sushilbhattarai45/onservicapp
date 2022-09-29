import React from 'react';
import { StyleSheet, Image, Text, View, TextInput } from 'react-native';

export default function Search() {
  return (
      <View style={styles.Search}>
        <Image
          style={styles.IconlyLightOutlineSearch}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/etttlbocgw6-114%3A314?alt=media&token=3935a084-a9ce-4db5-b2df-b937ddc67f63',
          }}
        />
        <TextInput style={styles.Txt597} placeholder="Search for services" />
      </View>
  );
}

const styles = StyleSheet.create({
  Search: {
    top:24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: 50,
    width:'100%',
  },
  IconlyLightOutlineSearch: {
    width: 18,
    height: 18,
    marginRight: 12,
  },
  Txt597: {
    flex:1,
    height:'100%',
    fontSize: 16,
    fontFamily: 'Urbanist, sans-serif',
    fontWeight: '400',
    color: 'rgba(0,0,0,1)',
    backgroundColor:'blue'
  },
});
