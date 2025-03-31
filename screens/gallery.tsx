"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import { Ionicons } from "@expo/vector-icons"
import { Button } from "react-native-paper"

export function Gallery() {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const navigation = useNavigation()

  useEffect(() => {
    ;(async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== "granted") {
        Alert.alert("Permission Required", "Sorry, we need camera roll permissions to make this work!")
      }
    })()
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      const newImage = { uri: result.assets[0].uri, id: Date.now().toString() }
      setImages([newImage, ...images])
      setSelectedImage(newImage)
    }
  }

  const handleImageSelect = (image) => {
    setSelectedImage(image)
  }

  const continueWithImage = () => {
    if (selectedImage) {
      navigation.navigate("Styles", { photo: { uri: selectedImage.uri } })
    } else {
      Alert.alert("No Image Selected", "Please select an image to continue")
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.imageItem, selectedImage && selectedImage.id === item.id && styles.selectedImageItem]}
      onPress={() => handleImageSelect(item)}
    >
      <Image source={{ uri: item.uri }} style={styles.thumbnail} />
      {selectedImage && selectedImage.id === item.id && (
        <View style={styles.selectedOverlay}>
          <Ionicons name="checkmark-circle" size={24} color="#6366f1" />
        </View>
      )}
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Photo Gallery</Text>
        <Text style={styles.subtitle}>Select a photo to transform</Text>
      </View>

      <View style={styles.selectedImageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage.uri }} style={styles.selectedImagePreview} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Ionicons name="images-outline" size={60} color="#ccc" />
            <Text style={styles.placeholderText}>Select an image from your gallery</Text>
          </View>
        )}
      </View>

      <View style={styles.galleryContainer}>
        <View style={styles.galleryHeader}>
          <Text style={styles.galleryTitle}>Your Photos</Text>
          <TouchableOpacity style={styles.addButton} onPress={pickImage}>
            <Ionicons name="add" size={24} color="#6366f1" />
          </TouchableOpacity>
        </View>

        {images.length > 0 ? (
          <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={styles.imageGrid}
          />
        ) : (
          <View style={styles.emptyGallery}>
            <Text style={styles.emptyGalleryText}>No photos yet</Text>
            <Button mode="contained" onPress={pickImage} style={styles.addPhotoButton}>
              Add Photo
            </Button>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={continueWithImage}
          disabled={!selectedImage}
          style={[styles.continueButton, !selectedImage && styles.disabledButton]}
        >
          Continue
        </Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "#6366f1",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 4,
  },
  selectedImageContainer: {
    height: 250,
    margin: 16,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  selectedImagePreview: {
    width: "100%",
    height: "100%",
  },
  placeholderContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  placeholderText: {
    marginTop: 12,
    color: "#999",
    textAlign: "center",
  },
  galleryContainer: {
    flex: 1,
    margin: 16,
    marginTop: 0,
  },
  galleryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  galleryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageGrid: {
    paddingBottom: 16,
  },
  imageItem: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedImageItem: {
    borderColor: "#6366f1",
  },
  thumbnail: {
    width: "100%",
    height: 100,
  },
  selectedOverlay: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "white",
    borderRadius: 12,
  },
  emptyGallery: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyGalleryText: {
    color: "#999",
    marginBottom: 16,
  },
  addPhotoButton: {
    backgroundColor: "#6366f1",
  },
  footer: {
    padding: 16,
  },
  continueButton: {
    backgroundColor: "#6366f1",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
})

