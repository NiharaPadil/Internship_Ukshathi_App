import { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, Image,Alert, Animated } from "react-native";
import { useRouter } from "expo-router";
import Constants from 'expo-constants';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function LandingScreen() {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const [userProducts, setUserProducts] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null); 
  const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL ?? '';

//dynamically usage of user_id
  useEffect(() => {
    const fetchUserData = async () => {
      try {

        // retreiving user_id from storage 
        const storedUserId = await AsyncStorage.getItem('user_id');
        if (!storedUserId) {
          console.error("No user_id found in storage"); //debugg
          Alert.alert("Error", "User ID not found. Please login again.");
          return;
        }
        
        setUserId(storedUserId); // Store userId in state

        console.log("Retrieved user_id:", storedUserId); //ebugg

        // Fetch user-specific products using user_id
        const response = await fetch(`${API_BASE_URL}/user-products/${storedUserId}`);
        const data = await response.json();

        console.log("User products:", data);
        setUserProducts(data); // Store allowed product list in state

      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };

    fetchUserData();
  }, [])

  


  const userPermissions = userProducts;

  //the products items
  //here { name-product name ,  desc- escriptoon of prouct , image -image of products , route- connecting to next pages}
  const items = [
    { name: "Uno", desc: "A single valve system for precise, Wifi/4G-enabled watering of up to 100 plants, all in a weatherproof IP65 design", 
      //route: "/Product_screen/uno", 
      image: require("../assets/images/Uno.jpg") },
    { name: "Quadra", desc: "QUADRA revolutionizes large-scale irrigation with solar-powered nodes managing up to 4 valves, compatible with various methods, and featuring LoRa® technology for precise wireless control via Wi-Fi or 4G in a durable IP65 design.", 
      //route: "/Product_screen/quadra", 
      image: require("../assets/images/Quadra.jpg") },
    { name: "Hexa", desc: "A sleek hexagonal tank with smart scheduling, designed for balconies without taps, integrates with RO units and AC compressors, and offers Wi-Fi/4G connectivity in an IP65 weatherproof build.", 
      //route: "/Product_screen/hexa", 
      image: require("../assets/images/Hexa.jpg") },
    { name: "Octa", desc: "Manage up to 8 valves with precision scheduling, perfect for large outdoor spaces, and connect via Wi-Fi or 4G in a rugged, IP65 weatherproof design, ensuring your garden thrives effortlessly.",
       //route: "/Product_screen/octa", 
       image: require("../assets/images/Octa.jpg") },
  ];
  return (

    <ScrollView contentContainerStyle={styles.scrollContainer}>

      {/* enabling and disabling opeartion of products */}

      <View style={styles.container}>
        {items.map((item) => {

          {/*checking wheter includes any itemms*/}
          const isDisabled = !userPermissions.includes(item.name);

          return (
            <Pressable
              key={item.name}
              // onPress={() => !isDisabled && router.push(item.route as any)}
              onPressIn={() => !isDisabled && setHovered(item.name)}
              onPressOut={() => setHovered(null)}
              style={[styles.item, isDisabled && styles.disabledItem, hovered === item.name && styles.hoveredItem]}
            >


              {/*images of products */}


              <View style={styles.imageContainer}>
                <Image source={item.image} style={[styles.image, hovered === item.name && styles.imageZoom]} />
              </View>
              <Text style={[styles.title, isDisabled && styles.disabledText]}>{item.name}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
              <Pressable
                // onPress={() => !isDisabled && router.replace(item.route as any)}
                style={({ pressed }) => [styles.learnMore, pressed && styles.pressed, hovered === item.name && styles.buttonSlide]}
              >
                <Text style={styles.learnText}>Know More</Text>
              </Pressable>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

//Styling

const styles = StyleSheet.create({
scrollContainer: {
  flexGrow: 1,
  justifyContent: "center",
  alignItems: "center",
},
container: {
  alignItems: "center",
  paddingVertical: 20,
  backgroundColor: "#F5F5F5",
},
item: {
  padding: 20,
  backgroundColor: "#86C39A",
  borderRadius: 12,
  width: 300,
  alignItems: "center",
  marginBottom: 30,
  elevation: 5,
  
},
hoveredItem: {
  transform: [{ scale: 1.05 }], // Scale effect when hovered
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.2,
  shadowRadius: 10,
},

disabledItem: {
  backgroundColor: "#D0E1D6",
  opacity: 0.6,
},
imageContainer: {
  overflow: "hidden",
  borderRadius: 10,
},

  image: {
    width: 150,
    height: 120,
    marginBottom: 10,
    borderRadius: 10,
    
  },
  imageZoom: {
    transform: [{ scale: 1.1 }], // Slight zoom effect on hover
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3C5A3A",
    fontFamily: "Montserrat",
  },
  disabledText: {
    color: "#888",
  },

  desc: {
    marginTop: 5,
    fontSize: 14,
    color: "#5B7C6B",
    lineHeight: 22,
    textAlign: "center",
  },
  learnMore: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#70A98B",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  buttonSlide: {
    transform: [{ translateY: -5 }], // Button slides up slightly on hover
  },
  learnText: {
    color: "#FFF",
    fontSize: 14,
  },
  pressed: {
    backgroundColor: "#5E9473",
  },

});


