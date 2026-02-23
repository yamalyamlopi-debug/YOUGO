import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, Instagram, Users, Calendar, ChevronRight, Globe, ArrowLeft,
  Upload, Camera, Video, CreditCard, Check, X, LayoutDashboard, LogOut,
  Eye, MessageSquare, Send, Smartphone, ChevronDown, ChevronUp, ShieldCheck,
  FileText, Info, Lock, Car, Zap, TrendingUp, Wrench, Star, Crown, Hammer,
  Truck, Building2, Award, Clock, Search
} from 'lucide-react';

// \u2500\u2500\u2500 TRANSLATIONS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const translations = {
  he: {
    positioningLine: '\u05d4\u05e4\u05e8\u05e1\u05d5\u05dd \u05e9\u05de\u05d5\u05db\u05e8 \u05e8\u05db\u05d1\u05d9\u05dd \u2013 \u05dc\u05d0 \u05e8\u05e7 \u05de\u05e6\u05d9\u05d2 \u05d0\u05d5\u05ea\u05dd.',
    heroTitle: '\u05de\u05d5\u05db\u05e8\u05d9\u05dd \u05e8\u05db\u05d1? \u05d0\u05e0\u05d7\u05e0\u05d5 \u05de\u05d5\u05db\u05e8\u05d9\u05dd \u05d0\u05d5\u05ea\u05d5 \u05de\u05d4\u05e8 \u05d9\u05d5\u05ea\u05e8.',
    heroSubtitle: 'YOUGO ISRAEL - \u05e4\u05dc\u05d8\u05e4\u05d5\u05e8\u05de\u05ea \u05d4\u05e9\u05d9\u05d5\u05d5\u05e7 \u05d4\u05de\u05d5\u05d1\u05d9\u05dc\u05d4 \u05d1\u05d0\u05d9\u05e0\u05e1\u05d8\u05d2\u05e8\u05dd \u05dc\u05de\u05db\u05d9\u05e8\u05ea \u05e8\u05db\u05d1\u05d9\u05dd.',
    startOrder: '\u05d4\u05ea\u05d7\u05dc \u05d4\u05d6\u05de\u05e0\u05d4',
    packages: '\u05d7\u05d1\u05d9\u05dc\u05d5\u05ea',
    checkout: '\u05d4\u05e9\u05dc\u05de\u05ea \u05d4\u05d6\u05de\u05e0\u05d4',
    carDetails: '\u05e4\u05e8\u05d8\u05d9 \u05d4\u05e8\u05db\u05d1',
    personalDetails: '\u05e4\u05e8\u05d8\u05d9 \u05d9\u05e6\u05d9\u05e8\u05ea \u05e7\u05e9\u05e8',
    uploadProof: '\u05d4\u05e2\u05dc\u05d0\u05ea \u05d0\u05d9\u05e9\u05d5\u05e8 \u05ea\u05e9\u05dc\u05d5\u05dd',
    submitOrder: '\u05e9\u05dc\u05d7 \u05d4\u05d6\u05de\u05e0\u05d4',
    orderSuccess: '\u05d4\u05d4\u05d6\u05de\u05e0\u05d4 \u05e0\u05e9\u05dc\u05d7\u05d4 \u05d1\u05d4\u05e6\u05dc\u05d7\u05d4!',
    mostPopular: '\u05d4\u05db\u05d9 \u05e4\u05d5\u05e4\u05d5\u05dc\u05e8\u05d9',
    basic: 'BASIC',
    pro: 'PRO',
    premium: 'PREMIUM',
    packageSubtitles: {
      basic: '\u05d7\u05d1\u05d9\u05dc\u05ea \u05db\u05e0\u05d9\u05e1\u05d4 \u05dc\u05e4\u05e8\u05e1\u05d5\u05dd',
      pro: '\u05d4\u05d1\u05d7\u05d9\u05e8\u05d4 \u05d4\u05e4\u05d5\u05e4\u05d5\u05dc\u05e8\u05d9\u05ea',
      premium: '\u05d7\u05e9\u05d9\u05e4\u05d4 \u05de\u05e7\u05e1\u05d9\u05de\u05dc\u05d9\u05ea'
    },
    features: {
      images2: '2 \u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d5\u05ea',
      post1: '\u05e4\u05d5\u05e1\u05d8 \u05d0\u05d7\u05d3 \u05d1\u05d0\u05d9\u05e0\u05e1\u05d8\u05d2\u05e8\u05dd',
      story7: '\u05e1\u05d8\u05d5\u05e8\u05d9 7 \u05d9\u05de\u05d9\u05dd',
      exposureBasic: '\u05d7\u05e9\u05d9\u05e4\u05d4 \u05dc\u05e7\u05d4\u05dc \u05de\u05e2\u05d5\u05e0\u05d9\u05d9\u05df',
      images4: '4 \u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d5\u05ea',
      postPro: '\u05e4\u05d5\u05e1\u05d8 + \u05d2\u05e8\u05e4\u05d9\u05e7\u05d4 \u05de\u05d9\u05d5\u05d7\u05d3\u05ea',
      story14: '\u05e1\u05d8\u05d5\u05e8\u05d9 14 \u05d9\u05d5\u05dd',
      priorityPro: '\u05e2\u05d3\u05d9\u05e4\u05d5\u05ea \u05d1\u05e4\u05e8\u05e1\u05d5\u05dd',
      exposurePro: '\u05d7\u05e9\u05d9\u05e4\u05d4 \u05dc\u05e7\u05d4\u05dc \u05de\u05de\u05d5\u05e7\u05d3',
      imagesPremium: '8 \u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d5\u05ea',
      postPremium: '\u05e4\u05d5\u05e1\u05d8 \u05e4\u05e8\u05de\u05d9\u05d5\u05dd \u05e2\u05dd \u05e2\u05d9\u05e6\u05d5\u05d1',
      story30: '\u05e1\u05d8\u05d5\u05e8\u05d9 30 \u05d9\u05d5\u05dd',
      priorityFull: '\u05e2\u05d3\u05d9\u05e4\u05d5\u05ea \u05de\u05dc\u05d0\u05d4',
      exposureMax: '\u05d7\u05e9\u05d9\u05e4\u05d4 \u05de\u05e7\u05e1\u05d9\u05de\u05dc\u05d9\u05ea',
      guidance: '\u05dc\u05d9\u05d5\u05d5\u05d9 \u05d0\u05d9\u05e9\u05d9 \u05e2\u05d3 \u05de\u05db\u05d9\u05e8\u05d4',
      video: '\u05e8\u05d9\u05dc\u05e1 \u05d5\u05d9\u05d3\u05d0\u05d5 15 \u05e9\u05e0\u05d9\u05d5\u05ea'
    },
    whyUs: {
      title: '\u05dc\u05de\u05d4 \u05dc\u05d1\u05d7\u05d5\u05e8 \u05d1\u05e0\u05d5?',
      audience: { title: '\u05e7\u05d4\u05dc \u05d9\u05e2\u05d3 \u05de\u05d3\u05d5\u05d9\u05e7', desc: '50,000+ \u05e2\u05d5\u05e7\u05d1\u05d9\u05dd \u05e4\u05e2\u05d9\u05dc\u05d9\u05dd \u05e9\u05de\u05d7\u05e4\u05e9\u05d9\u05dd \u05e8\u05db\u05d1 \u05db\u05e8\u05d2\u05e2.' },
      speed: { title: '\u05de\u05db\u05d9\u05e8\u05d4 \u05de\u05d4\u05d9\u05e8\u05d4', desc: '\u05d4\u05e8\u05db\u05d1 \u05e9\u05dc\u05da \u05de\u05ea\u05e4\u05e8\u05e1\u05dd \u05ea\u05d5\u05da 24 \u05e9\u05e2\u05d5\u05ea \u05d5\u05de\u05d2\u05d9\u05e2 \u05dc\u05d0\u05dc\u05e4\u05d9 \u05e7\u05d5\u05e0\u05d9\u05dd.' },
      results: { title: '\u05ea\u05d5\u05e6\u05d0\u05d5\u05ea \u05de\u05d5\u05db\u05d7\u05d5\u05ea', desc: '98% \u05de\u05d4\u05dc\u05e7\u05d5\u05d7\u05d5\u05ea \u05e9\u05dc\u05e0\u05d5 \u05de\u05d5\u05db\u05e8\u05d9\u05dd \u05d0\u05ea \u05d4\u05e8\u05db\u05d1 \u05d1\u05ea\u05d5\u05da 7 \u05d9\u05de\u05d9\u05dd.' }
    },
    faqs: [
      { q: '\u05db\u05de\u05d4 \u05d6\u05de\u05df \u05dc\u05d5\u05e7\u05d7 \u05e2\u05d3 \u05e9\u05d4\u05e8\u05db\u05d1 \u05e9\u05dc\u05d9 \u05de\u05ea\u05e4\u05e8\u05e1\u05dd?', a: '\u05dc\u05d0\u05d7\u05e8 \u05e7\u05d1\u05dc\u05ea \u05e4\u05e8\u05d8\u05d9 \u05d4\u05e8\u05db\u05d1, \u05d4\u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05d5\u05d0\u05d9\u05e9\u05d5\u05e8 \u05d4\u05ea\u05e9\u05dc\u05d5\u05dd \u2013 \u05d4\u05e8\u05db\u05d1 \u05e9\u05dc\u05da \u05d9\u05e2\u05dc\u05d4 \u05dc\u05e4\u05e8\u05e1\u05d5\u05dd \u05ea\u05d5\u05da 24 \u05e9\u05e2\u05d5\u05ea \u05e2\u05e1\u05e7\u05d9\u05d5\u05ea.' },
      { q: '\u05d4\u05d0\u05dd \u05e0\u05d9\u05ea\u05df \u05dc\u05e4\u05e8\u05e1\u05dd \u05e8\u05db\u05d1 \u05d9\u05e9\u05df?', a: '\u05db\u05df! \u05d0\u05e0\u05d7\u05e0\u05d5 \u05de\u05e4\u05e8\u05e1\u05de\u05d9\u05dd \u05db\u05dc\u05d9 \u05e8\u05db\u05d1 \u05de\u05db\u05dc \u05e9\u05e0\u05d4 \u05d5\u05de\u05db\u05dc \u05e1\u05d5\u05d2. \u05db\u05dc \u05e9\u05e6\u05e8\u05d9\u05da \u05d4\u05d5\u05d0 \u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05d0\u05d9\u05db\u05d5\u05ea\u05d9\u05d5\u05ea \u05d5\u05e4\u05e8\u05d8\u05d9\u05dd \u05de\u05d3\u05d5\u05d9\u05e7\u05d9\u05dd.' },
      { q: '\u05d0\u05d9\u05da \u05de\u05ea\u05d1\u05e6\u05e2 \u05d4\u05ea\u05e9\u05dc\u05d5\u05dd?', a: '\u05d4\u05ea\u05e9\u05dc\u05d5\u05dd \u05de\u05ea\u05d1\u05e6\u05e2 \u05d3\u05e8\u05da Bit \u05d0\u05d5 PayBox, \u05d4\u05e2\u05d1\u05e8\u05d4 \u05de\u05d4\u05d9\u05e8\u05d4 \u05d5\u05de\u05d0\u05d5\u05d1\u05d8\u05d7\u05ea \u05dc\u05d7\u05e9\u05d1\u05d5\u05e0\u05e0\u05d5. \u05dc\u05d0\u05d7\u05e8 \u05e7\u05d1\u05dc\u05ea \u05d4\u05d0\u05d9\u05e9\u05d5\u05e8, \u05de\u05ea\u05d7\u05d9\u05dc \u05ea\u05d4\u05dc\u05d9\u05da \u05d4\u05e4\u05e8\u05e1\u05d5\u05dd.' },
      { q: '\u05de\u05d4 \u05e7\u05d5\u05e8\u05d4 \u05d0\u05dd \u05d4\u05e8\u05db\u05d1 \u05dc\u05d0 \u05e0\u05de\u05db\u05e8?', a: '\u05d1\u05de\u05e7\u05e8\u05d4 \u05db\u05d6\u05d4, \u05e0\u05d9\u05e6\u05d5\u05e8 \u05e7\u05e9\u05e8 \u05d5\u05e0\u05d1\u05d7\u05df \u05d0\u05e4\u05e9\u05e8\u05d5\u05d9\u05d5\u05ea \u05dc\u05d4\u05d2\u05d1\u05e8\u05ea \u05d4\u05d7\u05e9\u05d9\u05e4\u05d4. \u05d0\u05e0\u05d7\u05e0\u05d5 \u05db\u05d0\u05df \u05dc\u05e2\u05d6\u05d5\u05e8 \u05e2\u05d3 \u05e9\u05d4\u05e2\u05e1\u05e7\u05d4 \u05de\u05ea\u05d1\u05e6\u05e2\u05ea.' },
      { q: '\u05d4\u05d0\u05dd \u05d0\u05d5\u05db\u05dc \u05dc\u05e2\u05e7\u05d5\u05d1 \u05d0\u05d7\u05e8 \u05d4\u05d4\u05d6\u05de\u05e0\u05d4 \u05e9\u05dc\u05d9?', a: '\u05d1\u05d4\u05d7\u05dc\u05d8! \u05dc\u05d0\u05d7\u05e8 \u05e9\u05dc\u05d9\u05d7\u05ea \u05d4\u05d4\u05d6\u05de\u05e0\u05d4 \u05ea\u05e7\u05d1\u05dc \u05de\u05e1\u05e4\u05e8 \u05d4\u05d6\u05de\u05e0\u05d4 \u05d9\u05d9\u05d7\u05d5\u05d3\u05d9 \u05e9\u05d3\u05e8\u05db\u05d5 \u05ea\u05d5\u05db\u05dc \u05dc\u05d1\u05d3\u05d5\u05e7 \u05d0\u05ea \u05d4\u05e1\u05d8\u05d8\u05d5\u05e1 \u05d1\u05db\u05dc \u05e2\u05ea.' },
      { q: '\u05de\u05d4 \u05d4\u05d4\u05d1\u05d3\u05dc \u05d1\u05d9\u05df \u05d4\u05d7\u05d1\u05d9\u05dc\u05d5\u05ea?', a: '\u05d4\u05d4\u05d1\u05d3\u05dc \u05d4\u05e2\u05d9\u05e7\u05e8\u05d9 \u05d4\u05d5\u05d0 \u05d1\u05db\u05de\u05d5\u05ea \u05d4\u05ea\u05de\u05d5\u05e0\u05d5\u05ea, \u05de\u05e9\u05da \u05d4\u05e4\u05e8\u05e1\u05d5\u05dd, \u05e1\u05d5\u05d2 \u05d4\u05d2\u05e8\u05e4\u05d9\u05e7\u05d4, \u05d5\u05e8\u05de\u05ea \u05d4\u05e7\u05d9\u05d3\u05d5\u05dd. \u05d7\u05d1\u05d9\u05dc\u05ea PRO \u05d4\u05d9\u05d0 \u05d4\u05d1\u05d7\u05d9\u05e8\u05d4 \u05d4\u05e4\u05d5\u05e4\u05d5\u05dc\u05e8\u05d9\u05ea \u05d1\u05d9\u05d5\u05ea\u05e8.' },
    ],
    pages: {
      terms: {
        title: '\u05ea\u05e7\u05e0\u05d5\u05df \u05d4\u05d0\u05ea\u05e8',
        content: `1. \u05db\u05dc\u05dc\u05d9\nYOUGO ISRAEL \u05de\u05e1\u05e4\u05e7\u05ea \u05e9\u05d9\u05e8\u05d5\u05ea\u05d9 \u05e4\u05e8\u05e1\u05d5\u05dd \u05d1\u05e8\u05e9\u05ea\u05d5\u05ea \u05d7\u05d1\u05e8\u05ea\u05d9\u05d5\u05ea \u05dc\u05de\u05db\u05d9\u05e8\u05ea \u05e8\u05db\u05d1\u05d9\u05dd.\n\n2. \u05ea\u05e0\u05d0\u05d9 \u05e9\u05d9\u05e8\u05d5\u05ea\n\u05d4\u05e9\u05d9\u05e8\u05d5\u05ea \u05de\u05d5\u05ea\u05e0\u05d4 \u05d1\u05ea\u05e9\u05dc\u05d5\u05dd \u05de\u05e8\u05d0\u05e9 \u05d5\u05d1\u05d0\u05e1\u05e4\u05e7\u05ea \u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05d5\u05e1\u05e8\u05d8\u05d5\u05e0\u05d9\u05dd \u05d0\u05d9\u05db\u05d5\u05ea\u05d9\u05d9\u05dd \u05e9\u05dc \u05d4\u05e8\u05db\u05d1.\n\n3. \u05de\u05d3\u05d9\u05e0\u05d9\u05d5\u05ea \u05d4\u05d7\u05d6\u05e8\u05d9\u05dd\n\u05dc\u05d0 \u05d9\u05d9\u05e0\u05ea\u05e0\u05d5 \u05d4\u05d7\u05d6\u05e8\u05d9\u05dd \u05dc\u05d0\u05d7\u05e8 \u05e4\u05e8\u05e1\u05d5\u05dd \u05d4\u05de\u05d5\u05d3\u05e2\u05d4. \u05d1\u05de\u05e7\u05e8\u05d4 \u05e9\u05dc \u05d1\u05e2\u05d9\u05d4 \u05d8\u05db\u05e0\u05d9\u05ea, \u05e0\u05e6\u05d9\u05e2 \u05e4\u05ea\u05e8\u05d5\u05df \u05d7\u05dc\u05d5\u05e4\u05d9.\n\n4. \u05d0\u05d7\u05e8\u05d9\u05d5\u05ea\nYOUGO ISRAEL \u05d0\u05d9\u05e0\u05d4 \u05d0\u05d7\u05e8\u05d0\u05d9\u05ea \u05dc\u05ea\u05d5\u05e6\u05d0\u05d5\u05ea \u05d4\u05de\u05db\u05d9\u05e8\u05d4, \u05d0\u05da \u05de\u05ea\u05d7\u05d9\u05d9\u05d1\u05ea \u05dc\u05e1\u05e4\u05e7 \u05d0\u05ea \u05e9\u05d9\u05e8\u05d5\u05ea \u05d4\u05e4\u05e8\u05e1\u05d5\u05dd \u05db\u05de\u05d5\u05e1\u05db\u05dd.`
      },
      privacy: {
        title: '\u05de\u05d3\u05d9\u05e0\u05d9\u05d5\u05ea \u05e4\u05e8\u05d8\u05d9\u05d5\u05ea',
        content: `1. \u05d0\u05d9\u05e1\u05d5\u05e3 \u05de\u05d9\u05d3\u05e2\n\u05d0\u05e0\u05d5 \u05d0\u05d5\u05e1\u05e4\u05d9\u05dd \u05e4\u05e8\u05d8\u05d9\u05dd \u05d0\u05d9\u05e9\u05d9\u05d9\u05dd \u05db\u05d2\u05d5\u05df \u05e9\u05dd, \u05d8\u05dc\u05e4\u05d5\u05df, \u05d5\u05de\u05d9\u05d3\u05e2 \u05e2\u05dc \u05d4\u05e8\u05db\u05d1 \u05dc\u05e6\u05d5\u05e8\u05da \u05de\u05ea\u05df \u05d4\u05e9\u05d9\u05e8\u05d5\u05ea \u05d1\u05dc\u05d1\u05d3.\n\n2. \u05e9\u05de\u05d9\u05e8\u05ea \u05de\u05d9\u05d3\u05e2\n\u05db\u05dc \u05d4\u05de\u05d9\u05d3\u05e2 \u05de\u05d0\u05d5\u05d7\u05e1\u05df \u05d1\u05e6\u05d5\u05e8\u05d4 \u05de\u05d0\u05d5\u05d1\u05d8\u05d7\u05ea \u05d5\u05d0\u05d9\u05e0\u05d5 \u05de\u05d5\u05e2\u05d1\u05e8 \u05dc\u05e6\u05d3 \u05e9\u05dc\u05d9\u05e9\u05d9.\n\n3. \u05d6\u05db\u05d5\u05d9\u05d5\u05ea \u05d4\u05de\u05e9\u05ea\u05de\u05e9\n\u05d9\u05e9 \u05dc\u05da \u05d4\u05d6\u05db\u05d5\u05ea \u05dc\u05d1\u05e7\u05e9 \u05de\u05d7\u05d9\u05e7\u05ea \u05d4\u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05e9\u05dc\u05da \u05d1\u05db\u05dc \u05e2\u05ea.`
      },
      about: {
        title: '\u05de\u05d9 \u05d0\u05e0\u05d7\u05e0\u05d5',
        content: `YOUGO ISRAEL \u05d4\u05d9\u05d0 \u05e4\u05dc\u05d8\u05e4\u05d5\u05e8\u05de\u05ea \u05d4\u05e9\u05d9\u05d5\u05d5\u05e7 \u05d4\u05d3\u05d9\u05d2\u05d9\u05d8\u05dc\u05d9 \u05d4\u05de\u05d5\u05d1\u05d9\u05dc\u05d4 \u05dc\u05de\u05db\u05d9\u05e8\u05ea \u05e8\u05db\u05d1\u05d9\u05dd \u05d1\u05d9\u05e9\u05e8\u05d0\u05dc.\n\n\u05d0\u05e0\u05d7\u05e0\u05d5 \u05de\u05ea\u05de\u05d7\u05d9\u05dd \u05d1\u05e4\u05e8\u05e1\u05d5\u05dd \u05de\u05de\u05d5\u05e7\u05d3 \u05d1\u05e8\u05e9\u05ea\u05d5\u05ea \u05d7\u05d1\u05e8\u05ea\u05d9\u05d5\u05ea, \u05e2\u05dd \u05d3\u05d2\u05e9 \u05e2\u05dc \u05d0\u05d9\u05e0\u05e1\u05d8\u05d2\u05e8\u05dd \u05d5\u05e8\u05d9\u05dc\u05e1.\n\n\u05d4\u05e6\u05d5\u05d5\u05ea \u05e9\u05dc\u05e0\u05d5 \u05de\u05d5\u05e8\u05db\u05d1 \u05de\u05d0\u05e0\u05e9\u05d9 \u05e9\u05d9\u05d5\u05d5\u05e7 \u05d3\u05d9\u05d2\u05d9\u05d8\u05dc\u05d9 \u05d5\u05de\u05e2\u05e6\u05d1\u05d9\u05dd \u05de\u05e7\u05e6\u05d5\u05e2\u05d9\u05d9\u05dd \u05e9\u05d9\u05d5\u05e6\u05e8\u05d9\u05dd \u05de\u05d5\u05d3\u05e2\u05d5\u05ea \u05e9\u05de\u05d5\u05db\u05e8\u05d5\u05ea.`
      }
    }
  },
  ar: {
    positioningLine: '\u0627\u0644\u0625\u0639\u0644\u0627\u0646 \u0627\u0644\u0630\u064a \u064a\u0628\u064a\u0639 \u0627\u0644\u0633\u064a\u0627\u0631\u0627\u062a \u2013 \u0644\u0627 \u064a\u0639\u0631\u0636\u0647\u0627 \u0641\u0642\u0637.',
    heroTitle: '\u062a\u0628\u064a\u0639 \u0633\u064a\u0627\u0631\u0629\u061f \u0646\u0628\u064a\u0639\u0647\u0627 \u0623\u0633\u0631\u0639.',
    heroSubtitle: 'YOUGO ISRAEL - \u0645\u0646\u0635\u0629 \u0627\u0644\u062a\u0633\u0648\u064a\u0642 \u0627\u0644\u0631\u0627\u0626\u062f\u0629 \u0639\u0644\u0649 \u0625\u0646\u0633\u062a\u063a\u0631\u0627\u0645 \u0644\u0628\u064a\u0639 \u0627\u0644\u0633\u064a\u0627\u0631\u0627\u062a.',
    startOrder: '\u0627\u0628\u062f\u0623 \u0627\u0644\u0637\u0644\u0628',
    packages: '\u0627\u0644\u0628\u0627\u0642\u0627\u062a',
    checkout: '\u0625\u062a\u0645\u0627\u0645 \u0627\u0644\u0637\u0644\u0628',
    carDetails: '\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0633\u064a\u0627\u0631\u0629',
    personalDetails: '\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062a\u0648\u0627\u0635\u0644',
    uploadProof: '\u0631\u0641\u0639 \u0625\u064a\u0635\u0627\u0644 \u0627\u0644\u062f\u0641\u0639',
    submitOrder: '\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628',
    orderSuccess: '\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0628\u0646\u062c\u0627\u062d!',
    mostPopular: '\u0627\u0644\u0623\u0643\u062b\u0631 \u0634\u064a\u0648\u0639\u0627\u064b',
    basic: '\u0623\u0633\u0627\u0633\u064a',
    pro: '\u0628\u0631\u0648',
    premium: '\u0628\u0631\u064a\u0645\u064a\u0648\u0645',
    packageSubtitles: {
      basic: '\u0628\u0627\u0642\u0629 \u0627\u0644\u0628\u062f\u0627\u064a\u0629 \u0644\u0644\u0625\u0639\u0644\u0627\u0646',
      pro: '\u0627\u0644\u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u0634\u0639\u0628\u064a',
      premium: '\u0623\u0642\u0635\u0649 \u062a\u0639\u0631\u0636'
    },
    features: {
      images2: '\u0635\u0648\u0631\u062a\u0627\u0646 \u0627\u062d\u062a\u0631\u0627\u0641\u064a\u062a\u0627\u0646',
      post1: '\u0645\u0646\u0634\u0648\u0631 \u0648\u0627\u062d\u062f \u0639\u0644\u0649 \u0625\u0646\u0633\u062a\u063a\u0631\u0627\u0645',
      story7: '\u0633\u062a\u0648\u0631\u064a 7 \u0623\u064a\u0627\u0645',
      exposureBasic: '\u062a\u0639\u0631\u0636 \u0644\u062c\u0645\u0647\u0648\u0631 \u0645\u0647\u062a\u0645',
      images4: '4 \u0635\u0648\u0631 \u0627\u062d\u062a\u0631\u0627\u0641\u064a\u0629',
      postPro: '\u0645\u0646\u0634\u0648\u0631 + \u0631\u0633\u0648\u0645 \u062e\u0627\u0635\u0629',
      story14: '\u0633\u062a\u0648\u0631\u064a 14 \u064a\u0648\u0645',
      priorityPro: '\u0623\u0648\u0644\u0648\u064a\u0629 \u0627\u0644\u0646\u0634\u0631',
      exposurePro: '\u062a\u0639\u0631\u0636 \u0644\u062c\u0645\u0647\u0648\u0631 \u0645\u0633\u062a\u0647\u062f\u0641',
      imagesPremium: '8 \u0635\u0648\u0631 \u0627\u062d\u062a\u0631\u0627\u0641\u064a\u0629',
      postPremium: '\u0645\u0646\u0634\u0648\u0631 \u0628\u0631\u064a\u0645\u064a\u0648\u0645',
      story30: '\u0633\u062a\u0648\u0631\u064a 30 \u064a\u0648\u0645',
      priorityFull: '\u0623\u0648\u0644\u0648\u064a\u0629 \u0643\u0627\u0645\u0644\u0629',
      exposureMax: '\u0623\u0642\u0635\u0649 \u062a\u0639\u0631\u0636',
      guidance: '\u0645\u062a\u0627\u0628\u0639\u0629 \u0634\u062e\u0635\u064a\u0629 \u062d\u062a\u0649 \u0627\u0644\u0628\u064a\u0639',
      video: '\u0631\u064a\u0644\u0632 \u0641\u064a\u062f\u064a\u0648 15 \u062b\u0627\u0646\u064a\u0629'
    },
    whyUs: {
      title: '\u0644\u0645\u0627\u0630\u0627 \u062a\u062e\u062a\u0627\u0631\u0646\u0627\u061f',
      audience: { title: '\u062c\u0645\u0647\u0648\u0631 \u0645\u0633\u062a\u0647\u062f\u0641', desc: '+50,000 \u0645\u062a\u0627\u0628\u0639 \u0646\u0634\u0637 \u064a\u0628\u062d\u062b\u0648\u0646 \u0639\u0646 \u0633\u064a\u0627\u0631\u0629 \u0627\u0644\u0622\u0646.' },
      speed: { title: '\u0628\u064a\u0639 \u0633\u0631\u064a\u0639', desc: '\u0633\u064a\u0627\u0631\u062a\u0643 \u062a\u064f\u0646\u0634\u0631 \u062e\u0644\u0627\u0644 24 \u0633\u0627\u0639\u0629 \u0648\u062a\u0635\u0644 \u0644\u0622\u0644\u0627\u0641 \u0627\u0644\u0645\u0634\u062a\u0631\u064a\u0646.' },
      results: { title: '\u0646\u062a\u0627\u0626\u062c \u0645\u062b\u0628\u062a\u0629', desc: '98% \u0645\u0646 \u0639\u0645\u0644\u0627\u0626\u0646\u0627 \u064a\u0628\u064a\u0639\u0648\u0646 \u0633\u064a\u0627\u0631\u0627\u062a\u0647\u0645 \u062e\u0644\u0627\u0644 7 \u0623\u064a\u0627\u0645.' }
    },
    faqs: [
      { q: '\u0643\u0645 \u064a\u0633\u062a\u063a\u0631\u0642 \u0646\u0634\u0631 \u0625\u0639\u0644\u0627\u0646 \u0633\u064a\u0627\u0631\u062a\u064a\u061f', a: '\u0628\u0639\u062f \u0627\u0633\u062a\u0644\u0627\u0645 \u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0633\u064a\u0627\u0631\u0629 \u0648\u0627\u0644\u0635\u0648\u0631 \u0648\u0625\u064a\u0635\u0627\u0644 \u0627\u0644\u062f\u0641\u0639 - \u0633\u064a\u062a\u0645 \u0646\u0634\u0631 \u0633\u064a\u0627\u0631\u062a\u0643 \u062e\u0644\u0627\u0644 24 \u0633\u0627\u0639\u0629 \u0639\u0645\u0644.' },
      { q: '\u0647\u0644 \u064a\u0645\u0643\u0646 \u0627\u0644\u0625\u0639\u0644\u0627\u0646 \u0639\u0646 \u0633\u064a\u0627\u0631\u0629 \u0642\u062f\u064a\u0645\u0629\u061f', a: '\u0646\u0639\u0645! \u0646\u064f\u0639\u0644\u0646 \u0639\u0646 \u062c\u0645\u064a\u0639 \u0623\u0646\u0648\u0627\u0639 \u0648\u0645\u0648\u062f\u064a\u0644\u0627\u062a \u0627\u0644\u0633\u064a\u0627\u0631\u0627\u062a. \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u0641\u0642\u0637 \u0635\u0648\u0631 \u062c\u064a\u062f\u0629 \u0648\u062a\u0641\u0627\u0635\u064a\u0644 \u062f\u0642\u064a\u0642\u0629.' },
      { q: '\u0643\u064a\u0641 \u064a\u062a\u0645 \u0627\u0644\u062f\u0641\u0639\u061f', a: '\u0627\u0644\u062f\u0641\u0639 \u0639\u0628\u0631 Bit \u0623\u0648 PayBox\u060c \u062a\u062d\u0648\u064a\u0644 \u0633\u0631\u064a\u0639 \u0648\u0622\u0645\u0646. \u0628\u0639\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645 \u064a\u0628\u062f\u0623 \u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u0646\u0634\u0631.' },
      { q: '\u0645\u0627\u0630\u0627 \u0644\u0648 \u0644\u0645 \u062a\u064f\u0628\u0627\u0639 \u0627\u0644\u0633\u064a\u0627\u0631\u0629\u061f', a: '\u0633\u0646\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0644\u0645\u0631\u0627\u062c\u0639\u0629 \u062e\u064a\u0627\u0631\u0627\u062a \u0632\u064a\u0627\u062f\u0629 \u0627\u0644\u062a\u0639\u0631\u0636. \u0646\u062d\u0646 \u0647\u0646\u0627 \u0644\u0644\u0645\u0633\u0627\u0639\u062f\u0629 \u062d\u062a\u0649 \u0625\u062a\u0645\u0627\u0645 \u0627\u0644\u0635\u0641\u0642\u0629.' },
      { q: '\u0647\u0644 \u064a\u0645\u0643\u0646\u0646\u064a \u0645\u062a\u0627\u0628\u0639\u0629 \u0637\u0644\u0628\u064a\u061f', a: '\u0628\u0627\u0644\u062a\u0623\u0643\u064a\u062f! \u0628\u0639\u062f \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628 \u0633\u062a\u062d\u0635\u0644 \u0639\u0644\u0649 \u0631\u0642\u0645 \u0637\u0644\u0628 \u0641\u0631\u064a\u062f \u064a\u0645\u0643\u0646\u0643 \u0645\u0646 \u062e\u0644\u0627\u0644\u0647 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u062d\u0627\u0644\u0629 \u0641\u064a \u0623\u064a \u0648\u0642\u062a.' },
      { q: '\u0645\u0627 \u0627\u0644\u0641\u0631\u0642 \u0628\u064a\u0646 \u0627\u0644\u0628\u0627\u0642\u0627\u062a\u061f', a: '\u0627\u0644\u0641\u0631\u0642 \u0627\u0644\u0631\u0626\u064a\u0633\u064a \u0641\u064a \u0639\u062f\u062f \u0627\u0644\u0635\u0648\u0631 \u0648\u0645\u062f\u0629 \u0627\u0644\u0646\u0634\u0631 \u0648\u0646\u0648\u0639 \u0627\u0644\u062a\u0635\u0645\u064a\u0645 \u0648\u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u062a\u0631\u0648\u064a\u062c.' },
    ],
    pages: {
      terms: { title: '\u0644\u0627\u0626\u062d\u0629 \u0627\u0644\u0645\u0648\u0642\u0639', content: '1. \u0639\u0627\u0645\n\u064a\u0648\u063a\u0648 \u0625\u0633\u0631\u0627\u0626\u064a\u0644 \u062a\u0642\u062f\u0645 \u062e\u062f\u0645\u0627\u062a \u0625\u0639\u0644\u0627\u0646 \u0639\u0644\u0649 \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a.' },
      privacy: { title: '\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629', content: '1. \u062c\u0645\u0639 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a\n\u0646\u062c\u0645\u0639 \u0628\u064a\u0627\u0646\u0627\u062a \u0634\u062e\u0635\u064a\u0629 \u0644\u062a\u0642\u062f\u064a\u0645 \u0627\u0644\u062e\u062f\u0645\u0629 \u0641\u0642\u0637.' },
      about: { title: '\u0645\u0646 \u0646\u062d\u0646', content: '\u064a\u0648\u063a\u0648 \u0625\u0633\u0631\u0627\u0626\u064a\u0644 \u0647\u064a \u0645\u0646\u0635\u0629 \u0627\u0644\u062a\u0633\u0648\u064a\u0642 \u0627\u0644\u0631\u0642\u0645\u064a \u0627\u0644\u0631\u0627\u0626\u062f\u0629 \u0644\u0628\u064a\u0639 \u0627\u0644\u0633\u064a\u0627\u0631\u0627\u062a \u0641\u064a \u0625\u0633\u0631\u0627\u0626\u064a\u0644.' }
    }
  }
};

