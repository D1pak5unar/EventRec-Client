import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
    
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);
    
  return (
    <View style={{alignItems:'center'}}>
      <Image source={require('./../../../assets/image/login.png')}
        style={styles.loginImage}
      />
      <View style={styles.subContainer}>
        <Text style={{fontSize:30,color:Colors.WHITE,textAlign:'center'}}>
            Make America Social AGAIN!!
        </Text>
        <Text style={{fontSize:20,color:Colors.WHITE,textAlign:'center'}}>Best App to find events near you!!</Text>

        <TouchableOpacity style={styles.button} 
        onPress={onPress}>
            <Text style={{textAlign:'center',fontSize:17,color:Colors.PRIMARY}}>Let's Get Started</Text>
        </TouchableOpacity>
         
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    loginImage:{
        width:390,
        height:450,
        marginTop:30,
        borderWidth:9,
        borderColor:Colors.BLACK,
        borderRadius:20
    },
    subContainer:{
        width:'100%',
        backgroundColor:Colors.PRIMARY,
        height:'70%',
        marginTop:-30,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:20
    },
    button:{
        padding:20,
        backgroundColor:Colors.WHITE,
        borderRadius:99,
        marginTop:40
    }
})