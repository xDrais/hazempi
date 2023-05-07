import { Document, Page, View, Image, Text, StyleSheet } from '@react-pdf/renderer';
import certificate from './certificate.png'


const Certification= ({ name, lastname, date ,paragraph , coach}) => {

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.container}>
          <Image src={certificate}  style={styles.background} objectFit="contain" />
          <Text style={styles.name}  >{name}</Text>
          <Text style={styles.lastname}  >{lastname}</Text>
          <Text style={styles.coach}  >{coach}</Text>
          <Text style={styles.paragraph}  > Congratulations ! You have accomplished this Course {paragraph}</Text>
          <Text style={styles.date}>Date: {date}</Text>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',

  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',


  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
    color: '#000000',
    textShadow: '2px 2px 2px #000000',
    position: 'absolute',
    top: '63%',
    left: '30%',
    transform: 'translate(-50%, -50%)'
  },

  name: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000000',
    textShadow: '2px 2px 2px #000000',
    position: 'absolute',
    top: '51%',
    left: '48%',
    transform: 'translate(-50%, -50%)'
  }, 
   lastname: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000000',
    textShadow: '2px 2px 2px #000000',
    position: 'absolute',
    top: '51%',
    left: '58%',
    transform: 'translate(-50%, -50%)'
  },
  coach: {
    fontSize: 12,
    marginBottom: 20,
    color: '#000000',
    textShadow: '2px 2px 2px #000000',
    position: 'absolute',
    top: '91%',
    left: '27%',
    transform: 'translate(-50%, -50%)'
  },
  date: {
    fontSize: 16,
    color: '#000000',
    textShadow: '2px 2px 2px #000000',
    position: 'absolute',
    top: '75%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
});

export default Certification;