// \u2500\u2500\u2500 STATUS HELPER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const getStatusInfo = (status) => {
  switch (status) {
    case 'Published': return { label: '\u05e4\u05d5\u05e8\u05e1\u05dd \u2713', labelAr: '\u062a\u0645 \u0627\u0644\u0646\u0634\u0631 \u2713', color: '#22c55e', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.3)' };
    case 'Payment Verified': return { label: '\u05ea\u05e9\u05dc\u05d5\u05dd \u05d0\u05d5\u05e9\u05e8', labelAr: '\u062a\u0645 \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u062f\u0641\u0639', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)' };
    case 'Rejected': return { label: '\u05e0\u05d3\u05d7\u05d4', labelAr: '\u0645\u0631\u0641\u0648\u0636', color: '#ef4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)' };
    default: return { label: '\u05de\u05de\u05ea\u05d9\u05df \u05dc\u05d1\u05d3\u05d9\u05e7\u05d4', labelAr: '\u0642\u064a\u062f \u0627\u0644\u0645\u0631\u0627\u062c\u0639\u0629', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)' };
  }
};

// \u2500\u2500\u2500 NAVBAR \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const Navbar = ({ lang, setLang, isAdmin, onLogout, siteSettings, setView }) => {
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(8,6,10,0.92)' : 'rgba(8,6,10,0.6)',
      backdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid rgba(200,16,46,0.15)' : '1px solid rgba(255,255,255,0.04)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, background: 'linear-gradient(135deg,#c8102e,#8b0011)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(200,16,46,0.35)' }}>
            <Car size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, letterSpacing: '-0.5px', color: '#fff', lineHeight: 1 }}>
              YOUGO <span style={{ color: '#c8102e' }}>ISRAEL</span>
            </div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.04em', lineHeight: 1, marginTop: 2 }}>
              {siteSettings?.positioning_line_he || t.positioningLine}
            </div>
          </div>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div style={{ display: 'flex', gap: 28 }}>
            {[
              { label: '\u05d0\u05d9\u05da \u05d6\u05d4 \u05e2\u05d5\u05d1\u05d3', href: '#how-it-works' },
              { label: '\u05d7\u05d1\u05d9\u05dc\u05d5\u05ea', href: '#packages' },
            ].map((l, i) => (
              <a key={i} href={l.href} style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#c8102e'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>
                {l.label}
              </a>
            ))}
            <button onClick={() => setView('check-status')} style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 6 }}
              onMouseEnter={e => e.target.style.color = '#c8102e'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>
              <Search size={13} />
              \u05d1\u05d3\u05d9\u05e7\u05ea \u05e1\u05d8\u05d8\u05d5\u05e1
            </button>
          </div>

          <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.08)' }} />

          <button onClick={() => setLang(lang === 'he' ? 'ar' : 'he')} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: 20, cursor: 'pointer' }}>
            <Globe size={13} />
            {lang === 'he' ? '\u0627\u0644\u0639\u0631\u0628\u064a\u0629' : '\u05e2\u05d1\u05e8\u05d9\u05ea'}
          </button>

          {isAdmin && (
            <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}>
              <LogOut size={15} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

// \u2500\u2500\u2500 BIT / PAYBOX LOGOS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const BitLogo = ({ size = 'md' }) => {
  const h = size === 'sm' ? 26 : size === 'lg' ? 38 : 30;
  const fs = size === 'sm' ? 12 : size === 'lg' ? 17 : 14;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, overflow: 'hidden', background: '#0D3D3D', height: h, padding: '0 12px', gap: 5 }}>
      <svg width={fs * 0.5} height={h * 0.65} viewBox="0 0 9 18" fill="none">
        <circle cx="4.5" cy="2" r="2" fill="#00E5CC"/>
        <rect x="2.5" y="6" width="4" height="10" rx="2" fill="#00E5CC"/>
      </svg>
      <span style={{ fontWeight: 800, fontSize: fs, color: '#00E5CC', letterSpacing: '-0.5px' }}>bit</span>
    </div>
  );
};

