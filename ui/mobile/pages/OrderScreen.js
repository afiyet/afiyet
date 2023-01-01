import { useCallback, useEffect, useRef, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    SectionList,
    ScrollView,
    Pressable,
    FlatList,
    Dimensions
} from "react-native";
import { useNavigation } from '@react-navigation/native';

function OrderScreen(props) {
    const {
        setBottomNavLabel
    } = props;
    const [sections, setSections] = useState([]);
    let sect = 0;


    const navigation = useNavigation();

    useEffect(() => {
        setBottomNavLabel("Order");
    },[]);

    const flatListRef = useRef(null);
    const sectionListRef = useRef(null);

    const DATA = [
        {
          title: "Main dishes",
          data: ["Pizza", "Burger", "Risotto", "Risotto2", "Risotto3"]
        },
        {
          title: "Sides",
          data: ["French Fries", "Onion Rings", "Fried Shrimps"]
        },
        {
          title: "Drinks",
          data: ["Water", "Coke", "Beer"]
        },
        {
          title: "Su",
          data: ["Cheese Cake", "Ice Cream", "Ice Cream", "Ice Cream", "Ice Cream"]
        },
        {
            title: "Desserts1",
            data: ["Cheese Cake", "Ice Cream", "Ice Cream", "Ice Cream", "Ice Cream"]
          },
          {
            title: "Desserts2",
            data: ["Cheese Cake", "Ice Cream", "Ice Cream", "Ice Cream", "Ice Cream"]
          },
          {
            title: "Desserts3",
            data: ["Cheese Cake", "Ice Cream", "Ice Cream", "Ice Cream", "Ice Cream"]
          },
          {
            title: "Desserts4",
            data: ["Cheese Cake", "Ice Cream", "Ice Cream", "Ice Cream", "Ice Cream"]
          }
      ];
      
      const SectionItem = ({value}) => {
        return(
            <View style={{backgroundColor: "white"}}>
                <TouchableOpacity onPress={() => {
                flatListRef.current.scrollToIndex({index: value.index});
                sectionListRef.current.scrollToLocation({
                    itemIndex: 0,
                    sectionIndex: value.index,
                    animated: true
                });
            }}>
                <Text style={{
                    color: "white",
                    fontSize: 18,
                    margin: 10,
                    backgroundColor: "orange",
                    minWidth: 30,
                    borderRadius: 20,
                    padding: 10,
                    paddingBottom: 10,
                    paddingTop: 5,
                    lineHeight: 40,
                    textAlign: "center"
                }}>{value.item}</Text>
            </TouchableOpacity>
            </View>
        );
      }
      
      const MenuItem = ({ value, index }) => {
        return(
            <Pressable
                onPress={() => {
                    navigation.navigate("Food Details")
                }}
            >
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    maxWidth: Dimensions.get("screen").width,
                    padding: 18,
                    backgroundColor: "white"
                }}>
                    <View style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        flexGrow: 2,
                        maxWidth: "70%",
                        paddingRight: 15
                    }}>
                        <Text style={{fontSize:20, paddingBottom: 5}}>Mega Çiğköfte Dürüm</Text>
                        <Text style={{fontSize:12, paddingBottom: 5, color: "gray"}}>Çiğ köfte (130g), etrcihe göre iceberg marul, domates, turşu, havuç, karalahana, nane, maydanoz, roka, limon, nar ekşisi ve acı sos ile</Text>
                        <Text style={{fontSize:14}}>20.00 TL</Text>
                    </View>
                    <View style={{
                        display: "flex",
                        flexGrow: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Image
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 90,
                            }}
                            source={{uri:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"}}
                            resizeMode="center"
                        />
                    </View>
                </View>
            </Pressable>
          );
      }
      const [sectionLength, setSectionLength] = useState(0);
      useEffect(() => {
        let charCount = 0;
        let tempSections = []
        DATA.map((item) => {
            charCount += item.title.length;
            tempSections.push(item.title);
        });
        setSections(tempSections);
        sect = tempSections;
        setSectionLength(charCount*15/DATA.length);
      }, []);

      const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
        
        let element;

        viewableItems.forEach(el => {
            if(el.index === null){
                element = el;
                return;
            }
        });

        if(element?.index === null) {
            //flatListRef.current.scrollToIndex({index: value.index});
            if(changed.length !== 0) {
                console.log(sect.indexOf(element.item.title))
                console.log(sect)
                flatListRef.current.scrollToIndex({index: sect.indexOf(element.item.title)});
            }
            
        }

        /*viewableItems.forEach(element => {
            if(element.index === null) {
                //flatListRef.current.scrollToIndex({index: value.index});
                if(changed.length !== 0) {
                    console.log(sect.indexOf(element.item.title))
                    console.log(sect)
                    flatListRef.current.scrollToIndex({index: sect.indexOf(element.item.title)});
                }
                
            }
        });*/
        //console.log(changed)
      })

      

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 75,
      };

      

    return (
        <View
            style={{display: "flex", flexGrow: 1, paddingBottom: 100}}
        >
            <View>
                <Image />
                <View>
                    <Text>Restoran Adı</Text>
                </View>
            </View>
            <FlatList
                initialNumToRender={60}
                ref={flatListRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={sections}
                //initialScrollIndex={4}
                getItemLayout={(data, index) => {
                    return(
                        {length: sectionLength, offset: sectionLength*index, index}
                    );
                }}
                renderItem={(item) => {
                    return  <SectionItem value={item}/>
                }}
            />
            <SectionList
                ref={sectionListRef}
                sections={DATA}
                renderItem={({ item, index }) => <MenuItem value={item} index={index} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={{
                        fontSize: 32,
                        backgroundColor: "#fff",
                        marginTop: 20,
                        paddingLeft: 18,
                        paddingTop: 18,
                        paddingBottom: 1
                    }}>{title}</Text>
                )}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={viewabilityConfig}
                ItemSeparatorComponent={() => (<View
                    style={{ height: 1, width: '100%', backgroundColor: '#C8C8C8' }}
                  />)}
            />
           
        </View>
    );
}

const styles = StyleSheet.create({
    
  });

export default OrderScreen;