import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SUPABASE_URL = "https://rqbexzndnzzfbonafzop.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxYmV4em5kbnp6ZmJvbmFmem9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0OTMzMjYsImV4cCI6MjA3NzA2OTMyNn0.lIIGhNaXnwGpUHKpOVt_LpUfsqyzZVCxA7jHeB2xc6c";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Supabase configuration missing");
}

// Adaptador de storage seguro para web (Safari ITP / modo privado hacen que
// localStorage.setItem lance QuotaExceededError — hay que atrapar eso).
const webStorageAdapter = {
  getItem: (key) => {
    try {
      return Promise.resolve(window.localStorage.getItem(key));
    } catch {
      return Promise.resolve(null);
    }
  },
  setItem: (key, value) => {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Modo privado de Safari: QuotaExceededError — ignorar silenciosamente
    }
    return Promise.resolve();
  },
  removeItem: (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch {}
    return Promise.resolve();
  },
};

// En web se usa el adaptador seguro; en nativo AsyncStorage
const authStorage = Platform.OS === "web" ? webStorageAdapter : AsyncStorage;

// Timeout: 30s en web (conexiones móviles lentas), 15s en nativo
const FETCH_TIMEOUT = Platform.OS === "web" ? 30000 : 15000;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    storage: authStorage,
  },
  global: {
    headers: {
      "x-client-info": "supabase-js-react-native",
    },
    fetch: (...args) => {
      const [resource, config] = args;

      if (!config?.signal) {
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          FETCH_TIMEOUT,
        );

        return fetch(resource, {
          ...config,
          signal: controller.signal,
        }).finally(() => clearTimeout(timeoutId));
      }

      return fetch(...args);
    },
  },
});

// Configuración de tablas
export const TABLES = {
  USERS: "users",
  WALLETS: "wallets",
  INVESTMENTS: "investments",
  TRANSACTIONS: "transactions",
  PENDING_DEPOSITS: "pending_deposits",
  WITHDRAWALS: "withdrawals",
  PAYMENT_METHODS: "payment_methods",
  RECHARGE_AMOUNTS: "recharge_amounts",
  STATS: "stats",
  TEAMS: "teams",
  MATCHES: "matches",
  EVENTS: "events",
  BETTING_OPTIONS: "betting_options",
  USER_BETS: "user_bets",
};

// Configuración de Storage Buckets
export const STORAGE_BUCKETS = {
  PAYMENT_RECEIPTS: "payment-receipts",
  AVATARS: "avatars",
  PUBLIC_ASSETS: "public-assets",
};

// URLs base para Storage
export const STORAGE_URLS = {
  PUBLIC_AVATARS: `${SUPABASE_URL}/storage/v1/object/public/avatars/`,
  PUBLIC_ASSETS: `${SUPABASE_URL}/storage/v1/object/public/public-assets/`,
  // Para archivos privados se usa supabase.storage.from().getSignedUrl()
};

// Helper functions para Storage
export const StorageHelper = {
  // Obtener URL pública de avatar
  getAvatarUrl: (fileName) => {
    if (!fileName) return null;
    return `${STORAGE_URLS.PUBLIC_AVATARS}${fileName}`;
  },

  // Obtener URL pública de asset
  getAssetUrl: (fileName) => {
    if (!fileName) return null;
    return `${STORAGE_URLS.PUBLIC_ASSETS}${fileName}`;
  },

  // Subir comprobante de pago (privado)
  uploadPaymentReceipt: async (file, depositId) => {
    const fileName = `comprobantes/${depositId}_${Date.now()}.jpg`;
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKETS.PAYMENT_RECEIPTS)
      .upload(fileName, file);

    if (error) throw error;
    return data;
  },

  // Obtener URL firmada para comprobante privado
  getSignedReceiptUrl: async (fileName, expiresIn = 3600) => {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKETS.PAYMENT_RECEIPTS)
      .createSignedUrl(fileName, expiresIn);

    if (error) throw error;
    return data.signedUrl;
  },

  // Subir avatar de usuario
  uploadAvatar: async (file, userId) => {
    const fileName = `${userId}/avatar_${Date.now()}.jpg`;
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKETS.AVATARS)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw error;
    return data;
  },
};

export default supabase;
