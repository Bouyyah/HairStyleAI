"use client"

import { useState } from "react"
import { View, Text, StyleSheet, Image, ScrollView, Switch, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Divider } from "react-native-paper"
import { Ionicons } from "@expo/vector-icons"

export function Profile() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [saveHistory, setSaveHistory] = useState(true)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: "/placeholder.svg?height=100&width=100" }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editProfileButton}>
              <Ionicons name="pencil" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>Guest User</Text>
          <Text style={styles.profileEmail}>Sign in to save your styles</Text>
          <Button mode="contained" style={styles.signInButton} onPress={() => {}}>
            Sign In
          </Button>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="moon-outline" size={24} color="#6366f1" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#d1d5db", true: "#a5b4fc" }}
              thumbColor={darkMode ? "#6366f1" : "#f4f3f4"}
            />
          </View>

          <Divider style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications-outline" size={24} color="#6366f1" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#d1d5db", true: "#a5b4fc" }}
              thumbColor={notifications ? "#6366f1" : "#f4f3f4"}
            />
          </View>

          <Divider style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="save-outline" size={24} color="#6366f1" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Save History</Text>
            </View>
            <Switch
              value={saveHistory}
              onValueChange={setSaveHistory}
              trackColor={{ false: "#d1d5db", true: "#a5b4fc" }}
              thumbColor={saveHistory ? "#6366f1" : "#f4f3f4"}
            />
          </View>
        </View>

        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>About</Text>

          <TouchableOpacity style={styles.aboutItem}>
            <View style={styles.aboutInfo}>
              <Ionicons name="information-circle-outline" size={24} color="#6366f1" style={styles.aboutIcon} />
              <Text style={styles.aboutLabel}>App Information</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <Divider style={styles.divider} />

          <TouchableOpacity style={styles.aboutItem}>
            <View style={styles.aboutInfo}>
              <Ionicons name="shield-checkmark-outline" size={24} color="#6366f1" style={styles.aboutIcon} />
              <Text style={styles.aboutLabel}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <Divider style={styles.divider} />

          <TouchableOpacity style={styles.aboutItem}>
            <View style={styles.aboutInfo}>
              <Ionicons name="document-text-outline" size={24} color="#6366f1" style={styles.aboutIcon} />
              <Text style={styles.aboutLabel}>Terms of Service</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <Divider style={styles.divider} />

          <TouchableOpacity style={styles.aboutItem}>
            <View style={styles.aboutInfo}>
              <Ionicons name="help-circle-outline" size={24} color="#6366f1" style={styles.aboutIcon} />
              <Text style={styles.aboutLabel}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>HairStyle AI v1.0.0</Text>
        </View>
      </ScrollView>
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
  profileSection: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
    marginBottom: 16,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editProfileButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#6366f1",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileEmail: {
    color: "#666",
    marginBottom: 16,
  },
  signInButton: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 24,
  },
  settingsSection: {
    backgroundColor: "white",
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
  },
  divider: {
    backgroundColor: "#eee",
  },
  aboutSection: {
    backgroundColor: "white",
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  aboutItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  aboutInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  aboutIcon: {
    marginRight: 12,
  },
  aboutLabel: {
    fontSize: 16,
  },
  versionInfo: {
    alignItems: "center",
    padding: 24,
  },
  versionText: {
    color: "#999",
  },
})

