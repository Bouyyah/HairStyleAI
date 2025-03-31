"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { Camera as ExpoCamera } from "expo-camera"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import * as FaceDetector from "expo-face-detector"

export function Camera() {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(ExpoCamera.Constants.Type.front)
  const [flash, setFlash] = useState(ExpoCamera.Constants.FlashMode.off)
  const [capturedImage, setCapturedImage] = useState(null)
  const [faceDetected, setFaceDetected] = useState(false)
  const cameraRef = useRef(null)
  const navigation = useNavigation()

  useEffect(() => {
    ;(async () => {
      const { status } = await ExpoCamera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  const handleFacesDetected = ({ faces }) => {
    setFaceDetected(faces.length > 0)
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: false,
      })
      setCapturedImage(photo)
    }
  }

  const retakePicture = () => {
    setCapturedImage(null)
  }

  const usePhoto = () => {
    navigation.navigate("Styles", { photo: capturedImage })
  }

  const toggleCameraType = () => {
    setType(type === ExpoCamera.Constants.Type.back ? ExpoCamera.Constants.Type.front : ExpoCamera.Constants.Type.back)
  }

  const toggleFlash = () => {
    setFlash(
      flash === ExpoCamera.Constants.FlashMode.off
        ? ExpoCamera.Constants.FlashMode.on
        : ExpoCamera.Constants.FlashMode.off,
    )
  }

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      {capturedImage ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage.uri }} style={styles.previewImage} />
          <View style={styles.previewButtons}>
            <TouchableOpacity style={styles.previewButton} onPress={retakePicture}>
              <Ionicons name="refresh" size={24} color="white" />
              <Text style={styles.previewButtonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.previewButton, styles.usePhotoButton]} onPress={usePhoto}>
              <Ionicons name="checkmark" size={24} color="white" />
              <Text style={styles.previewButtonText}>Use Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.cameraContainer}>
          <ExpoCamera
            ref={cameraRef}
            style={styles.camera}
            type={type}
            flashMode={flash}
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
              runClassifications: FaceDetector.FaceDetectorClassifications.none,
              minDetectionInterval: 100,
              tracking: true,
            }}
          >
            <View style={styles.cameraControls}>
              <TouchableOpacity style={styles.cameraButton} onPress={toggleFlash}>
                <Ionicons
                  name={flash === ExpoCamera.Constants.FlashMode.off ? "flash-off" : "flash"}
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraType}>
                <Ionicons name="camera-reverse" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {faceDetected && (
              <View style={styles.faceDetectedIndicator}>
                <Text style={styles.faceDetectedText}>Face Detected</Text>
              </View>
            )}

            <View style={styles.captureButtonContainer}>
              <TouchableOpacity
                style={[styles.captureButton, faceDetected ? styles.captureButtonActive : null]}
                onPress={takePicture}
                disabled={!faceDetected}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>
          </ExpoCamera>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: "space-between",
  },
  cameraControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  cameraButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonActive: {
    backgroundColor: "white",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
  },
  previewContainer: {
    flex: 1,
  },
  previewImage: {
    flex: 1,
  },
  previewButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
  },
  previewButton: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  usePhotoButton: {
    backgroundColor: "#6366f1",
  },
  previewButtonText: {
    color: "white",
    marginLeft: 8,
  },
  faceDetectedIndicator: {
    position: "absolute",
    top: 80,
    alignSelf: "center",
    backgroundColor: "rgba(99, 102, 241, 0.7)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  faceDetectedText: {
    color: "white",
    fontWeight: "bold",
  },
})

