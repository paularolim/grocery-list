import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    height: height - 60,
    width,
  },
  notification: {
    zIndex: 2,
    backgroundColor: 'rgb(250, 142, 112)',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    right: 0,
  },
  notificationText: { color: 'rgb(255, 255, 255)' },
  scroll: {
    height: 460,
    marginBottom: 100,
  },
  listTitle: {
    color: 'rgb(248, 110, 69)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#a2a2a2',
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: '#a2a2a2',
  },
  footer: {
    backgroundColor: 'rgb(248, 110, 69)',
    width: width - 40,
    padding: 15,
    margin: 20,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  link: {
    color: 'rgb(245, 245, 245)',
    fontSize: 20,
  },
  floatButton: {
    backgroundColor: 'rgb(245, 245, 245)',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 18,
  },
  button: {
    backgroundColor: 'rgb(248, 110, 69)',
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'rgb(255, 255, 255)',
    fontSize: 16,
  },
  overlay: { width: width - 100 },
  labelMenu: { marginLeft: 20 },
});
