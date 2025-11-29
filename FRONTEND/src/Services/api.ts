// Centralized API client for SafeSpace frontend

const API_FASTAPI = import.meta.env.VITE_API_FASTAPI;
const API_NODE = import.meta.env.VITE_API_NODE;

async function apiFetch(base: string, path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = Bearer ${token};

  const res = await fetch(${base}${path}, { ...options, headers });
  if (!res.ok) {
    throw new Error(HTTP ${res.status} on ${path});
  }
  return res.json();
}

// -------------------- AUTH (Node.js) --------------------
export const register = (data: any) =>
  apiFetch(API_NODE, "/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const login = (data: any) =>
  apiFetch(API_NODE, "/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

// -------------------- FORUM (Node.js) --------------------
export const getPosts = () => apiFetch(API_NODE, "/forum/posts");

export const createPost = (data: any) =>
  apiFetch(API_NODE, "/forum/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const replyToPost = (postId: string, data: any) =>
  apiFetch(API_NODE, /forum/replies/${postId}, {
    method: "POST",
    body: JSON.stringify(data),
  });

// -------------------- REPORTS & HOTSPOTS (Node.js) --------------------
export const createReport = (data: any) =>
  apiFetch(API_NODE, "/reports", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getHotspots = () => apiFetch(API_NODE, "/hotspots");

// -------------------- EMERGENCY (FastAPI) --------------------
export const emergency = (data: any) =>
  apiFetch(API_FASTAPI, "/emergency", {
    method: "POST",
    body: JSON.stringify(data),
  });

// -------------------- CHATBOT (FastAPI) --------------------
export const chatbot = (data: any) =>
  apiFetch(API_FASTAPI, "/chatbot", {
    method: "POST",
    body: JSON.stringify(data),
  });

// -------------------- MODERATION (FastAPI) --------------------
export const moderate = (data: any) =>
  apiFetch(API_FASTAPI, "/moderate", {
    method: "POST",
    body: JSON.stringify(data),
  });

// -------------------- EDUCATION MODULES (FastAPI) --------------------
export const getModules = () => apiFetch(API_FASTAPI, "/education/modules");