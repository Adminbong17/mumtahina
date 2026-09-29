import urllib.request
import os

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Referer': 'https://urlebird.com/',
}

output_dir = os.path.join(os.getcwd(), 'public', 'uploads')
os.makedirs(output_dir, exist_ok=True)

urls = [
    # 720x720 profile avatar
    ('mumtahina_avatar_real.webp', 'https://p16-va.tiktokcdn.com/tos-alisg-avt-0068/be4e5f5e8a61384bf5d5fb0239e14600~tplv-tiktokx-cropcenter:720:720.webp'),
    ('mumtahina_shoot_1.jpg', 'https://i.axod.net/zcEQ6PySxIcTVefK3kp9EvDydzf4LiDQsDnXfW-tySPdgh9ksfT447Jxbifb8ONHbZ_NijrBUZ3PYZiAF-2JTDfFNWr4JdKD3k5Y8zyUMBEBxEAYDHw1LOjP1I1_CVr75xQNzr0S_E29OFGaj3Io2Wjd5_rVZQji.jpeg'),
    ('mumtahina_shoot_2.jpg', 'https://i.axod.net/zcEQ9L2S2IcTVe9dcFN8Euxy8TLyRKt2OG8kcVYoWaYr39QTBWniMTkD8uymuXTakeazuYWzgLrUm-xbRciw08TlizobfCDUg7pkVMsO9fd7xS0u6C1XBDvawS6xhLgaVKs94t3XFeKeT7tCWNuACQDekA76LKeS.jpeg'),
    ('mumtahina_shoot_3.jpg', 'https://i.axod.net/zcEa9PySxIcCUcd2G6WjV_zrEY_znJvhqKWjoQcOqbY3-cIUTKdg_wz0SuFban19mXqbqyLfNHO-pCIvVp0voSVxoZzoYxqzkxQdVWaF6jds_Yx7u0oGkBEsMA9rHY_-Px9LMAbwujdXedZTYkLxySLzfRG26elFYw.jpeg'),
    ('mumtahina_shoot_4.jpg', 'https://i.axod.net/pcaQ6P2SzIczZbDp4OEbJCJLUCrlzoeeyIRE6vD6NU2F9h-uVHczFq5PYxPhhxdpWEl3KR00X6gxqGZ2XHMreugivKlJPc1A0w756K6nobMzoMgc8LVvyqbkhdpdAE-0RExYF27toL9A3RxcGT8aphpR3jhIpx9bIBO6Mw.jpeg'),
    ('mumtahina_shoot_5.jpg', 'https://i.axod.net/pcYa6L2SwIcTUXfy0MO5VgCLsYXDIXyAlNu1xPLzqTGwT75Xt7mqkPTebp5ZLy4bt-z3uPUFeY6IaH09nCgTYEkX28-AW-O7VPnwjnqGl3hsnXjts-j9zYihZZxvdH3E__zCvXRVltSK4-HyjJu7Zwq_e_LFViZwjKo.jpeg'),
    ('mumtahina_shoot_6.jpg', 'https://i.axod.net/pcaM7P2CwIczZXCL3HQS6nXuXxe5AWtwIqeT9xtJ8AkzdMP7WaAIBr8YszJ2o-JM-cZO7TAS_ML2Gkzaj6BSISNWv-S80iD4k9D9tvhaMIGtoivqsk6pIuwTxtsPgM5ihlEwpviCL5eUcmpKIY4nddQpcTlMPKH_KiAK1ck.jpeg'),
    ('mumtahina_shoot_7.jpg', 'https://i.axod.net/pcbs6P2CwMcyZfDdSZQvp3Drssw7RMWQFt6HQQUaY0S8OgykqFHGNPCL5f1pJZhTH54w4EhHFq3R75ArZ9BzCyChg-Ckd4gm0yTfnKqEcY-XYKkUB_QzI8uAWMchgmLDsXLSenfYd2uY_vVWM4pbE22ca9wjqQ4pdBg_Gw.jpeg'),
    ('mumtahina_shoot_8.jpg', 'https://i.axod.net/pcbq6L2SwIcDbfBsDdCvq74zFxo-H7ot0OqCiDCSX_xgi2YmnO8HEq5vazOhQzep8Ef7UCxvj32witSNQkQTihZRI-j3bWxHgt8f41mEQGJHZk16ViCeJqyxFaqxdoUUdkxQ7zvNso5E3FyQaedDThd_yqvLg04LqGqNLw.jpeg'),
    ('mumtahina_shoot_9.jpg', 'https://i.axod.net/pcbg7L2CxAcyZfCMtnXDutNPMzmLrbKpVlqcddhmwqDlFs3muzBXGdLL4UJ2IEIMHMX_Au97S0sSv1HZofeEqSrOnACw3uGN0vLGV-I6aiflcyJFkjxRbVQSZSAUro16BYdX0QlUwTQD8wwYkDoIE-ZgOb_fCQE2XQ.jpeg'),
    ('mumtahina_shoot_10.jpg', 'https://i.axod.net/pcbq7L2CwIcDbfARNhIG87W32z3Hj6Wo7VBxP3rggqKlFkqqvcDU7ZgZmRbFhwdEflUhDmC8bkEsMWm9zUQzilZhkEagXG-4yEC9TEftwMnP7Zw6akBoAAoujVpR9J7Kfvwc-XSNtJf94qxXZdbRA2_Ya9jb2ukUiY4.jpeg'),
]

for filename, url in urls:
    target = os.path.join(output_dir, filename)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open(target, 'wb') as f:
                f.write(data)
            print(f"Downloaded {filename}: {len(data)} bytes")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
