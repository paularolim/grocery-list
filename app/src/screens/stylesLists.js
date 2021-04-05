import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    height: '100%',
  },
  listContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  quantity: {
    fontWeight: 'bold',
    marginRight: '5%',
  },
  name: {
    width: 'auto',
  },
  buttonFloat: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 45,
    height: 45,
    backgroundColor: '#1E90FF',
    borderRadius: '50%',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
