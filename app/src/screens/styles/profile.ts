import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    height: height - 60,
    width: width,
  },
  header: {
    marginHorizontal: 40,
    paddingVertical: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: 'rgb(248, 110, 69)',
  },
  name: {
    marginTop: 10,
    fontSize: 40,
  },
  email: {
    fontSize: 20,
  },
  menu: {
    marginTop: 20,
  },
  about: {
    marginTop: 40,
    marginHorizontal: 40,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
  },
  version: {
    marginTop: 20,
    textAlign: 'center',
    color: '#868686',
  },
});
