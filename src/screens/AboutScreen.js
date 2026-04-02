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
          paddingBottom: getSafeBottomPadding(insets) + 20,
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

        {/* FIFA Badge */}
        <View style={styles.section}>
          <View style={styles.fifaBadge}>
            <Ionicons name="football-outline" size={22} color="#fbbf24" />
            <Text style={styles.fifaBadgeText}>Empresa Oficial FIFA</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Qué es CDE Inversiones?</Text>
          <View style={styles.card}>
            <Text style={styles.description}>
              CDE Inversiones es una compañía oficial vinculada a FIFA que opera
              en la República Dominicana. Nos especializamos en inversiones
              respaldadas por el fútbol mundial, permitiendo a nuestros usuarios
              participar en eventos deportivos de alto nivel y obtener
              rendimientos atractivos de manera segura y transparente.
            </Text>
          </View>
        </View>

        {/* Presence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nuestra Presencia</Text>
          <View style={styles.presenceRow}>
            <View style={styles.presenceCard}>
              <Ionicons name="flag-outline" size={26} color="#3b82f6" />
              <Text style={styles.presenceTitle}>República Dominicana</Text>
              <Text style={styles.presenceDesc}>
                Sede principal de operaciones
              </Text>
            </View>
            <View style={styles.presenceCard}>
              <Ionicons name="football-outline" size={26} color="#fbbf24" />
              <Text style={styles.presenceTitle}>FIFA</Text>
              <Text style={styles.presenceDesc}>
                Respaldo y certificación oficial
              </Text>
            </View>
          </View>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Por qué elegirnos?</Text>
          {[
            {
              icon: "shield-checkmark-outline",
              title: "Respaldado por FIFA",
              desc: "Empresa certificada con operación oficial en el mundo del fútbol.",
            },
            {
              icon: "flag-outline",
              title: "Operando en RD",
              desc: "Presencia física en República Dominicana con soporte local.",
            },
            {
              icon: "trending-up-outline",
              title: "Inversiones en Football",
              desc: "Genera rendimientos participando en eventos FIFA y ligas internacionales.",
            },
            {
              icon: "people-outline",
              title: "Programa de Referidos",
              desc: "Gana comisiones invitando a tus amigos a la plataforma.",
            },
            {
              icon: "star-outline",
              title: "Niveles VIP",
              desc: "Beneficios exclusivos y mayores tasas según tu nivel de inversión.",
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
    paddingVertical: 14,
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
    paddingTop: 30,
    paddingBottom: 10,
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
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
  fifaBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef9ec",
    borderRadius: getBorderRadius(20),
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#fbbf24",
    gap: 8,
  },
  fifaBadgeText: {
    fontSize: scaleFont(13),
    fontWeight: "700",
    color: "#b45309",
  },
  presenceRow: {
    flexDirection: "row",
    gap: 10,
  },
  presenceCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: getBorderRadius(12),
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  presenceTitle: {
    fontSize: scaleFont(13),
    fontWeight: "700",
    color: "#1f2937",
    marginTop: 6,
    textAlign: "center",
  },
  presenceDesc: {
    fontSize: scaleFont(11),
    color: "#6b7280",
    marginTop: 4,
    textAlign: "center",
  },
  section: {
    paddingHorizontal: getHorizontalPadding(),
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: scaleFont(16),
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: getBorderRadius(12),
    padding: 16,
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
    padding: 14,
    marginBottom: 10,
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
    marginTop: 10,
  },
});

export default AboutScreen;
