"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Share, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRoute, useNavigation } from "@react-navigation/native"
import { Button } from "react-native-paper"
import { Ionicons } from "@expo/vector-icons"
import * as MediaLibrary from "expo-media-library"

export function ResultScreen() {
  const route = useRoute()
  const navigation = useNavigation()
  const { originalPhoto, processedPhoto, style } = route.params || {}
  const [showComparison, setShowComparison] = useState(false)
  const [saved, setSaved] = useState(false)

  const saveToGallery = async () => {
    try {
      // Request permission
      const { status } = await MediaLibrary.requestPermissionsAsync()

      if (status !== "granted") {
        Alert.alert("Permission Denied", "Sorry, we need media library permissions to save the image.")
        return
      }

      // In a real app, you would save the processed image
      // For this demo, we'll save the original since we don't have a real processed image
      const asset = await MediaLibrary.createAssetAsync(processedPhoto.uri)

      // Create an album and add the asset to it
      const album = await MediaLibrary.getAlbumAsync("HairStyle AI")
      if (album === null) {
        await MediaLibrary.createAlbumAsync("HairStyle AI", asset, false)
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false)
      }

      setSaved(true)
      Alert.alert("Success", "Image saved to your gallery!")
    } catch (error) {
      Alert.alert("Error", "Failed to save the image.")
      console.error(error)
    }
  }

  const shareImage = async () => {
    try {
      await Share.share({
        url: processedPhoto.uri,
        message: "Check out my new hairstyle created with HairStyle AI!",
      })
    } catch (error) {
      Alert.alert("Error", "Failed to share the image.")
      console.error(error)
    }
  }

  const tryAnotherStyle = () => {
    navigation.navigate("Styles", { photo: originalPhoto })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resultContainer}>
        <View style={styles.imageContainer}>
          {showComparison ? (
            <View style={styles.comparisonContainer}>
              <View style={styles.comparisonHalf}>
                <Text style={styles.comparisonLabel}>Before</Text>
                <Image source={{ uri: originalPhoto.uri }} style={styles.comparisonImage} />
              </View>
              <View style={styles.comparisonDivider} />
              <View style={styles.comparisonHalf}>
                <Text style={styles.comparisonLabel}>After</Text>
                <Image source={{ uri: processedPhoto.uri }} style={styles.comparisonImage} />
              </View>
            </View>
          ) : (
            <Image source={{ uri: processedPhoto.uri }} style={styles.resultImage} />
          )}
        </View>

        <View style={styles.styleInfo}>
          <Text style={styles.styleTitle}>{style?.name || "Custom Style"}</Text>
          <TouchableOpacity style={styles.comparisonButton} onPress={() => setShowComparison(!showComparison)}>
            <Ionicons name={showComparison ? "eye" : "eye-outline"} size={20} color="#6366f1" />
            <Text style={styles.comparisonButtonText}>{showComparison ? "Hide Comparison" : "Show Comparison"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionButtons}>
          <Button
            mode="contained"
            icon="content-save"
            onPress={saveToGallery}
            style={[styles.actionButton, styles.saveButton]}
            disabled={saved}
          >
            {saved ? "Saved" : "Save to Gallery"}
          </Button>

          <Button
            mode="contained"
            icon="share-variant"
            onPress={shareImage}
            style={[styles.actionButton, styles.shareButton]}
          >
            Share
          </Button>
        </View>

        <View style={styles.moreOptions}>
          <Button mode="outlined" onPress={tryAnotherStyle} style={styles.tryAnotherButton}>
            Try Another Style
          </Button>

          <Button mode="outlined" onPress={() => navigation.navigate("Camera")} style={styles.newPhotoButton}>
            Take New Photo
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  resultContainer: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    height: 400,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    marginBottom: 16,
  },
  resultImage: {
    width: "100%",
    height: "100%",
  },
  comparisonContainer: {
    flexDirection: "row",
    height: "100%",
  },
  comparisonHalf: {
    flex: 1,
    position: "relative",
  },
  comparisonLabel: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
    fontSize: 12,
  },
  comparisonImage: {
    width: "100%",
    height: "100%",
  },
  comparisonDivider: {
    width: 2,
    height: "100%",
    backgroundColor: "#6366f1",
  },
  styleInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  styleTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  comparisonButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  comparisonButtonText: {
    color: "#6366f1",
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  saveButton: {
    backgroundColor: "#6366f1",
  },
  shareButton: {
    backgroundColor: "#22c55e",
  },
  moreOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tryAnotherButton: {
    flex: 1,
    marginRight: 4,
    borderColor: "#6366f1",
  },
  newPhotoButton: {
    flex: 1,
    marginLeft: 4,
    borderColor: "#6366f1",
  },
})