const PayBoxLogo = ({ size = 'md' }) => {
  const h = size === 'sm' ? 26 : size === 'lg' ? 38 : 30;
  const fs = size === 'sm' ? 10 : size === 'lg' ? 15 : 12;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, overflow: 'hidden', background: '#29ABE2', height: h, padding: '0 12px', gap: 6 }}>
      <svg width={fs} height={fs} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="6" r="3" stroke="white" strokeWidth="2.5" fill="none"/>
        <path d="M5 10 L9 14 L9 20 L15 20 L15 14 L19 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
      <span style={{ fontWeight: 700, fontSize: fs, color: '#fff' }}>PayBox</span>
    </div>
  );
};

// \u2500\u2500\u2500 BUSINESS BANNER \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const BusinessBanner = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    style={{
      borderRadius: 24,
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.07)',
      background: 'linear-gradient(135deg, #0d0d0f 0%, #12090a 100%)',
      position: 'relative'
    }}
  >
    {/* Decorative accent */}
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #c8102e 40%, #ff6b35 70%, transparent)' }} />
    <div style={{ position: 'absolute', top: 0, right: 0, width: 300, height: 300, background: 'radial-gradient(circle, rgba(200,16,46,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

    <div style={{ padding: '40px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(200,16,46,0.12)', border: '1px solid rgba(200,16,46,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Building2 size={26} color="#c8102e" />
        </div>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,16,46,0.1)', border: '1px solid rgba(200,16,46,0.2)', borderRadius: 20, padding: '4px 14px', marginBottom: 10 }}>
            <span style={{ fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#c8102e' }}>\u05dc\u05e1\u05d5\u05db\u05e0\u05d5\u05d9\u05d5\u05ea \u05d5\u05de\u05d2\u05e8\u05e9\u05d9\u05dd</span>
          </div>
          <h3 style={{ fontSize: 28, fontWeight: 900, color: '#fff', margin: '0 0 8px', lineHeight: 1.1 }}>
            \u05d7\u05d1\u05d9\u05dc\u05ea <span style={{ color: '#c8102e' }}>BUSINESS</span> \u05dc\u05e2\u05e1\u05e7\u05d9\u05dd
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0, maxWidth: 420 }}>
            \u05de\u05e0\u05d4\u05dc\u05d9\u05dd \u05de\u05d2\u05e8\u05e9 \u05e8\u05db\u05d1\u05d9\u05dd \u05d0\u05d5 \u05e1\u05d5\u05db\u05e0\u05d5\u05ea? \u05e7\u05d1\u05dc\u05d5 \u05e4\u05e8\u05e1\u05d5\u05dd \u05dc\u05d1\u05dc\u05d9 \u05de\u05d2\u05d1\u05dc\u05d4 \u2014 \u05e2\u05d3 50 \u05e8\u05db\u05d1\u05d9\u05dd \u05d1\u05d7\u05d5\u05d3\u05e9, \u05e0\u05d9\u05d4\u05d5\u05dc \u05d9\u05d9\u05e2\u05d5\u05d3\u05d9, \u05d3\u05d5\u05d7\u05d5\u05ea \u05d7\u05e9\u05d9\u05e4\u05d4 \u05d7\u05d5\u05d3\u05e9\u05d9\u05d9\u05dd, \u05d5\u05de\u05e0\u05d4\u05dc \u05ea\u05d9\u05e7 \u05d0\u05d9\u05e9\u05d9 \u05e9\u05d6\u05de\u05d9\u05df \u05dc\u05db\u05dd 24/7.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
            {['\u05e4\u05e8\u05e1\u05d5\u05dd \u05dc\u05dc\u05d0 \u05d4\u05d2\u05d1\u05dc\u05d4', '\u05de\u05e0\u05d4\u05dc \u05ea\u05d9\u05e7 \u05d0\u05d9\u05e9\u05d9', '\u05d3\u05d5\u05d7\u05d5\u05ea \u05d7\u05d5\u05d3\u05e9\u05d9\u05d9\u05dd', '\u05ea\u05de\u05d7\u05d5\u05e8 \u05de\u05d5\u05ea\u05d0\u05dd'].map((tag, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 700 }}>
                <Check size={12} color="#c8102e" />
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
        <a href="https://wa.me/972546980606?text=\u05e9\u05dc\u05d5\u05dd, \u05d0\u05e0\u05d9 \u05de\u05e2\u05d5\u05e0\u05d9\u05d9\u05df \u05d1\u05d7\u05d1\u05d9\u05dc\u05ea \u05e2\u05e1\u05e7\u05d9\u05dd \u05dc\u05e1\u05d5\u05db\u05e0\u05d5\u05ea \u05e9\u05dc\u05d9" target="_blank" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'linear-gradient(135deg, #c8102e, #a50d25)',
          color: '#fff', fontWeight: 900, fontSize: 14,
          padding: '14px 28px', borderRadius: 14, textDecoration: 'none',
          boxShadow: '0 8px 24px rgba(200,16,46,0.35)',
          whiteSpace: 'nowrap'
        }}>
          <MessageSquare size={18} />
          \u05d3\u05d1\u05e8\u05d5 \u05d0\u05d9\u05ea\u05e0\u05d5 \u05d1\u05d5\u05d5\u05d0\u05d8\u05e1\u05d0\u05e4
        </a>
        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontWeight: 700, textAlign: 'center', margin: 0 }}>\u05dc\u05dc\u05d0 \u05d3\u05de\u05d9 \u05db\u05e0\u05d9\u05e1\u05d4 \u00b7 \u05ea\u05de\u05d7\u05d5\u05e8 \u05d0\u05d9\u05e9\u05d9</p>
      </div>
    </div>
  </motion.div>
);

