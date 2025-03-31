"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Button } from "react-native-paper"
import { Ionicons } from "@expo/vector-icons"

// Mock data for hairstyles
const HAIRSTYLES = [
  { id: "1", name: "Short Bob", image: "/placeholder.svg?height=150&width=120", category: "Short" },
  { id: "2", name: "Long Layers", image: "/placeholder.svg?height=150&width=120", category: "Long" },
  { id: "3", name: "Pixie Cut", image: "/placeholder.svg?height=150&width=120", category: "Short" },
  { id: "4", name: "Beach Waves", image: "/placeholder.svg?height=150&width=120", category: "Medium" },
  { id: "5", name: "Straight Bangs", image: "/placeholder.svg?height=150&width=120", category: "Medium" },
  { id: "6", name: "Curly Shag", image: "/placeholder.svg?height=150&width=120", category: "Curly" },
  { id: "7", name: "Blunt Cut", image: "/placeholder.svg?height=150&width=120", category: "Medium" },
  { id: "8", name: "Layered Bob", image: "/placeholder.svg?height=150&width=120", category: "Short" },
  { id: "9", name: "Long Curls", image: "/placeholder.svg?height=150&width=120", category: "Curly" },
]

const CATEGORIES = ["All", "Short", "Medium", "Long", "Curly"]

export function Styles() {
  const navigation = useNavigation()
  const route = useRoute()
  const { photo } = route.params || {}

  const [selectedStyle, setSelectedStyle] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [processing, setProcessing] = useState(false)

  const filteredStyles =
    selectedCategory === "All" ? HAIRSTYLES : HAIRSTYLES.filter((style) => style.category === selectedCategory)

  const handleStyleSelect = (style) => {
    setSelectedStyle(style)
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  const applyHairstyle = async () => {
    if (!selectedStyle) {
      return
    }

    setProcessing(true)

    // Simulate AI processing
    setTimeout(() => {
      setProcessing(false)
      // Navigate to result screen with the processed image
      // In a real app, this would be the result from the AI processing
      navigation.navigate("Result", {
        originalPhoto: photo,
        processedPhoto: photo, // In a real app, this would be the transformed image
        style: selectedStyle,
      })
    }, 3000)

    // In a real implementation, you would call your AI service here
    // const result = await processImageWithAI(photo.uri, selectedStyle.id);
    // navigation.navigate('Result', {
    //   originalPhoto: photo,
    //   processedPhoto: { uri: result.transformedImageUri },
    //   style: selectedStyle
    // });
  }

  const renderStyleItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.styleItem, selectedStyle && selectedStyle.id === item.id && styles.selectedStyleItem]}
      onPress={() => handleStyleSelect(item)}
    >
      <Image source={{ uri: item.image }} style={styles.styleImage} />
      <Text style={styles.styleName}>{item.name}</Text>
      {selectedStyle && selectedStyle.id === item.id && (
        <View style={styles.selectedOverlay}>
          <Ionicons name="checkmark-circle" size={24} color="#6366f1" />
        </View>
      )}
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose a Hairstyle</Text>
        <Text style={styles.subtitle}>Select a style to transform your photo</Text>
      </View>

      <View style={styles.photoPreview}>
        {photo ? (
          <Image source={{ uri: photo.uri }} style={styles.previewImage} />
        ) : (
          <View style={styles.noPhotoPlaceholder}>
            <Ionicons name="image-outline" size={40} color="#ccc" />
            <Text style={styles.noPhotoText}>No photo selected</Text>
            <Button mode="outlined" onPress={() => navigation.navigate("Camera")} style={styles.takePhotoButton}>
              Take a Photo
            </Button>
          </View>
        )}
      </View>

      <View style={styles.categories}>
        <FlatList
          data={CATEGORIES}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.categoryButton, selectedCategory === item && styles.selectedCategoryButton]}
              onPress={() => handleCategorySelect(item)}
            >
              <Text style={[styles.categoryText, selectedCategory === item && styles.selectedCategoryText]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
        />
      </View>

      <View style={styles.stylesContainer}>
        <FlatList
          data={filteredStyles}
          renderItem={renderStyleItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.stylesGrid}
        />
      </View>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={applyHairstyle}
          disabled={!selectedStyle || !photo || processing}
          style={[styles.applyButton, (!selectedStyle || !photo) && styles.disabledButton]}
        >
          {processing ? "Processing..." : "Apply Hairstyle"}
        </Button>
      </View>

      {processing && (
        <View style={styles.processingOverlay}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.processingText}>Transforming your hairstyle...</Text>
        </View>
      )}
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
  photoPreview: {
    height: 150,
    margin: 16,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  noPhotoPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noPhotoText: {
    marginTop: 8,
    marginBottom: 12,
    color: "#999",
  },
  takePhotoButton: {
    borderColor: "#6366f1",
  },
  categories: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "white",
  },
  selectedCategoryButton: {
    backgroundColor: "#6366f1",
  },
  categoryText: {
    color: "#666",
  },
  selectedCategoryText: {
    color: "white",
    fontWeight: "bold",
  },
  stylesContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  stylesGrid: {
    paddingBottom: 16,
  },
  styleItem: {
    flex: 1,
    margin: 4,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
    padding: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedStyleItem: {
    borderColor: "#6366f1",
  },
  styleImage: {
    width: "100%",
    height: 120,
    borderRadius: 4,
  },
  styleName: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 12,
  },
  selectedOverlay: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "white",
    borderRadius: 12,
  },
  footer: {
    padding: 16,
  },
  applyButton: {
    backgroundColor: "#6366f1",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  processingText: {
    color: "white",
    marginTop: 16,
    fontSize: 16,
  },
})

