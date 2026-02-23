import subprocess
import time
import sys

def start_system():
    print("🚀 Starting YOUGO System...")
    
    # تشغيل تطبيق الويب
    web_app = subprocess.Popen([sys.executable, "app/app.py"])
    
    # تشغيل البوت
    bot = subprocess.Popen([sys.executable, "bot/bot_v2.py"])
    
    print("✅ Web App and Bot are running!")
    
    # ابقاء الملف يعمل لضمان عدم توقف السيرفر
    web_app.wait()
    bot.wait()

if __name__ == "__main__":
    start_system()