// \u2500\u2500\u2500 PACKAGE CARD \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const PackageCard = ({ pkg, lang, onSelect }) => {
  const t = translations[lang];
  const configs = {
    basic:   { accent: '#94a3b8', glow: 'rgba(148,163,184,0.08)', badge: '\ud83d\ude80', bg: 'rgba(8,8,12,1)', borderC: 'rgba(148,163,184,0.15)' },
    pro:     { accent: '#c8102e', glow: 'rgba(200,16,46,0.12)',   badge: '\u2b50', bg: 'rgba(12,5,7,1)',  borderC: 'rgba(200,16,46,0.35)'    },
    premium: { accent: '#c8102e', glow: 'rgba(200,16,46,0.18)',   badge: '\ud83d\udc8e', bg: 'rgba(12,4,6,1)',  borderC: 'rgba(200,16,46,0.5)'     },
  };
  const c = configs[pkg.id] || configs.basic;

  return (
    <motion.div whileHover={{ y: -8, scale: 1.01 }} transition={{ type: 'spring', stiffness: 300 }}
      style={{ background: c.bg, border: `1px solid ${c.borderC}`, borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', boxShadow: `0 0 30px ${c.glow}`, position: 'relative', minWidth: 280 }}>
      <div style={{ height: 3, background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)` }} />
      {pkg.popular && (
        <div style={{ position: 'absolute', top: 16, right: 16, background: c.accent, color: '#fff', fontSize: 9, fontWeight: 900, padding: '4px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {t.mostPopular}
        </div>
      )}
      <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80', fontSize: 9, fontWeight: 900, padding: '4px 10px', borderRadius: 20 }}>
        15% OFF
      </div>

      <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', gap: 18, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: `rgba(${c.accent === '#c8102e' ? '200,16,46' : '148,163,184'},0.1)`, border: `1px solid ${c.borderC}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
            {c.badge}
          </div>
          <div>
            <h3 style={{ fontWeight: 900, fontSize: 17, color: c.accent === '#c8102e' ? '#fff' : '#fff', margin: 0 }}>{pkg.name}</h3>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
              {pkg.id === 'basic' ? t.packageSubtitles.basic : pkg.id === 'pro' ? t.packageSubtitles.pro : t.packageSubtitles.premium}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 36, fontWeight: 900, color: '#fff' }}>{pkg.price}</span>
          <span style={{ fontSize: 12, textDecoration: 'line-through', color: 'rgba(255,255,255,0.25)' }}>
            \u20aa{Math.round(parseInt(pkg.price.replace('\u20aa', '')) / 0.85)}
          </span>
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${c.borderC}, transparent)` }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {pkg.features.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: `rgba(${c.accent === '#c8102e' ? '200,16,46' : '148,163,184'},0.12)`, border: `1px solid ${c.borderC}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Check size={9} strokeWidth={3} color={c.accent} />
              </div>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{f}</span>
            </div>
          ))}
        </div>

        <button onClick={() => onSelect(pkg)} style={{
          width: '100%', padding: '13px 0', borderRadius: 12, fontWeight: 900, fontSize: 13,
          background: c.accent === '#c8102e' ? 'linear-gradient(135deg,#c8102e,#a50d25)' : 'rgba(255,255,255,0.9)',
          color: c.accent === '#c8102e' ? '#fff' : '#0a0a0c',
          border: 'none', cursor: 'pointer', transition: 'all 0.2s', boxShadow: c.accent === '#c8102e' ? '0 6px 20px rgba(200,16,46,0.3)' : 'none'
        }}>
          {t.startOrder}
        </button>
      </div>
    </motion.div>
  );
};

