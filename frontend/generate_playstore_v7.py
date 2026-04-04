#!/usr/bin/env python3
"""
Professional Play Store Screenshots Generator V7
PREMIUM STYLE - Wooden Wheel, Sparkles, Level Bar
Like the Gemini-created reference
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import os
import math
import random
import requests
from io import BytesIO

OUTPUT_DIR = "/app/frontend/assets/playstore"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def get_font(size):
    """Get a bold font"""
    try:
        return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", size)
    except:
        return ImageFont.load_default()

def download_image(url, target_width, target_height):
    """Download and resize an image"""
    try:
        print(f"    Downloading scenic background...")
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers, timeout=30)
        img = Image.open(BytesIO(response.content))
        
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Crop to fill
        img_ratio = img.width / img.height
        target_ratio = target_width / target_height
        
        if img_ratio > target_ratio:
            new_width = int(img.height * target_ratio)
            left = (img.width - new_width) // 2
            img = img.crop((left, 0, left + new_width, img.height))
        else:
            new_height = int(img.width / target_ratio)
            top = (img.height - new_height) // 2
            img = img.crop((0, top, img.width, top + new_height))
        
        img = img.resize((target_width, target_height), Image.LANCZOS)
        return img
    except Exception as e:
        print(f"    Download failed, using fallback")
        return create_fallback(target_width, target_height)

def create_fallback(width, height):
    """Create fallback gradient"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    for y in range(height):
        ratio = y / height
        r = int(80 + (50 - 80) * ratio)
        g = int(120 + (80 - 120) * ratio)
        b = int(180 + (140 - 180) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    return img

def draw_frosted_panel_v7(img, panel_rect, blur_strength=20):
    """Create beautiful frosted glass panel with frame"""
    x1, y1, x2, y2 = panel_rect
    width, height = img.size
    
    # Create blurred version
    blurred = img.copy()
    blurred = blurred.filter(ImageFilter.GaussianBlur(radius=blur_strength))
    blurred = blurred.convert('RGBA')
    
    result = img.copy().convert('RGBA')
    
    # Extract and process panel region
    panel_width = x2 - x1
    panel_height = y2 - y1
    
    blurred_region = blurred.crop((x1, y1, x2, y2))
    
    # Add blue-ish white tint for frosted effect
    tint_overlay = Image.new('RGBA', (panel_width, panel_height), (220, 230, 245, 140))
    frosted = Image.alpha_composite(blurred_region, tint_overlay)
    
    # Paste onto result
    result.paste(frosted, (x1, y1))
    
    draw = ImageDraw.Draw(result)
    
    # Draw frame/border - silver metallic effect
    border_width = 4
    # Outer dark border
    draw.rounded_rectangle([x1-2, y1-2, x2+2, y2+2], radius=25, outline=(80, 90, 100), width=2)
    # Main border
    draw.rounded_rectangle([x1, y1, x2, y2], radius=22, outline=(180, 190, 200), width=border_width)
    # Inner highlight
    draw.rounded_rectangle([x1+3, y1+3, x2-3, y2-3], radius=20, outline=(240, 245, 250, 150), width=1)
    
    return result

def draw_crossword_cell_v7(draw, x, y, size, letter, style='salmon'):
    """Draw premium crossword cell"""
    
    if style == 'salmon':
        fill_color = (235, 160, 160)  # Salmon pink
        text_color = (120, 60, 60)
    elif style == 'pink':
        fill_color = (240, 150, 180)
        text_color = (100, 40, 60)
    else:
        fill_color = (255, 255, 255)
        text_color = (60, 60, 80)
    
    margin = 2
    corner = 6
    
    if letter == ' ':
        return
    elif letter == '_':
        # Empty cell - light gray
        draw.rounded_rectangle(
            [x + margin, y + margin, x + size - margin, y + size - margin],
            radius=corner,
            fill=(230, 235, 240),
            outline=(200, 205, 210),
            width=1
        )
    else:
        # Filled cell
        # Shadow
        draw.rounded_rectangle(
            [x + margin + 2, y + margin + 2, x + size - margin + 2, y + size - margin + 2],
            radius=corner,
            fill=(180, 140, 140, 80)
        )
        # Main cell
        draw.rounded_rectangle(
            [x + margin, y + margin, x + size - margin, y + size - margin],
            radius=corner,
            fill=fill_color
        )
        
        # Letter
        font = get_font(int(size * 0.5))
        bbox = draw.textbbox((0, 0), letter, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        lx = x + (size - tw) // 2
        ly = y + (size - th) // 2 - 2
        draw.text((lx, ly), letter, fill=text_color, font=font)

def draw_crossword_grid_v7(draw, start_x, start_y, cell_size, grid, style='salmon'):
    """Draw crossword grid"""
    for row_idx, row in enumerate(grid):
        for col_idx, cell in enumerate(row):
            x = start_x + col_idx * cell_size
            y = start_y + row_idx * cell_size
            draw_crossword_cell_v7(draw, x, y, cell_size, cell, style)

def draw_level_bar(draw, x, y, width, level_name, score, time_str, hints):
    """Draw the level info bar"""
    height = 45
    
    # Level badge (blue)
    badge_width = 200
    draw.rounded_rectangle(
        [x, y, x + badge_width, y + height],
        radius=8,
        fill=(60, 130, 200)
    )
    font = get_font(16)
    draw.text((x + 15, y + 12), level_name, fill=(255, 255, 255), font=font)
    
    # Score and Time
    info_font = get_font(14)
    draw.text((x + badge_width + 30, y + 14), f"SCORE: {score}", fill=(60, 70, 80), font=info_font)
    draw.text((x + badge_width + 160, y + 14), f"TIME: {time_str}", fill=(60, 70, 80), font=info_font)
    
    # Hint button (yellow/gold)
    hint_x = x + width - 90
    draw.rounded_rectangle(
        [hint_x, y, hint_x + 80, y + height],
        radius=8,
        fill=(255, 200, 50)
    )
    draw.text((hint_x + 15, y + 12), f"Hint: {hints}", fill=(80, 60, 20), font=font)

def draw_word_entry(draw, x, y, width):
    """Draw word entry field"""
    height = 40
    
    # Input field
    draw.rounded_rectangle(
        [x, y, x + width - 120, y + height],
        radius=8,
        fill=(240, 245, 250),
        outline=(200, 210, 220)
    )
    font = get_font(14)
    draw.text((x + 15, y + 11), "Enter word...", fill=(150, 160, 170), font=font)
    
    # Progress bar area
    bar_x = x + width - 100
    draw.rounded_rectangle(
        [bar_x, y + 15, bar_x + 80, y + 25],
        radius=5,
        fill=(220, 225, 230)
    )
    # Progress fill
    draw.rounded_rectangle(
        [bar_x, y + 15, bar_x + 50, y + 25],
        radius=5,
        fill=(180, 190, 200)
    )

def draw_wooden_wheel(draw, center_x, center_y, radius, letters):
    """Draw premium wooden/bronze letter wheel with metallic ring"""
    
    # Sparkle effects around wheel
    random.seed(42)
    for _ in range(40):
        angle = random.uniform(0, 2 * math.pi)
        dist = radius + random.randint(20, 60)
        sx = center_x + int(dist * math.cos(angle))
        sy = center_y + int(dist * math.sin(angle))
        size = random.randint(2, 5)
        alpha = random.randint(150, 255)
        draw.ellipse([sx - size, sy - size, sx + size, sy + size], 
                     fill=(255, 255, 255, alpha))
        # Add cross sparkle for larger ones
        if size > 3:
            draw.line([(sx - size * 2, sy), (sx + size * 2, sy)], 
                     fill=(255, 255, 255, alpha // 2), width=1)
            draw.line([(sx, sy - size * 2), (sx, sy + size * 2)], 
                     fill=(255, 255, 255, alpha // 2), width=1)
    
    # Outer metallic ring (silver/chrome effect)
    ring_width = 18
    
    # Dark outer edge
    draw.ellipse(
        [center_x - radius - 8, center_y - radius - 8, 
         center_x + radius + 8, center_y + radius + 8],
        fill=(60, 70, 80)
    )
    
    # Metallic gradient effect (simulated with concentric circles)
    for i in range(ring_width):
        r = radius + ring_width // 2 - i
        # Gradient from light to dark to light
        if i < ring_width // 3:
            shade = 200 - i * 5
        elif i < 2 * ring_width // 3:
            shade = 160 + (i - ring_width // 3) * 8
        else:
            shade = 200 - (i - 2 * ring_width // 3) * 5
        draw.ellipse(
            [center_x - r, center_y - r, center_x + r, center_y + r],
            outline=(shade, shade + 5, shade + 10),
            width=1
        )
    
    # Wooden/bronze inner dial
    wood_radius = radius - ring_width // 2
    
    # Base wood color (brown gradient)
    for i in range(wood_radius, 0, -1):
        ratio = i / wood_radius
        # Create wood-like gradient
        r = int(140 + (100 - 140) * (1 - ratio))
        g = int(100 + (70 - 100) * (1 - ratio))
        b = int(70 + (50 - 70) * (1 - ratio))
        draw.ellipse(
            [center_x - i, center_y - i, center_x + i, center_y + i],
            outline=(r, g, b),
            width=1
        )
    
    # Inner metallic ring
    inner_ring_radius = wood_radius - 30
    draw.ellipse(
        [center_x - inner_ring_radius - 5, center_y - inner_ring_radius - 5,
         center_x + inner_ring_radius + 5, center_y + inner_ring_radius + 5],
        outline=(180, 185, 190),
        width=8
    )
    draw.ellipse(
        [center_x - inner_ring_radius, center_y - inner_ring_radius,
         center_x + inner_ring_radius, center_y + inner_ring_radius],
        outline=(220, 225, 230),
        width=3
    )
    
    # Center circle (metallic)
    center_r = 35
    # Dark base
    draw.ellipse(
        [center_x - center_r, center_y - center_r, 
         center_x + center_r, center_y + center_r],
        fill=(150, 155, 160)
    )
    # Highlight
    draw.ellipse(
        [center_x - center_r + 5, center_y - center_r + 5,
         center_x + center_r - 10, center_y + center_r - 10],
        fill=(200, 205, 210)
    )
    
    # Letter buttons
    letter_radius = wood_radius - 50
    button_size = 32
    font = get_font(24)
    
    for i, letter in enumerate(letters):
        angle = (i * 2 * math.pi / len(letters)) - math.pi / 2
        lx = center_x + int(letter_radius * math.cos(angle))
        ly = center_y + int(letter_radius * math.sin(angle))
        
        # Button shadow
        draw.ellipse(
            [lx - button_size + 2, ly - button_size + 2,
             lx + button_size + 2, ly + button_size + 2],
            fill=(80, 60, 50)
        )
        
        # White button
        draw.ellipse(
            [lx - button_size, ly - button_size, lx + button_size, ly + button_size],
            fill=(255, 255, 255)
        )
        
        # Button highlight
        draw.ellipse(
            [lx - button_size + 3, ly - button_size + 3,
             lx + button_size - 8, ly + button_size - 12],
            fill=(250, 252, 255)
        )
        
        # Letter
        bbox = draw.textbbox((0, 0), letter, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((lx - tw // 2, ly - th // 2 - 1), letter, fill=(50, 55, 60), font=font)

def draw_bottom_buttons(draw, center_x, y):
    """Draw Shuffle and Settings buttons"""
    btn_width = 90
    btn_height = 40
    spacing = 30
    
    # Shuffle button
    shuffle_x = center_x - btn_width - spacing // 2
    draw.rounded_rectangle(
        [shuffle_x, y, shuffle_x + btn_width, y + btn_height],
        radius=20,
        fill=(80, 90, 100)
    )
    font = get_font(14)
    draw.text((shuffle_x + 18, y + 11), "Shuffle", fill=(255, 255, 255), font=font)
    
    # Settings button
    settings_x = center_x + spacing // 2
    draw.rounded_rectangle(
        [settings_x, y, settings_x + btn_width, y + btn_height],
        radius=20,
        fill=(80, 90, 100)
    )
    draw.text((settings_x + 15, y + 11), "Settings", fill=(255, 255, 255), font=font)

def create_phone_screenshot_v7(num, width=1080, height=1920):
    """Create premium phone screenshot"""
    
    configs = [
        {
            'url': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=2000&fit=crop',
            'level': 'Level 5 - Glacier Peak',
            'letters': ['W', 'O', 'R', 'D', 'S', 'G'],
            'grid': [
                [' ', ' ', 'M', 'O', 'U', 'N', 'T'],
                [' ', 'G', 'L', 'A', 'C', 'I', ' '],
                [' ', ' ', 'T', 'R', 'A', 'I', 'L'],
                [' ', 'P', 'I', 'N', 'E', 'S', ' '],
                [' ', '_', '_', '_', '_', '_', '_'],
                [' ', '_', '_', '_', '_', '_', '_'],
            ]
        },
        {
            'url': 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=2000&fit=crop',
            'level': 'Level 12 - Desert Oasis',
            'letters': ['S', 'A', 'N', 'D', 'U', 'E'],
            'grid': [
                [' ', ' ', 'S', 'A', 'N', 'D', ' '],
                [' ', ' ', 'U', '_', 'U', '_', ' '],
                [' ', 'D', 'U', 'N', 'E', 'S', ' '],
                [' ', '_', 'N', '_', '_', '_', ' '],
                [' ', '_', '_', '_', '_', '_', ' '],
            ]
        },
        {
            'url': 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&h=2000&fit=crop',
            'level': 'Level 8 - Crystal Lake',
            'letters': ['L', 'A', 'K', 'E', 'W', 'R'],
            'grid': [
                [' ', ' ', 'L', 'A', 'K', 'E', ' '],
                [' ', ' ', '_', '_', '_', '_', ' '],
                [' ', 'W', 'A', 'T', 'E', 'R', ' '],
                [' ', '_', '_', '_', '_', '_', ' '],
                [' ', '_', '_', '_', '_', '_', ' '],
            ]
        },
        {
            'url': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=2000&fit=crop',
            'level': 'Level 15 - Tropical Bay',
            'letters': ['B', 'E', 'A', 'C', 'H', 'S'],
            'grid': [
                [' ', 'B', 'E', 'A', 'C', 'H', ' '],
                [' ', '_', '_', '_', '_', '_', ' '],
                [' ', 'S', 'A', 'N', 'D', 'S', ' '],
                [' ', '_', '_', '_', '_', '_', ' '],
                [' ', '_', '_', '_', '_', '_', ' '],
            ]
        },
    ]
    
    config = configs[(num - 1) % len(configs)]
    
    print(f"  Creating premium screenshot {num}...")
    
    # Download background
    bg = download_image(config['url'], width, height)
    
    # Enhance
    enhancer = ImageEnhance.Color(bg)
    bg = enhancer.enhance(1.1)
    enhancer = ImageEnhance.Brightness(bg)
    bg = enhancer.enhance(1.02)
    
    # Calculate dimensions
    cell_size = 62
    grid_cols = max(len(row) for row in config['grid'])
    grid_rows = len(config['grid'])
    grid_width = grid_cols * cell_size
    grid_height = grid_rows * cell_size
    
    # Panel dimensions
    panel_margin = 40
    panel_top = 80
    panel_bottom = panel_top + grid_height + 180  # Extra space for level bar
    
    # Create frosted panel
    img = draw_frosted_panel_v7(
        bg,
        (panel_margin, panel_top, width - panel_margin, panel_bottom),
        blur_strength=18
    )
    
    draw = ImageDraw.Draw(img)
    
    # Draw grid
    grid_x = (width - grid_width) // 2
    grid_y = panel_top + 40
    draw_crossword_grid_v7(draw, grid_x, grid_y, cell_size, config['grid'], 'salmon')
    
    # Level bar
    bar_y = panel_bottom - 100
    bar_width = width - panel_margin * 2 - 40
    draw_level_bar(draw, panel_margin + 20, bar_y, bar_width, 
                   config['level'], 1250, "1:30", 3)
    
    # Word entry
    draw_word_entry(draw, panel_margin + 20, bar_y + 55, bar_width)
    
    # Wooden letter wheel
    wheel_y = height - 380
    wheel_radius = 160
    draw_wooden_wheel(draw, width // 2, wheel_y, wheel_radius, config['letters'])
    
    # Bottom buttons
    draw_bottom_buttons(draw, width // 2, height - 100)
    
    # Convert and save
    img_rgb = Image.new('RGB', (width, height), (0, 0, 0))
    img_rgb.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
    
    img_rgb.save(f"{OUTPUT_DIR}/screenshot_{num}.png", "PNG", quality=95)
    print(f"    ✅ Screenshot {num} complete")

def create_tablet_screenshot_v7(size_type, num, width, height):
    """Create tablet screenshot"""
    
    urls = [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&h=3000&fit=crop',
        'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=2000&h=3000&fit=crop',
    ]
    
    print(f"  Creating {size_type}-inch tablet {num}...")
    
    bg = download_image(urls[(num - 1) % len(urls)], width, height)
    enhancer = ImageEnhance.Color(bg)
    bg = enhancer.enhance(1.1)
    
    scale = width / 1080
    
    # Panel
    panel_margin = int(50 * scale)
    panel_top = int(80 * scale)
    panel_bottom = int(height * 0.45)
    
    img = draw_frosted_panel_v7(bg, (panel_margin, panel_top, width - panel_margin, panel_bottom))
    draw = ImageDraw.Draw(img)
    
    # Grid
    grid = [
        [' ', ' ', 'W', 'O', 'R', 'D', 'S'],
        [' ', '_', '_', '_', '_', '_', '_'],
        [' ', '_', 'G', 'A', 'M', 'E', '_'],
        [' ', '_', '_', '_', '_', '_', '_'],
    ]
    
    cell_size = int(75 * scale)
    grid_cols = 7
    grid_width = grid_cols * cell_size
    grid_x = (width - grid_width) // 2
    grid_y = panel_top + int(50 * scale)
    
    draw_crossword_grid_v7(draw, grid_x, grid_y, cell_size, grid, 'salmon')
    
    # Level bar
    bar_y = panel_bottom - int(90 * scale)
    bar_width = width - panel_margin * 2 - int(40 * scale)
    level_name = "Level 5 - Mountain Vista" if num == 1 else "Level 8 - Lake View"
    draw_level_bar(draw, panel_margin + int(20 * scale), bar_y, bar_width, level_name, 1500, "2:00", 5)
    
    # Wheel
    wheel_y = height - int(400 * scale)
    wheel_radius = int(180 * scale)
    letters = ['W', 'O', 'R', 'D', 'S', 'G']
    draw_wooden_wheel(draw, width // 2, wheel_y, wheel_radius, letters)
    
    # Buttons
    draw_bottom_buttons(draw, width // 2, height - int(100 * scale))
    
    # Save
    img_rgb = Image.new('RGB', (width, height), (0, 0, 0))
    img_rgb.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
    
    filename = f"tablet_{size_type}inch_{num}.png"
    img_rgb.save(f"{OUTPUT_DIR}/{filename}", "PNG", quality=95)
    print(f"    ✅ {size_type}-inch tablet {num} complete")

def create_feature_graphic_v7():
    """Create feature graphic"""
    width, height = 1024, 500
    
    print("  Creating feature graphic...")
    
    bg = download_image(
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=600&fit=crop',
        width, height
    )
    enhancer = ImageEnhance.Color(bg)
    bg = enhancer.enhance(1.15)
    
    img = draw_frosted_panel_v7(bg, (25, 25, 460, 475))
    draw = ImageDraw.Draw(img)
    
    # Grid
    grid = [
        [' ', 'W', 'O', 'R', 'D'],
        [' ', '_', '_', '_', '_'],
        [' ', '_', 'S', '_', '_'],
    ]
    
    cell_size = 65
    grid_x = 80
    grid_y = 80
    draw_crossword_grid_v7(draw, grid_x, grid_y, cell_size, grid, 'salmon')
    
    # Wheel
    wheel_x = width - 280
    wheel_y = height // 2
    draw_wooden_wheel(draw, wheel_x, wheel_y, 140, ['W', 'O', 'R', 'D', 'S'])
    
    # Save
    img_rgb = Image.new('RGB', (width, height), (0, 0, 0))
    img_rgb.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
    
    img_rgb.save(f"{OUTPUT_DIR}/feature_graphic.png", "PNG", quality=95)
    img_rgb.save(f"{OUTPUT_DIR}/feature_graphic_1024x500.png", "PNG", quality=95)
    print("    ✅ Feature graphic complete")

def create_app_icon_v7():
    """Create app icon"""
    size = 512
    
    print("  Creating app icon...")
    
    bg = download_image(
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=600&fit=crop',
        size, size
    )
    enhancer = ImageEnhance.Color(bg)
    bg = enhancer.enhance(1.2)
    
    img = bg.convert('RGBA')
    draw = ImageDraw.Draw(img)
    
    center = size // 2
    draw_wooden_wheel(draw, center, center, 200, ['W', 'O', 'W'])
    
    # Save
    img_rgb = Image.new('RGB', (size, size), (0, 0, 0))
    img_rgb.paste(img, mask=img.split()[3])
    
    img_rgb.save(f"{OUTPUT_DIR}/app_icon_512.png", "PNG", quality=95)
    print("    ✅ App icon complete")

def main():
    print("=" * 70)
    print("🎨 PREMIUM PLAY STORE SCREENSHOTS V7")
    print("   Wooden Wheel • Sparkles • Level Bar • Professional")
    print("=" * 70)
    
    print("\n📱 Phone Screenshots...")
    for i in range(1, 5):
        create_phone_screenshot_v7(i)
    
    print("\n📱 Tablet Screenshots...")
    for i in range(1, 3):
        create_tablet_screenshot_v7(7, i, 1200, 1920)
    for i in range(1, 3):
        create_tablet_screenshot_v7(10, i, 1600, 2560)
    
    print("\n🖼️ Feature Graphic...")
    create_feature_graphic_v7()
    
    print("\n🎯 App Icon...")
    create_app_icon_v7()
    
    print("\n" + "=" * 70)
    print("✅ ALL PREMIUM SCREENSHOTS COMPLETE!")
    print("=" * 70)
    
    # Show files
    print("\nFiles:")
    for f in sorted(os.listdir(OUTPUT_DIR)):
        if f.endswith('.png'):
            size = os.path.getsize(os.path.join(OUTPUT_DIR, f)) / 1024
            print(f"  📄 {f} ({size:.0f} KB)")

if __name__ == "__main__":
    main()
