import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db: any;

try {
  db = new Database("orders.db");
  // Initialize database
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      package_name TEXT,
      full_name TEXT,
      phone TEXT,
      car_model TEXT,
      car_year TEXT,
      car_mileage TEXT,
      car_price TEXT,
      car_registration TEXT,
      car_test_until TEXT,
      location TEXT,
      payment_proof TEXT,
      car_images TEXT, -- JSON array of base64 or paths
      status TEXT DEFAULT 'Pending Review',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    -- Set starting ID for orders if table is empty
    INSERT OR IGNORE INTO sqlite_sequence (name, seq) VALUES ('orders', 2379);
  `);

  // Initialize default settings
  const defaultSettings = {
    followers_count: '50K+',
    whatsapp_number: '972546980606',
    hero_title_he: 'מוכרים רכב? אנחנו מוכרים אותו מהר יותר.',
    hero_subtitle_he: 'YOUGO ISRAEL - פלטפורמת השיווק המובילה באינסטגרם למכירת רכבים.',
    positioning_line_he: 'הפרסום שמוכר רכבים – לא רק מציג אותם.'
  };

  Object.entries(defaultSettings).forEach(([key, value]) => {
    db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)').run(key, value);
  });
} catch (err) {
  console.error("Database initialization error:", err);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use(express.json({ limit: '50mb' }));

  // API Routes
  app.post("/api/orders", (req, res) => {
    const {
      packageName, fullName, phone, model, year, mileage, price,
      registration, testUntil, location, paymentProof, carImages
    } = req.body;

    try {
      const stmt = db.prepare(`
        INSERT INTO orders (
          package_name, full_name, phone, car_model, car_year, 
          car_mileage, car_price, car_registration, car_test_until, 
          location, payment_proof, car_images
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const info = stmt.run(
        packageName, fullName, phone, model, year, 
        mileage, price, registration, testUntil, 
        location, paymentProof, JSON.stringify(carImages)
      );

      res.json({ success: true, orderId: info.lastInsertRowid.toString() });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === "Hamdan5500@") {
      res.json({ success: true, token: "admin-token-123" });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });

  app.get("/api/admin/orders", (req, res) => {
    // In a real app, check token
    const orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
    res.json(orders);
  });

  app.patch("/api/admin/orders/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update status" });
    }
  });

  app.get("/api/orders/:id", (req, res) => {
    const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  });

  app.get('/api/settings', (req, res) => {
    const settings = db.prepare('SELECT * FROM settings').all();
    const settingsMap = settings.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsMap);
  });

  app.patch('/api/admin/settings', (req, res) => {
    const updates = req.body;
    const stmt = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');
    
    const transaction = db.transaction((data) => {
      for (const [key, value] of Object.entries(data)) {
        stmt.run(key, value);
      }
    });

    transaction(updates);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