// \u2500\u2500\u2500 VIP CARD \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const VIPCard = ({ onSelect }) => (
  <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 280 }}
    style={{ background: 'radial-gradient(circle at 100% 0%, #2a1f0a, #0f0c05 80%)', borderRadius: 20, border: '1px solid rgba(212,175,55,0.25)', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', boxShadow: '0 20px 40px -15px rgba(212,175,55,0.25)', position: 'relative', minWidth: 280 }}>
    <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }} />
    <div style={{ padding: '28px 28px 32px', display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: 20, padding: '5px 14px' }}>
          <Crown size={12} color="#d4af37" />
          <span style={{ fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#d4af37' }}>VIP LUXURY</span>
        </div>
        <div style={{ display: 'flex' }}>
          {[...Array(5)].map((_, i) => <Star key={i} size={12} color="#d4af37" fill="#d4af37" />)}
        </div>
        <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 20, padding: '4px 10px' }}>
          <span style={{ fontSize: 9, fontWeight: 900, color: '#4ade80' }}>15% \u05d4\u05e0\u05d7\u05d4</span>
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: 32, fontWeight: 900, background: 'linear-gradient(135deg, #d4af37, #f5d876, #b8922a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 6px' }}>VIP LUXURY</h3>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, margin: 0 }}>\u05d7\u05d1\u05d9\u05dc\u05ea \u05d4\u05e4\u05e8\u05e1\u05d5\u05dd \u05d4\u05d0\u05d5\u05dc\u05d8\u05d9\u05de\u05d8\u05d9\u05d1\u05d9\u05ea \u2014 \u05dc\u05e8\u05db\u05d1\u05d9\u05dd \u05e9\u05de\u05d2\u05d9\u05e2\u05d9\u05dd \u05dc\u05d9\u05d7\u05e1 \u05d4\u05db\u05d9 \u05d8\u05d5\u05d1.</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <span style={{ fontSize: 40, fontWeight: 900, color: '#d4af37' }}>\u20aa749</span>
        <span style={{ fontSize: 14, textDecoration: 'line-through', color: 'rgba(255,255,255,0.2)' }}>\u20aa882</span>
      </div>
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, flex: 1 }}>
        {[['15+ \u05ea\u05de\u05d5\u05e0\u05d5\u05ea', Camera], ['\u05e8\u05d9\u05dc\u05e1 + \u05e1\u05d8\u05d5\u05e8\u05d9 VIP', Video], ['60 \u05d9\u05de\u05d9 \u05e4\u05e8\u05e1\u05d5\u05dd', Calendar], ['\u05d7\u05e9\u05d9\u05e4\u05d4 \u05de\u05e7\u05e1\u05d9\u05de\u05dc\u05d9\u05ea', TrendingUp], ['\u05dc\u05d9\u05d5\u05d5\u05d9 \u05d0\u05d9\u05e9\u05d9 24/7', ShieldCheck], ['\u05e2\u05d9\u05e6\u05d5\u05d1 VIP \u05d1\u05dc\u05e2\u05d3\u05d9', Crown], ['\u05d8\u05e8\u05d2\u05d5\u05d8 \u05de\u05ea\u05e7\u05d3\u05dd', Users], ['\u05e2\u05d3\u05d9\u05e4\u05d5\u05ea \u05e8\u05d0\u05e9\u05d5\u05e0\u05d4', Zap]].map(([label, Icon], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '8px 10px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Icon size={12} color="#d4af37" />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{label}</span>
          </div>
        ))}
      </div>
      <button onClick={() => onSelect({ id: 'vip', name: 'VIP LUXURY', price: '\u20aa749', features: [] })} style={{ width: '100%', padding: '14px 0', borderRadius: 14, fontWeight: 900, fontSize: 14, background: 'linear-gradient(135deg, #d4af37, #b8922a)', color: '#000', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Crown size={17} />
        \u05d4\u05d6\u05de\u05df VIP \u05e2\u05db\u05e9\u05d9\u05d5
      </button>
    </div>
  </motion.div>
);

// \u2500\u2500\u2500 DUO CARD \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const DuoCard = ({ onSelect }) => (
  <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 280 }}
    style={{ background: 'radial-gradient(circle at 100% 0%, #1e1428, #0b0710 100%)', borderRadius: 20, border: '1px solid rgba(139,92,246,0.25)', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', boxShadow: '0 20px 40px -15px rgba(139,92,246,0.2)', position: 'relative', minWidth: 280 }}>
    <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #a78bfa, transparent)' }} />
    <div style={{ padding: '28px 28px 32px', display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 20, padding: '5px 14px' }}>
          <Car size={11} color="#a78bfa" /><Car size={11} color="#a78bfa" />
          <span style={{ fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#a78bfa' }}>DUO DEAL</span>
        </div>
        <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 20, padding: '4px 10px' }}>
          <span style={{ fontSize: 9, fontWeight: 900, color: '#4ade80' }}>\u05d7\u05d9\u05e1\u05db\u05d5\u05df 40%</span>
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: 32, fontWeight: 900, background: 'linear-gradient(135deg, #c4b5fd, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 6px' }}>DUO DEAL</h3>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6, margin: 0 }}>\u05de\u05d5\u05db\u05e8\u05d9\u05dd 2 \u05e8\u05db\u05d1\u05d9\u05dd? \u05e7\u05d1\u05dc\u05d5 \u05d7\u05e9\u05d9\u05e4\u05d4 \u05db\u05e4\u05d5\u05dc\u05d4 \u05d1\u05de\u05d7\u05d9\u05e8 \u05e9\u05dc\u05d0 \u05ea\u05de\u05e6\u05d0\u05d5 \u05d1\u05e9\u05d5\u05dd \u05de\u05e7\u05d5\u05dd.</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <span style={{ fontSize: 40, fontWeight: 900, color: '#a78bfa' }}>\u20aa349</span>
        <span style={{ fontSize: 14, textDecoration: 'line-through', color: 'rgba(255,255,255,0.2)' }}>\u20aa598</span>
        <span style={{ fontSize: 10, fontWeight: 900, background: 'rgba(139,92,246,0.15)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.3)', padding: '3px 10px', borderRadius: 20 }}>\u05d7\u05d9\u05e1\u05db\u05d5\u05df \u20aa249</span>
      </div>
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
        {['\u05e4\u05e8\u05e1\u05d5\u05dd 2 \u05e8\u05db\u05d1\u05d9\u05dd \u05d1\u05de\u05d7\u05d9\u05e8 \u05de\u05d9\u05d5\u05d7\u05d3', '4 \u05ea\u05de\u05d5\u05e0\u05d5\u05ea \u05dc\u05db\u05dc \u05e8\u05db\u05d1', '\u05e4\u05d5\u05e1\u05d8 \u05e0\u05e4\u05e8\u05d3 \u05dc\u05db\u05dc \u05e8\u05db\u05d1', '\u05e1\u05d8\u05d5\u05e8\u05d9 14 \u05d9\u05d5\u05dd \u05dc\u05db\u05dc \u05d0\u05d7\u05d3', '\u05d7\u05e9\u05d9\u05e4\u05d4 \u05db\u05e4\u05d5\u05dc\u05d4 \u05dc\u05e7\u05d4\u05dc \u05de\u05e2\u05d5\u05e0\u05d9\u05d9\u05df'].map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 17, height: 17, borderRadius: '50%', background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Check size={9} strokeWidth={3} color="#a78bfa" />
            </div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{f}</span>
          </div>
        ))}
      </div>
      <button onClick={() => onSelect({ id: 'duo', name: 'DUO DEAL', price: '\u20aa349', features: [] })} style={{ width: '100%', padding: '14px 0', borderRadius: 14, fontWeight: 900, fontSize: 14, background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Car size={17} />
        \u05d4\u05d6\u05de\u05df DUO \u05e2\u05db\u05e9\u05d9\u05d5
      </button>
    </div>
  </motion.div>
);

// \u2500\u2500\u2500 EQUIPMENT CARD \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const EquipmentCard = ({ pkg, onSelect }) => {
  const heavy = pkg.id === 'equipment-heavy';
  const ac = heavy ? '#ea580c' : '#94a3b8';
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300 }}
      style={{ background: heavy ? 'linear-gradient(135deg, rgba(234,88,12,0.06), #0f0c08 100%)' : 'linear-gradient(135deg, rgba(100,116,139,0.06), #0a0c0f 100%)', borderRadius: 20, border: `1px solid ${heavy ? 'rgba(234,88,12,0.3)' : 'rgba(100,116,139,0.2)'}`, display: 'flex', flexDirection: 'column', padding: '28px', gap: 20, height: '100%', position: 'relative', minWidth: 280 }}>
      {heavy && <div style={{ position: 'absolute', top: -12, right: 20, background: '#ea580c', color: '#fff', fontSize: 9, fontWeight: 900, padding: '4px 12px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.1em' }}>\u05d4\u05db\u05d9 \u05de\u05d1\u05d5\u05e7\u05e9</div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderBottom: `1px solid ${heavy ? 'rgba(234,88,12,0.12)' : 'rgba(100,116,139,0.1)'}`, paddingBottom: 18 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: heavy ? 'rgba(234,88,12,0.12)' : 'rgba(100,116,139,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {heavy ? <Truck size={22} color="#ea580c" /> : <Wrench size={22} color="#94a3b8" />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.18em', color: ac, marginBottom: 3 }}>{heavy ? '\u05e6\u05d9\u05d5\u05d3 \u05db\u05d1\u05d3' : '\u05e6\u05d9\u05d5\u05d3 \u05e7\u05dc'}</div>
          <h3 style={{ fontSize: 16, fontWeight: 900, color: '#fff', margin: 0 }}>{pkg.name}</h3>
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#fff' }}>{pkg.price}</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {(heavy ? ['\u05d1\u05d0\u05d2\u05e8', '\u05de\u05d7\u05e4\u05e8\u05d5\u05df', '\u05d1\u05d5\u05dc\u05d3\u05d5\u05d6\u05e8', '\u05e2\u05d2\u05d5\u05e8\u05df', '\u05de\u05d9\u05e0\u05d9 \u05d1\u05d0\u05d2\u05e8'] : ['\u05e4\u05d5\u05e4\u05e7\u05d8', '\u05d2\'\u05e7', '\u05de\u05dc\u05d2\u05d6\u05d4', '\u05e1\u05e7\u05d9\u05d3', '\u05de\u05e2\u05e8\u05d1\u05dc']).map((t, i) => (
          <span key={i} style={{ fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 20, border: `1px solid ${heavy ? 'rgba(234,88,12,0.2)' : 'rgba(100,116,139,0.18)'}`, background: heavy ? 'rgba(234,88,12,0.06)' : 'rgba(100,116,139,0.05)', color: ac }}>{t}</span>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
        {pkg.features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: ac, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Check size={8} strokeWidth={4} color="#fff" />
            </div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{f}</span>
          </div>
        ))}
      </div>
      <button onClick={() => onSelect(pkg)} style={{ width: '100%', padding: '13px 0', borderRadius: 12, fontWeight: 900, fontSize: 13, background: heavy ? 'linear-gradient(135deg,#ea580c,#c2410c)' : 'rgba(100,116,139,0.18)', color: heavy ? '#fff' : '#cbd5e1', border: heavy ? 'none' : '1px solid rgba(100,116,139,0.25)', cursor: 'pointer' }}>
        {heavy ? '\ud83d\ude9c \u05d4\u05d6\u05de\u05df \u05e2\u05db\u05e9\u05d9\u05d5' : '\ud83d\udd27 \u05d4\u05d6\u05de\u05df \u05e2\u05db\u05e9\u05d9\u05d5'}
      </button>
    </motion.div>
  );
};

