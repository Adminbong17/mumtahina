import json
import os

db_path = os.path.join(os.getcwd(), 'data', 'db.json')

with open(db_path, 'r', encoding='utf-8') as f:
    db = json.load(f)

# Update compCardImages with real downloaded images
db['profile']['compCardImages'] = {
    "headshot": "/uploads/mumtahina_shoot_3.jpg",
    "profile": "/uploads/mumtahina_shoot_2.jpg",
    "fullBody": "/uploads/mumtahina_shoot_1.jpg",
    "fashion": "/uploads/mumtahina_shoot_4.jpg"
}

# Real image mapping for portfolio
real_mapping = [
    ("/uploads/mumtahina_shoot_1.jpg", "Royal Crimson Jamdani", "bridal"),
    ("/uploads/mumtahina_shoot_2.jpg", "Nocturne Velvet Couture", "editorial"),
    ("/uploads/mumtahina_shoot_3.jpg", "Golden Hour Prêt", "commercial"),
    ("/uploads/mumtahina_shoot_4.jpg", "Dhaka Fashion Week Runway", "runway"),
    ("/uploads/mumtahina_shoot_5.jpg", "Rose Quartz & Dew Beauty", "beauty"),
    ("/uploads/mumtahina_shoot_6.jpg", "Ivory Silk Muslin", "bridal"),
    ("/uploads/mumtahina_shoot_7.jpg", "Cyberpunk Dhaka Streetwear", "editorial"),
    ("/uploads/mumtahina_shoot_9.jpg", "Aura of Saffron & Gold", "commercial"),
    ("/uploads/mumtahina_shoot_10.jpg", "Luminescent Glow Portrait", "beauty"),
]

for idx, (img_url, title, cat) in enumerate(real_mapping):
    if idx < len(db['portfolio']):
        db['portfolio'][idx]['imageUrl'] = img_url
        db['portfolio'][idx]['title'] = title
        db['portfolio'][idx]['category'] = cat

with open(db_path, 'w', encoding='utf-8') as f:
    json.dump(db, f, indent=2, ensure_ascii=False)

print("db.json successfully updated with real images of Mumtahina!")
