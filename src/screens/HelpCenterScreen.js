import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
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

const SUPPORT_PHONE = "+40376300829";
const SUPPORT_PHONE_DISPLAY = "+40 376 300 829";

const FAQ_ITEMS = [
  {
    question: "¿Cómo realizo una recarga?",
    answer:
      'Ve a tu perfil, presiona "Recargar" y selecciona el método de pago (transferencia bancaria o USDT). Sigue las instrucciones en pantalla para completar el depósito.',
  },
  {
    question: "¿Cuánto tarda en acreditarse mi depósito?",
    answer:
      "Los depósitos por transferencia bancaria pueden tardar entre 5 y 30 minutos. Los depósitos en USDT se acreditan una vez confirmada la transacción en la red.",
  },
  {
    question: "¿Cómo retiro mis fondos?",
    answer:
      'Desde tu perfil, presiona "Retirar", ingresa el monto y los datos de tu cuenta. Los retiros se procesan en un plazo de 24 a 48 horas hábiles.',
  },
  {
    question: "¿Qué son los niveles VIP?",
    answer:
      "Los niveles VIP se obtienen según el total depositado. Cada nivel ofrece beneficios exclusivos como mejores tasas y atención prioritaria.",
  },
  {
    question: "¿Cómo funciona el programa de referidos?",
    answer:
      "Comparte tu código de invitación con amigos. Cuando se registren y depositen, recibirás comisiones según tu nivel de agente.",
  },
  {
    question: "¿Es segura mi inversión?",
    answer:
      "CDE Inversiones opera bajo supervisión oficial y respaldo FIFA. Tus fondos están protegidos y cada transacción es registrada y verificable.",
  },
];

const HelpCenterScreen = ({ navigation }) => {
  const insets = useSafeArea();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleWhatsApp = () => {
    const url = `https://wa.me/${SUPPORT_PHONE.replace(/[^0-9]/g, "")}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(
            "WhatsApp no disponible",
            `Contáctanos al ${SUPPORT_PHONE_DISPLAY}`,
          );
        }
      })
      .catch(() =>
        Alert.alert("Error", `Contáctanos al ${SUPPORT_PHONE_DISPLAY}`),
      );
  };

  const handleCall = () => {
    Linking.openURL(`tel:${SUPPORT_PHONE}`);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
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
          paddingBottom: getSafeBottomPadding(insets) + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero banner */}
        <LinearGradient
          colors={["#1e3a5f", "#1e293b"]}
          style={styles.heroBanner}
        >
          <Ionicons name="headset" size={40} color="#3b82f6" />
          <Text style={styles.heroTitle}>Soporte 24/7</Text>
          <Text style={styles.heroSubtitle}>
            Nuestro equipo está listo para ayudarte en todo momento.
          </Text>

          {/* Contact buttons */}
          <View style={styles.contactButtons}>
            <TouchableOpacity
              style={styles.whatsappBtn}
              onPress={handleWhatsApp}
            >
              <Ionicons name="logo-whatsapp" size={22} color="#fff" />
              <Text style={styles.whatsappBtnText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
              <Ionicons name="call-outline" size={22} color="#3b82f6" />
              <Text style={styles.callBtnText}>Llamar</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.phoneNumber}>{SUPPORT_PHONE_DISPLAY}</Text>
        </LinearGradient>

        {/* Quick actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contacto Rápido</Text>
          <View style={styles.quickRow}>
            {[
              {
                icon: "logo-whatsapp",
                label: "Chat\nWhatsApp",
                color: "#25D366",
                onPress: handleWhatsApp,
              },
              {
                icon: "call-outline",
                label: "Llamada\nDirecta",
                color: "#3b82f6",
                onPress: handleCall,
              },
            ].map((item, i) => (
              <TouchableOpacity
                key={i}
                style={styles.quickCard}
                onPress={item.onPress}
              >
                <View
                  style={[
                    styles.quickIcon,
                    { backgroundColor: item.color + "1A" },
                  ]}
                >
                  <Ionicons name={item.icon} size={28} color={item.color} />
                </View>
                <Text style={styles.quickLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
          {FAQ_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.faqCard}
              onPress={() => toggleFaq(index)}
              activeOpacity={0.8}
            >
              <View style={styles.faqHeader}>
                <Ionicons
                  name="help-circle"
                  size={20}
                  color="#3b82f6"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <Ionicons
                  name={expandedFaq === index ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="#9ca3af"
                />
              </View>
              {expandedFaq === index && (
                <Text style={styles.faqAnswer}>{item.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Still need help */}
        <View style={styles.section}>
          <View style={styles.stillHelpCard}>
            <Text style={styles.stillHelpTitle}>¿Aún necesitas ayuda?</Text>
            <Text style={styles.stillHelpText}>
              Habla directamente con un agente de soporte de CDE Inversiones.
            </Text>
            <TouchableOpacity
              style={styles.stillHelpBtn}
              onPress={handleWhatsApp}
            >
              <Ionicons name="logo-whatsapp" size={20} color="#fff" />
              <Text style={styles.stillHelpBtnText}>Hablar con un agente</Text>
            </TouchableOpacity>
          </View>
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
  heroBanner: {
    marginHorizontal: getHorizontalPadding(),
    marginTop: 20,
    borderRadius: getBorderRadius(16),
    padding: 24,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: scaleFont(20),
    fontWeight: "800",
    color: "#fff",
    marginTop: 10,
  },
  heroSubtitle: {
    fontSize: scaleFont(13),
    color: "#9ca3af",
    textAlign: "center",
    marginTop: 6,
    lineHeight: scaleFont(13) * 1.5,
  },
  contactButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },
  whatsappBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#25D366",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: getBorderRadius(10),
    gap: 8,
  },
  whatsappBtnText: {
    fontSize: scaleFont(14),
    fontWeight: "700",
    color: "#fff",
  },
  callBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(59,130,246,0.15)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: getBorderRadius(10),
    borderWidth: 1,
    borderColor: "#3b82f6",
    gap: 8,
  },
  callBtnText: {
    fontSize: scaleFont(14),
    fontWeight: "700",
    color: "#3b82f6",
  },
  phoneNumber: {
    fontSize: scaleFont(13),
    color: "#64748b",
    marginTop: 12,
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
  quickRow: {
    flexDirection: "row",
    gap: 12,
  },
  quickCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: getBorderRadius(12),
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  quickIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  quickLabel: {
    fontSize: scaleFont(12),
    fontWeight: "600",
    color: "#1f2937",
    textAlign: "center",
  },
  faqCard: {
    backgroundColor: "#fff",
    borderRadius: getBorderRadius(12),
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
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
    marginTop: 8,
  },
  stillHelpCard: {
    backgroundColor: "#eff6ff",
    borderRadius: getBorderRadius(14),
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  stillHelpTitle: {
    fontSize: scaleFont(16),
    fontWeight: "700",
    color: "#1d4ed8",
    marginBottom: 6,
  },
  stillHelpText: {
    fontSize: scaleFont(13),
    color: "#4b5563",
    textAlign: "center",
    lineHeight: scaleFont(13) * 1.5,
    marginBottom: 16,
  },
  stillHelpBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#25D366",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: getBorderRadius(10),
    gap: 8,
  },
  stillHelpBtnText: {
    fontSize: scaleFont(14),
    fontWeight: "700",
    color: "#fff",
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