// \u2500\u2500\u2500 STEP INDICATOR \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const StepIndicator = ({ step }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 32 }}>
    {[
      { num: 1, label: '\u05e4\u05e8\u05d8\u05d9 \u05d4\u05e8\u05db\u05d1 \u05d5\u05d4\u05de\u05d5\u05db\u05e8' },
      { num: 2, label: '\u05ea\u05e9\u05dc\u05d5\u05dd \u05d5\u05d0\u05d9\u05e9\u05d5\u05e8' }
    ].map((s, i) => (
      <React.Fragment key={i}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: step >= s.num ? 'linear-gradient(135deg,#c8102e,#a50d25)' : 'rgba(255,255,255,0.06)',
            border: step >= s.num ? 'none' : '1px solid rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: step >= s.num ? '#fff' : 'rgba(255,255,255,0.3)',
            fontWeight: 900, fontSize: 14, boxShadow: step >= s.num ? '0 4px 16px rgba(200,16,46,0.35)' : 'none',
            transition: 'all 0.3s'
          }}>
            {step > s.num ? <Check size={18} strokeWidth={3} /> : s.num}
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: step >= s.num ? '#c8102e' : 'rgba(255,255,255,0.25)', textAlign: 'center', maxWidth: 90, lineHeight: 1.3 }}>{s.label}</span>
        </div>
        {i < 1 && (
          <div style={{ width: 80, height: 2, background: step >= 2 ? '#c8102e' : 'rgba(255,255,255,0.08)', transition: 'background 0.3s', margin: '0 4px', marginBottom: 22 }} />
        )}
      </React.Fragment>
    ))}
  </div>
