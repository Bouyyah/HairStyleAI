import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Card, Title, Paragraph } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"

export function Home() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>HairStyle AI</Text>
          <Text style={styles.subtitle}>Transform your look with AI</Text>
        </View>

        <Card style={styles.featuredCard}>
          <Card.Cover source={{ uri: "/placeholder.svg?height=200&width=400" }} style={styles.featuredImage} />
          <Card.Content>
            <Title>Try New Styles Instantly</Title>
            <Paragraph>
              Use our AI technology to see yourself with different hairstyles before making a change.
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={() => navigation.navigate("Camera")} style={styles.primaryButton}>
              Take a Photo
            </Button>
            <Button mode="outlined" onPress={() => navigation.navigate("Gallery")} style={styles.secondaryButton}>
              Upload Photo
            </Button>
          </Card.Actions>
        </Card>

        <Text style={styles.sectionTitle}>Popular Styles</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.popularStyles}>
          {[1, 2, 3, 4, 5].map((item) => (
            <TouchableOpacity key={item} style={styles.styleCard} onPress={() => navigation.navigate("Styles")}>
              <Image source={{ uri: `/placeholder.svg?height=120&width=100` }} style={styles.styleImage} />
              <Text style={styles.styleName}>Style {item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.howItWorks}>
          <View style={styles.step}>
            <View style={styles.stepIcon}>
              <Ionicons name="camera" size={24} color="#6366f1" />
            </View>
            <Text style={styles.stepTitle}>Take a Photo</Text>
            <Text style={styles.stepDescription}>Capture your current look with our camera</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepIcon}>
              <Ionicons name="cut" size={24} color="#6366f1" />
            </View>
            <Text style={styles.stepTitle}>Choose a Style</Text>
            <Text style={styles.stepDescription}>Browse through our collection of hairstyles</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepIcon}>
              <Ionicons name="sparkles" size={24} color="#6366f1" />
            </View>
            <Text style={styles.stepTitle}>See the Magic</Text>
            <Text style={styles.stepDescription}>Our AI transforms your photo with the new style</Text>
          </View>
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
    padding: 20,
    backgroundColor: "#6366f1",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 5,
  },
  featuredCard: {
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
  },
  featuredImage: {
    height: 200,
  },
  primaryButton: {
    backgroundColor: "#6366f1",
    marginRight: 8,
  },
  secondaryButton: {
    borderColor: "#6366f1",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  popularStyles: {
    paddingLeft: 16,
  },
  styleCard: {
    marginRight: 12,
    width: 100,
  },
  styleImage: {
    width: 100,
    height: 120,
    borderRadius: 8,
  },
  styleName: {
    marginTop: 8,
    textAlign: "center",
  },
  howItWorks: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 24,
  },
  step: {
    flex: 1,
    alignItems: "center",
    padding: 8,
  },
  stepIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  stepTitle: {
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  stepDescription: {
    textAlign: "center",
    fontSize: 12,
    color: "#666",
  },
})

