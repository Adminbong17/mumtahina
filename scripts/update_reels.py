import json
import os

db_path = os.path.join(os.getcwd(), 'data', 'db.json')

with open(db_path, 'r', encoding='utf-8') as f:
    db = json.load(f)

reel_images = [
    "/uploads/mumtahina_shoot_1.jpg",
    "/uploads/mumtahina_shoot_2.jpg",
    "/uploads/mumtahina_shoot_3.jpg",
    "/uploads/mumtahina_shoot_4.jpg",
    "/uploads/mumtahina_shoot_5.jpg",
    "/uploads/mumtahina_shoot_6.jpg",
]

for idx, img in enumerate(reel_images):
    if idx < len(db['reels']):
        db['reels'][idx]['thumbnailUrl'] = img

with open(db_path, 'w', encoding='utf-8') as f:
    json.dump(db, f, indent=2, ensure_ascii=False)

print("Reels thumbnails updated!")
