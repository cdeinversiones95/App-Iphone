import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  scaleWidth,
  scaleHeight,
  scaleFont,
  getHorizontalPadding,
  getSpacing,
  getBorderRadius,
  useSafeArea,
  getSafeBottomPadding,
} from "../utils/responsive";

const FAQ_ITEMS = [
  {
    question: "¿Cómo realizo una recarga?",
    answer:
      'Ve a tu perfil, presiona "Recargar" y selecciona el método de pago de tu preferencia (transferencia bancaria o USDT). Sigue las instrucciones en pantalla para completar el depósito.',
  },
  {
    question: "¿Cuánto tarda en acreditarse mi depósito?",
    answer:
      "Los depósitos por transferencia bancaria pueden tardar entre 5 y 30 minutos en acreditarse. Los depósitos en USDT se acreditan una vez confirmada la transacción en la red.",
  },
  {
    question: "¿Cómo retiro mis fondos?",
    answer:
      'Desde tu perfil, presiona "Retirar", ingresa el monto y los datos de tu cuenta bancaria. Los retiros se procesan en un plazo de 24 a 48 horas hábiles.',
  },
  {
    question: "¿Qué son los niveles VIP?",
    answer:
      "Los niveles VIP se obtienen según el total depositado. Cada nivel ofrece beneficios exclusivos como mejores tasas y atención prioritaria.",
  },
  {
    question: "¿Cómo funciona el programa de referidos?",
    answer:
      "Comparte tu código de invitación con amigos. Cuando se registren y realicen depósitos, recibirás comisiones según tu nivel de agente.",
  },
];

const HelpCenterScreen = ({ navigation }) => {
  const insets = useSafeArea();

  const handleContactSupport = () => {
    Linking.openURL("mailto:soporte@cde.com");
  };

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
        <Text style={styles.headerTitle}>Centro de Ayuda</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: getSafeBottomPadding(insets) + getSpacing(20),
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
          {FAQ_ITEMS.map((item, index) => (
            <View key={index} style={styles.faqCard}>
              <View style={styles.faqHeader}>
                <Ionicons
                  name="help-circle"
                  size={20}
                  color="#3b82f6"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.faqQuestion}>{item.question}</Text>
              </View>
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            </View>
          ))}
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Necesitas más ayuda?</Text>
          <TouchableOpacity
            style={styles.contactCard}
            onPress={handleContactSupport}
          >
            <Ionicons name="mail-outline" size={28} color="#3b82f6" />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.contactTitle}>Correo de Soporte</Text>
              <Text style={styles.contactText}>soporte@cde.com</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
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
  faqCard: {
    backgroundColor: "#fff",
    borderRadius: getBorderRadius(12),
    padding: getSpacing(14),
    marginBottom: getSpacing(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  faqQuestion: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    color: "#1f2937",
    flex: 1,
  },
  faqAnswer: {
    fontSize: scaleFont(13),
    color: "#6b7280",
    lineHeight: scaleFont(13) * 1.5,
    paddingLeft: 28,
  },
  contactCard: {
    backgroundColor: "#fff",
    borderRadius: getBorderRadius(12),
    padding: getSpacing(16),
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  contactTitle: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    color: "#1f2937",
  },
  contactText: {
    fontSize: scaleFont(13),
    color: "#3b82f6",
    marginTop: 2,
  },
});

export default HelpCenterScreen;
