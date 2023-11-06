import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

const About = ({navigation}) => {
  return (
    <ScrollView style={{marginTop: 20, marginBottom: 45}}>
      <TouchableOpacity onPress={() => navigation.navigate('MfHome')}>
        <Ionicons
          style={{marginLeft: 5}}
          name="arrow-back"
          size={35}
          color={'#14489c'}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#575957',
          textAlign: 'center',
          height: 25,
          width: '100%',
          marginTop: -15,
          marginBottom: 5,
        }}>
        ABOUT US
      </Text>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#006DFF',
          height: 40,
          width: '90%',
          alignSelf: 'center',
          borderRadius: 20,
          justifyContent: 'center',
          marginTop: 15,
        }}>
        <Text
          style={{
            fontSize: 22,
            marginTop: 2,
            color: '#fff',
            fontWeight: 'bold',
            textDecorationLine: 'underline',
          }}>
          Rawcult
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginLeft: 3,
            color: '#fff',
            fontWeight: '600',
            marginTop: 5,
          }}>
          : Transforming Fashion Retail
        </Text>
      </View>
      <Text
        style={{
          fontSize: 15,
          color: '#000',
          fontWeight: '500',
          margin: 20,
          textAlign: 'auto',
        }}>
        Welcome to Rawcult, your trusted partner in revolutionizing the fashion
        retail industry. We are your B2B fashiontech enabler platform, dedicated
        to helping fashion retailers thrive in a competitive market. At Rawcult,
        we are on a mission to redefine the way you source and sell fashion
        products.
      </Text>
      <View
        style={{
          backgroundColor: '#006DFF',
          height: 40,
          width: '90%',
          alignSelf: 'center',
          borderRadius: 20,
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            marginTop: 5,
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Our Vision
        </Text>
      </View>
      <Text
        style={{
          fontSize: 15,
          color: '#000',
          fontWeight: '500',
          margin: 20,
          textAlign: 'auto',
        }}>
        At Rawcult, our vision is simple yet powerful: We want to empower
        fashion retailers to succeed by providing them with the tools, insights,
        and support they need to thrive in the ever-evolving fashion industry.
        We believe that by streamlining the sourcing process, eliminating
        unnecessary intermediaries, and enhancing product diversity, we can help
        retailers boost their margins, reduce risk, and enhance customer
        satisfaction.
      </Text>
      <View
        style={{
          backgroundColor: '#006DFF',
          height: 40,
          width: '90%',
          alignSelf: 'center',
          borderRadius: 20,
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            marginLeft: 22,
            marginTop: 5,
            color: '#fff',
            fontWeight: 'bold',
          }}>
          Smart Sourcing for Smarter Retailing
        </Text>
      </View>
      <Text
        style={{
          fontSize: 15,
          color: '#000',
          fontWeight: '500',
          margin: 20,
          textAlign: 'auto',
        }}>
        Our core offering is Smart Sourcing, a game-changing approach that
        redefines the way you acquire fashion products. With Rawcult, you have
        access to a direct line to manufacturers, eliminating the middlemen and
        their markups. This direct connection means more competitive prices,
        higher quality control, and faster delivery times for your inventory.
      </Text>
      <View
        style={{
          backgroundColor: '#006DFF',
          height: 40,
          width: '90%',
          alignSelf: 'center',
          borderRadius: 20,
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Text
          style={{
            fontSize: 18,
            marginLeft: 22,
            marginTop: 5,
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          The Rawcult Advantage
        </Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          marginTop: 20,
          marginLeft: 20,
          color: '#000',
          fontWeight: 'bold',
        }}>
        Increased Profit Margins :
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginLeft: 20,
          color: '#000',
          fontWeight: '500',
        }}>
        By bypassing intermediaries, Rawcult helps you maximize your profits,
        giving you a competitive edge in the market.
      </Text>
      <Text
        style={{
          fontSize: 18,
          marginTop: 20,
          marginLeft: 20,
          color: '#000',
          fontWeight: 'bold',
        }}>
        Flexible MOQ Options :
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginLeft: 20,
          color: '#000',
          fontWeight: '500',
        }}>
        We understand that each retailer has unique needs. With Rawcult, you
        have the flexibility to order in quantities that make sense for your
        business, reducing the risk of excess inventory.
      </Text>
      <Text
        style={{
          fontSize: 18,
          marginTop: 20,
          marginLeft: 20,
          color: '#000',
          fontWeight: 'bold',
        }}>
        Convenience :
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginLeft: 20,
          color: '#000',
          fontWeight: '500',
        }}>
        Our platform is designed with your convenience in mind. Easily browse
        and order a wide range of fashion products, all from the comfort of your
        device.
      </Text>
      <Text
        style={{
          fontSize: 18,
          marginTop: 20,
          marginLeft: 20,
          color: '#000',
          fontWeight: 'bold',
        }}>
        Variety :
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginLeft: 20,
          color: '#000',
          fontWeight: '500',
        }}>
        Rawcult offers a vast selection of products to cater to diverse customer
        preferences. Find the perfect items to stock in your store and keep your
        customers coming back for more.
      </Text>
      <Text
        style={{
          fontSize: 18,
          marginTop: 20,
          marginLeft: 20,
          color: '#000',
          fontWeight: 'bold',
        }}>
        Location-Based Curation :
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginLeft: 20,
          color: '#000',
          fontWeight: '500',
        }}>
        We believe that fashion should resonate with your local audience.
        Rawcult helps you curate your product selection based on your shop's
        location, ensuring that you offer the styles that your customers desire.
      </Text>
      <Text
        style={{
          fontSize: 18,
          marginTop: 20,
          marginLeft: 20,
          color: '#000',
          fontWeight: 'bold',
        }}>
        Doorstep Delivery :
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginLeft: 20,
          color: '#000',
          fontWeight: '500',
          marginBottom: 20,
        }}>
        Say goodbye to logistical headaches. Rawcult provides doorstep delivery,
        saving you time and effort in managing logistics.
      </Text>
      {/* <View
        style={{
          height: 0.7,
          width: '100%',
          backgroundColor: '#d2cdd4',
          alignSelf: 'center',
        }}
      /> */}
      <View
        style={{
          backgroundColor: '#006DFF',
          height: 40,
          width: '90%',
          alignSelf: 'center',
          borderRadius: 20,
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Text
          style={{
            fontSize: 22,
            marginLeft: 20,
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Join the Rawcult Community
        </Text>
      </View>
      <Text
        style={{
          fontSize: 15,
          color: '#000',
          fontWeight: '500',
          margin: 20,
          textAlign: 'auto',
        }}>
        We invite you to join the Rawcult community and embark on a journey
        toward a more profitable and efficient fashion retail experience.
        Together, we can reshape the industry and create a brighter future for
        fashion retailers like you. Explore our platform, discover the Rawcult
        difference, and take your fashion retail business to new heights. We're
        here to support you every step of the way.
      </Text>
      {/* <View
        style={{
          height: 0.7,
          width: '100%',
          backgroundColor: '#d2cdd4',
          alignSelf: 'center',
        }}
      /> */}
      {/* <View
        style={{
          height: 0.7,
          width: '100%',
          backgroundColor: '#d2cdd4',
          alignSelf: 'center',
        }}
      /> */}
      <View
        style={{
          backgroundColor: '#006DFF',
          height: 40,
          width: '90%',
          alignSelf: 'center',
          borderRadius: 20,
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Text
          style={{
            fontSize: 22,
            marginLeft: 20,
            marginTop: 2,
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Contact Us
        </Text>
      </View>
      <Text
        style={{
          fontSize: 15,
          color: '#000',
          fontWeight: '500',
          margin: 20,
          textAlign: 'auto',
        }}>
        Have questions or ready to get started? Our dedicated support team is
        here to assist you. Contact us today and experience the Rawcult
        advantage for yourself. Welcome to Rawcult - Where Smart Sourcing Meets
        Fashion Innovation!
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginBottom: 20,
          marginLeft: 10,
        }}>
        <Ionicons name="call" color={'#000'} size={30} />
        <Text
          style={{color: 'grey', fontSize: 16, marginLeft: -12, marginTop: 3}}>
          +91-8700424741
        </Text>
        <Ionicons name="mail" color={'#000'} size={30} />
        <Text
          style={{color: 'grey', fontSize: 16, marginLeft: -8, marginTop: 3}}>
          rawcult.team@gmail.com
        </Text>
      </View>
    </ScrollView>
  );
};

export default About;
