import { View, Text, StyleSheet, ImageBackground, Image, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import imageC from '../../../../assets/images/imageC'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaFrame } from 'react-native-safe-area-context';


//dB

import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from '@/src/app/firebaseConfig';



const MarketAnalysis = () => {

    const router = useRouter()
    
    const [selectedOption, setSelectedOption] = useState('Sell');
    const options = ['Sell', 'Pre-List'];
  const [pid,setpid]=useState('')
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [id, setId] = useState('')
    const [Quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [dod, setDod] = useState('');
    const [state, setState] = useState('');
   
    const [pinCode, setPinCode] = useState('');
    const [address, setAddress] = useState('');
    const [Rating,setRating]=useState('');
    const floatprice = parseFloat(price);
    const floatquantity = parseFloat(Quantity);
    const total = floatprice * floatquantity;


    //add crops ...
    const addProduct = async () => {
  
        if(Quantity===''||price===''||state==''){
            alert('All Fields are required.');
            return
        }
        
        try {



            const user = auth.currentUser;
            if (!user) {
                console.log('no authenticated user')
            }

            const cropData = {
                Pid: pid,
                Name: title,
                Description: description,
                Quantity: Quantity,
                Rating:Rating,
                Price: price,
               
                State: state,
                
                Pincode: pinCode,
                
                
                listedBy: user.uid,
                listedAt: new Date(),
            }
            // Adding crop data to the user's collection
           

            //adding to FarmerProducts db;
            await addDoc(collection(db, "AdminMarketAnalysis"), cropData);
            alert('Crop Listed Successfully !');


            setAddress('');
            setDescription('');
            setDod('');
            
            setPinCode('');
            setState('');
            setQuantity('');
            setPrice('');
            // router.replace('./SelectVeg');

        } catch (error) {
            alert("Error in Listing Crop" + error.message)
        }



    }

    //select option
    const selectrender=(option)=>{
       if(option==='Pre-List'){
        alert('Pre List those Products which You can deliver within 3 months ')
        setSelectedOption(option)
       }else{
        setSelectedOption(option)
       }
    }





    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>

                    <Image source={require('../../../assets/images/vegtables.png')} style={styles.image}></Image>
                   
                       
                </View>
             <Text style={{ fontSize: 17, fontWeight: '500' }}>Market Analysis Veg DataBase</Text>
               
            </View>



            <View style={styles.bottomContainer}>
            <View style={{ margin: 5 }}>
                    <Text style={{ fontSize: 17, fontWeight: '500' }}>Product Name</Text>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder='Product Name' style={{ backgroundColor: '#BDE7CF', borderRadius: 20, height: 45, width: 230, marginTop: 1, fontSize: 17, paddingLeft: 10 }} />
                </View>
                <TextInput
                    placeholder='Describe About Your Product'
                    multiline={true}
                    numberOfLines={4}
                    value={description}
                    onChangeText={setDescription}
                    style={styles.txtInput} />


<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>   
                <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 17, fontWeight: '500' }}>Quantity in KG</Text>
                    <TextInput
                        value={Quantity}
                        onChangeText={setQuantity}
                        placeholder='Quantity in Kg' style={{ backgroundColor: '#BDE7CF', borderRadius: 20, height: 45, width: 230, marginTop: 1, fontSize: 17, paddingLeft: 10 }} />
                </View>
                <View style={{ marginTop: 5, marginLeft: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: '500', marginLeft: 1 }}>Rating /10</Text>
                        <TextInput
                            value={Rating}
                            onChangeText={setRating}

                            placeholder='Grade out of 10' style={{ backgroundColor: '#BDE7CF', borderRadius: 20, height: 45, width: 120, marginTop: 1, fontSize: 15, paddingLeft: 10 }} />
                    </View>

                </View>


                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontSize: 17, fontWeight: '500' }}>Price Per KG</Text>
                        <TextInput
                            value={price}
                            onChangeText={setPrice}
                            placeholder='Demanding Price Per Kg' style={{ backgroundColor: '#BDE7CF', borderRadius: 20, height: 45, width: 170, marginTop: 1, fontSize: 15, paddingLeft: 10 }} />
                    </View>

                    <View style={{ marginTop: 7, marginLeft: 20 }}>
                        <Text style={{ fontSize: 17, fontWeight: '500' }}>Product Id</Text>
                        <TextInput
                            value={pinCode}
                            onChangeText={setpid}
                            placeholder='Product Id' style={{ backgroundColor: '#BDE7CF', borderRadius: 20, height: 45, width: 130, marginTop: 1, fontSize: 15, paddingLeft: 10 }} />
                    </View>

                  
                </View>


                <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 17, fontWeight: '500' }}>State</Text>
                    <TextInput
                    autoCapitalize="characters"
                        value={state}
                        onChangeText={setState}
                        placeholder='State' style={{ backgroundColor: '#BDE7CF', borderRadius: 20, height: 45, width: 370, marginTop: 1, fontSize: 15, paddingLeft: 10 }} />
                </View>



                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              


                    <View style={{ marginTop: 7, marginLeft: 5 }}>
                        <Text style={{ fontSize: 17, fontWeight: '500' }}>Pin Code</Text>
                        <TextInput
                            value={pinCode}
                            onChangeText={setPinCode}
                            placeholder='Pin Code' style={{ backgroundColor: '#BDE7CF', borderRadius: 20, height: 45, width: 130, marginTop: 1, fontSize: 15, paddingLeft: 10 }} />
                    </View>
                </View>
                
                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 10 }}>Total Rupees :- {total}</Text>

                <TouchableOpacity style={styles.addbtn} onPress={addProduct}>
                    <Text style={{ fontSize: 25, color: 'white', fontWeight: '500' }}> ADD </Text>
                </TouchableOpacity>







                <TouchableOpacity style={styles.stackIcon} onPress={() => router.replace('./SelectFruits')}>
                    <AntDesign name="leftsquare" color="green" size={44} />
                </TouchableOpacity >
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        height: 200,
        backgroundColor: '#89fc00'
    },
    bottomContainer: {
        marginTop: 60,

        height: 700,
        display: 'flex',
        alignItems: 'flex-start',
        padding: 10,
    },
    image: {
        height: 300,
        width: 300,
        borderRadius: 150,
        marginTop: -70,
        marginLeft: -70
    },
    title: {
        marginLeft: 230,
        marginTop: -40,
        
    },
    titleTxt: {
        fontSize: 40,
        fontWeight: '600'
    },
    txtInput: {
        backgroundColor: '#BDE7CF',
        height: 80,
        width: 350,
        borderRadius: 20,
        fontSize: 18,
    },
    addbtn: {
        height: 50,
        backgroundColor: '#28AC60',
        width: 150,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        marginTop: 10,
        marginLeft: 240,
    },
    stackIcon: {
        height: 50,
        
        marginBottom: 5,
        marginTop: -43
    },
    headerText: {
        fontSize: 16,
        marginBottom: 2,
        marginLeft:4,
        marginTop:1,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 160,
        marginLeft:4
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    outerCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#6200ee',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    innerCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#6200ee',
    },
    radioLabel: {
        fontSize: 16,
        color: '#333',
    },
    selectedText: {
        marginTop: 2,
        fontSize: 16,
        color: '#333',
        marginLeft:-30
    },

})
export default MarketAnalysis;