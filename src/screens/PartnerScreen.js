import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";
import { useAuth } from "../contexts/AuthContext";
import ReferralService from "../services/ReferralService";
import AuthService from "../services/AuthService";
import {
  scaleFont,
  getHorizontalPadding,
  getBorderRadius,
  useSafeArea,
  getSafeBottomPadding,
} from "../utils/responsive";

const PartnerScreen = ({ navigation }) => {
  const { user } = useAuth();
  const insets = useSafeArea();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [invitationCode, setInvitationCode] = useState("");
  const [referralTeam, setReferralTeam] = useState({
    level1: 0,
    level2: 0,
    level3: 0,
    total: 0,
  });
  const [agentLevel, setAgentLevel] = useState(
    ReferralService.getReferralLevel(0),
  );
  const [totalCommissions, setTotalCommissions] = useState(0);

  const loadData = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const [team, commData, code] = await Promise.all([
        ReferralService.getReferralTeam(user.id),
        ReferralService.getCommissions(user.id, 50),
        AuthService.getInvitationCode(user.id),
      ]);

      setReferralTeam(team);
      setAgentLevel(ReferralService.getReferralLevel(team.level1));
      setInvitationCode(code || "");

      if (commData?.commissions) {
        const total = commData.commissions.reduce(
          (sum, c) => sum + (c.amount || 0),
          0,
        );
        setTotalCommissions(total);
      }
    } catch (error) {
      console.error("Error cargando datos Partner:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const handleCopyCode = async () => {
    if (!invitationCode) return;
    await Clipboard.setStringAsync(invitationCode);
    Alert.alert("✅ Copiado", "Código de invitación copiado al portapapeles");
  };

  const handleShare = async () => {
    if (!invitationCode) return;
    try {
      await Share.share({
        message: `¡Únete a CDE Inversiones! Usa mi código de invitación: ${invitationCode}`,
      });
    } catch (error) {
      console.error("Error compartiendo:", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <LinearGradient colors={["#3b82f6", "#1d4ed8"]} style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Partner</Text>
          <View style={{ width: 40 }} />
        </LinearGradient>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      </SafeAreaView>
    );
  }

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
        <Text style={styles.headerTitle}>Partner</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: getSafeBottomPadding(insets) + 20,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Agent Level Card */}
        <View style={styles.section}>
          <LinearGradient
            colors={["#1e3a5f", "#1e293b"]}
            style={styles.levelCard}
          >
            <View style={styles.levelHeader}>
              <Ionicons
                name="shield-checkmark"
                size={28}
                color={agentLevel.color}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.levelLabel}>Tu Nivel de Partner</Text>
                <Text style={[styles.levelName, { color: agentLevel.color }]}>
                  {agentLevel.name}
                </Text>
              </View>
            </View>

            <View style={styles.levelStats}>
              <View style={styles.levelStat}>
                <Text style={styles.levelStatValue}>
                  {agentLevel.commissionPercent}
                </Text>
                <Text style={styles.levelStatLabel}>Comisión</Text>
              </View>
              <View style={styles.levelStat}>
                <Text style={styles.levelStatValue}>{referralTeam.total}</Text>
                <Text style={styles.levelStatLabel}>Equipo Total</Text>
              </View>
              <View style={styles.levelStat}>
                <Text style={styles.levelStatValue}>
                  ${totalCommissions.toFixed(2)}
                </Text>
                <Text style={styles.levelStatLabel}>Comisiones</Text>
              </View>
            </View>

            {/* Progress to next level */}
            {agentLevel.nextLevel && (
              <View style={styles.progressSection}>
                <Text style={styles.progressText}>
                  {agentLevel.nextLevel.remaining} referidos más para{" "}
                  {agentLevel.nextLevel.name}
                </Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.min(agentLevel.progress * 100, 100)}%`,
                        backgroundColor: agentLevel.color,
                      },
                    ]}
                  />
                </View>
              </View>
            )}
          </LinearGradient>
        </View>

        {/* Invitation Code */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tu Código de Invitación</Text>
          <View style={styles.codeCard}>
            <Text style={styles.codeText}>
              {invitationCode || "Sin código"}
            </Text>
            <View style={styles.codeActions}>
              <TouchableOpacity
                style={styles.codeButton}
                onPress={handleCopyCode}
              >
                <Ionicons name="copy-outline" size={20} color="#3b82f6" />
                <Text style={styles.codeButtonText}>Copiar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.codeButton, styles.shareButton]}
                onPress={handleShare}
              >
                <Ionicons name="share-social-outline" size={20} color="#fff" />
                <Text style={[styles.codeButtonText, { color: "#fff" }]}>
                  Compartir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Team Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen de Equipo</Text>
          {[
            {
              label: "Nivel 1 (Directos)",
              count: referralTeam.level1,
              color: "#06b6d4",
            },
            { label: "Nivel 2", count: referralTeam.level2, color: "#ec4899" },
            { label: "Nivel 3", count: referralTeam.level3, color: "#fbbf24" },
          ].map((item, index) => (
            <View key={index} style={styles.teamRow}>
              <View style={styles.teamRowLeft}>
                <View
                  style={[styles.teamDot, { backgroundColor: item.color }]}
                />
                <Text style={styles.teamRowLabel}>{item.label}</Text>
              </View>
              <Text style={styles.teamRowCount}>{item.count}</Text>
            </View>
          ))}
        </View>

        {/* How it works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Cómo funciona?</Text>
          <View style={styles.card}>
            {[
              "Comparte tu código de invitación con amigos.",
              "Cuando se registren usando tu código, serán parte de tu equipo.",
              "Gana comisiones por los depósitos de tu equipo según tu nivel.",
              "A más referidos directos, mayor nivel y mayor porcentaje de comisión.",
            ].map((step, index) => (
              <View key={index} style={styles.stepRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
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
  levelCard: {
    borderRadius: getBorderRadius(16),
    padding: 20,
  },
  levelHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  levelLabel: {
    fontSize: scaleFont(12),
    color: "#9ca3af",
  },
  levelName: {
    fontSize: scaleFont(18),
    fontWeight: "800",
  },
  levelStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  levelStat: {
    alignItems: "center",
    flex: 1,
  },
  levelStatValue: {
    fontSize: scaleFont(18),
    fontWeight: "700",
    color: "#fff",
  },
  levelStatLabel: {
    fontSize: scaleFont(11),
    color: "#9ca3af",
    marginTop: 4,
  },
  progressSection: {
    marginTop: 16,
  },
  progressText: {
    fontSize: scaleFont(12),
    color: "#9ca3af",
    marginBottom: 6,
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  codeCard: {
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
  codeText: {
    fontSize: scaleFont(22),
    fontWeight: "800",
    color: "#1d4ed8",
    letterSpacing: 2,
    marginBottom: 14,
  },
  codeActions: {
    flexDirection: "row",
    gap: 10,
  },
  codeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: getBorderRadius(8),
    borderWidth: 1,
    borderColor: "#3b82f6",
    gap: 6,
  },
  codeButtonText: {
    fontSize: scaleFont(13),
    fontWeight: "600",
    color: "#3b82f6",
  },
  shareButton: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  teamRow: {
    backgroundColor: "#fff",
    borderRadius: getBorderRadius(10),
    padding: 14,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  teamRowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  teamDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  teamRowLabel: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    color: "#1f2937",
  },
  teamRowCount: {
    fontSize: scaleFont(16),
    fontWeight: "700",
    color: "#1d4ed8",
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
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 1,
  },
  stepNumberText: {
    fontSize: scaleFont(12),
    fontWeight: "700",
    color: "#fff",
  },
  stepText: {
    fontSize: scaleFont(13),
    color: "#4b5563",
    lineHeight: scaleFont(13) * 1.5,
    flex: 1,
  },
});

export default PartnerScreen;
