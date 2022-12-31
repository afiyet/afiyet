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
    FlatList
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
            <TouchableOpacity onPress={() => {
                flatListRef.current.scrollToIndex({index: value.index});
                
                sectionListRef.current.scrollToLocation({
                    itemIndex: 0,
                    sectionIndex: value.index,
                    animated: true
                });
            }}>
                <Text style={styles.title}>{value.item}</Text>
            </TouchableOpacity>
        );
      }
      
      const MenuItem = ({ value, index }) => {
        return(
            <Pressable
                onPress={() => {
                    console.log(index)
                    
                    navigation.navigate("Food Details")}}
            >
                <View style={styles.item}>
                <View>
                <Image
                    style={{width: 64, height: 64}}
                    source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=="}}
                    resizeMode="contain"
                    />
                </View>
                <View>
                    <Text style={styles.title}>{value}</Text>
                    <Text>Yemek açıklaması</Text>
                    <Text>20.99TL</Text>
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
            style={{display: "flex", paddingBottom: 60}}
        >
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
                    <Text style={styles.header}>{title}</Text>
                )}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={viewabilityConfig}
            />
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
     
      marginHorizontal: 16
    },
    item: {
      backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8,
      display: "flex",
      flexDirection:"row"
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 24,
      padding: 15
    }
  });

export default OrderScreen;