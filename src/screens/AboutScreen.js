import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  scaleFont,
  getHorizontalPadding,
  getSpacing,
  getBorderRadius,
  useSafeArea,
  getSafeBottomPadding,
} from "../utils/responsive";

const AboutScreen = ({ navigation }) => {
  const insets = useSafeArea();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <LinearGradient colors={["#3b82f6", "#1d4ed8"]} style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Acerca de CDE</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: getSafeBottomPadding(insets) + getSpacing(20),
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo / Brand */}
        <View style={styles.brandSection}>
          <LinearGradient
            colors={["#3b82f6", "#1d4ed8"]}
            style={styles.logoContainer}
          >
            <Ionicons name="trending-up" size={48} color="#fff" />
          </LinearGradient>
          <Text style={styles.appName}>CDE INVERSIONES</Text>
          <Text style={styles.version}>Versión 1.0.0</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Qué es CDE?</Text>
          <View style={styles.card}>
            <Text style={styles.description}>
              CDE Inversiones es una plataforma de inversiones deportivas que te
              permite participar en eventos deportivos y obtener rendimientos
              atractivos. Nuestra misión es ofrecer una experiencia segura,
              transparente y accesible para todos.
            </Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Características</Text>
          {[
            {
              icon: "shield-checkmark-outline",
              title: "Seguridad",
              desc: "Tus fondos y datos protegidos con la mejor tecnología.",
            },
            {
              icon: "flash-outline",
              title: "Rapidez",
              desc: "Depósitos y retiros procesados de forma ágil.",
            },
            {
              icon: "people-outline",
              title: "Programa de Referidos",
              desc: "Gana comisiones invitando a tus amigos.",
            },
            {
              icon: "star-outline",
              title: "Niveles VIP",
              desc: "Beneficios exclusivos según tu nivel de inversión.",
            },
          ].map((item, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name={item.icon} size={22} color="#3b82f6" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Legal */}
        <View style={styles.section}>
          <Text style={styles.legalText}>
            © 2026 CDE Inversiones. Todos los derechos reservados.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: getHorizontalPadding(),
    paddingVertical: getSpacing(14),
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: scaleFont(18),
    fontWeight: "700",
    color: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  brandSection: {
    alignItems: "center",
    paddingTop: getSpacing(30),
    paddingBottom: getSpacing(10),
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: getSpacing(14),
  },
  appName: {
    fontSize: scaleFont(22),
    fontWeight: "800",
    color: "#1f2937",
  },
  version: {
    fontSize: scaleFont(13),
    color: "#9ca3af",
    marginTop: 4,
  },
  section: {
    paddingHorizontal: getHorizontalPadding(),
    marginTop: getSpacing(20),
  },
  sectionTitle: {
    fontSize: scaleFont(16),
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: getSpacing(12),
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: getBorderRadius(12),
    padding: getSpacing(16),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  description: {
    fontSize: scaleFont(14),
    color: "#4b5563",
    lineHeight: scaleFont(14) * 1.6,
  },
  featureCard: {
    backgroundColor: "#fff",
    borderRadius: getBorderRadius(12),
    padding: getSpacing(14),
    marginBottom: getSpacing(10),
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  featureIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  featureTitle: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    color: "#1f2937",
  },
  featureDesc: {
    fontSize: scaleFont(12),
    color: "#6b7280",
    marginTop: 2,
  },
  legalText: {
    fontSize: scaleFont(12),
    color: "#9ca3af",
    textAlign: "center",
    marginTop: getSpacing(10),
  },
});

export default AboutScreen;
