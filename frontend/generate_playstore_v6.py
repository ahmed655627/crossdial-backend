#!/usr/bin/env python3
"""
Professional Play Store Screenshots Generator V6
FIXED: Big, Bold, Beautiful - Like Words of Wonders
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import os
import math
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
        print(f"    Downloading image...")
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
        print(f"    Download failed: {e}")
        return create_fallback(target_width, target_height)

def create_fallback(width, height):
    """Create fallback gradient background"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    for y in range(height):
        ratio = y / height
        r = int(100 + (60 - 100) * ratio)
        g = int(80 + (40 - 80) * ratio)
        b = int(150 + (100 - 150) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    return img

def draw_frosted_panel(img, panel_rect, blur_strength=25):
    """Create beautiful frosted glass panel"""
    x1, y1, x2, y2 = panel_rect
    width, height = img.size
    
    # Create blurred version of background
    blurred = img.copy()
    blurred = blurred.filter(ImageFilter.GaussianBlur(radius=blur_strength))
    
    # Create result image
    result = img.copy().convert('RGBA')
    
    # Create the frosted panel
    panel_width = x2 - x1
    panel_height = y2 - y1
    
    # Extract blurred region
    blurred_region = blurred.crop((x1, y1, x2, y2))
    
    # Add white overlay for frosted effect
    white_overlay = Image.new('RGBA', (panel_width, panel_height), (255, 255, 255, 120))
    
    # Combine blurred + white overlay
    blurred_rgba = blurred_region.convert('RGBA')
    frosted = Image.alpha_composite(blurred_rgba, white_overlay)
    
    # Paste onto result
    result.paste(frosted, (x1, y1))
    
    # Draw rounded corners mask effect (draw border)
    draw = ImageDraw.Draw(result)
    corner_radius = 30
    
    # Draw border
    draw.rounded_rectangle(
        [x1, y1, x2, y2],
        radius=corner_radius,
        outline=(255, 255, 255, 200),
        width=3
    )
    
    return result

def draw_crossword_cell(draw, x, y, size, letter, is_filled=True, style='pink'):
    """Draw a single crossword cell - BIG and BOLD"""
    
    if style == 'pink':
        fill_color = (235, 100, 170)  # Bright pink/magenta
        text_color = (255, 255, 255)
    elif style == 'blue':
        fill_color = (70, 130, 220)  # Bright blue
        text_color = (255, 255, 255)
    else:
        fill_color = (255, 255, 255)
        text_color = (60, 60, 80)
    
    empty_color = (255, 255, 255, 220)
    
    margin = 3
    corner = 8
    
    if letter == ' ':
        return
    elif letter == '_':
        # Empty cell - white with subtle border
        draw.rounded_rectangle(
            [x + margin, y + margin, x + size - margin, y + size - margin],
            radius=corner,
            fill=empty_color,
            outline=(200, 200, 210),
            width=1
        )
    else:
        # Filled cell with letter
        # Shadow
        draw.rounded_rectangle(
            [x + margin + 3, y + margin + 3, x + size - margin + 3, y + size - margin + 3],
            radius=corner,
            fill=(0, 0, 0, 50)
        )
        # Main cell
        draw.rounded_rectangle(
            [x + margin, y + margin, x + size - margin, y + size - margin],
            radius=corner,
            fill=fill_color
        )
        
        # Letter - BIG and BOLD
        font = get_font(int(size * 0.55))
        bbox = draw.textbbox((0, 0), letter, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        
        # Center the letter
        lx = x + (size - tw) // 2
        ly = y + (size - th) // 2 - 3
        
        draw.text((lx, ly), letter, fill=text_color, font=font)

def draw_crossword_grid(draw, start_x, start_y, cell_size, grid, style='pink'):
    """Draw the entire crossword grid"""
    for row_idx, row in enumerate(grid):
        for col_idx, cell in enumerate(row):
            x = start_x + col_idx * cell_size
            y = start_y + row_idx * cell_size
            draw_crossword_cell(draw, x, y, cell_size, cell, cell != '_', style)

def draw_letter_wheel(draw, center_x, center_y, radius, letters):
    """Draw BIG, BOLD letter wheel"""
    
    # Outer glow rings
    for i in range(5):
        r = radius + 20 - i * 4
        alpha = 40 + i * 15
        draw.ellipse(
            [center_x - r, center_y - r, center_x + r, center_y + r],
            outline=(255, 255, 255, alpha),
            width=3
        )
    
    # Main circle - thick white border
    draw.ellipse(
        [center_x - radius, center_y - radius, center_x + radius, center_y + radius],
        outline=(255, 255, 255),
        width=5
    )
    
    # Inner circle
    inner_r = radius - 25
    draw.ellipse(
        [center_x - inner_r, center_y - inner_r, center_x + inner_r, center_y + inner_r],
        outline=(255, 255, 255, 120),
        width=2
    )
    
    # Center decorative circle
    center_r = 25
    draw.ellipse(
        [center_x - center_r, center_y - center_r, center_x + center_r, center_y + center_r],
        fill=(255, 255, 255, 80)
    )
    
    # Letter buttons - BIG
    letter_radius = radius - 60
    button_size = 42
    font = get_font(32)
    
    for i, letter in enumerate(letters):
        angle = (i * 2 * math.pi / len(letters)) - math.pi / 2
        lx = center_x + int(letter_radius * math.cos(angle))
        ly = center_y + int(letter_radius * math.sin(angle))
        
        # Button shadow
        draw.ellipse(
            [lx - button_size + 3, ly - button_size + 3, 
             lx + button_size + 3, ly + button_size + 3],
            fill=(0, 0, 0, 40)
        )
        
        # White button
        draw.ellipse(
            [lx - button_size, ly - button_size, lx + button_size, ly + button_size],
            fill=(255, 255, 255)
        )
        
        # Letter
        bbox = draw.textbbox((0, 0), letter, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((lx - tw // 2, ly - th // 2 - 2), letter, fill=(50, 50, 70), font=font)

def create_phone_screenshot(num, width=1080, height=1920):
    """Create professional phone screenshot"""
    
    # Configurations for each screenshot
    configs = [
        {
            'url': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=2000&fit=crop',
            'style': 'pink',
            'letters': ['V', 'I', 'R', 'N', 'E', 'C'],
            'grid': [
                ['N', 'O', 'R', 'G', ' ', ' '],
                ['E', ' ', 'P', 'R', 'R', ' '],
                ['A', ' ', 'A', ' ', ' ', ' '],
                ['R', 'A', 'A', 'R', 'P', ' '],
                ['I', ' ', 'F', 'R', 'N', ' '],
            ]
        },
        {
            'url': 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=2000&fit=crop',
            'style': 'pink',
            'letters': ['C', 'A', 'Z', 'D', 'N', 'E'],
            'grid': [
                [' ', 'T', 'H', ' ', 'H', 'T'],
                [' ', 'C', ' ', 'R', 'T', ' '],
                [' ', 'R', ' ', 'T', 'E', 'T'],
                [' ', 'T', 'E', 'T', ' ', 'E'],
                [' ', 'E', ' ', 'H', 'C', 'E'],
            ]
        },
        {
            'url': 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&h=2000&fit=crop',
            'style': 'blue',
            'letters': ['T', 'R', 'A', 'O', 'P', 'S'],
            'grid': [
                [' ', ' ', 'T', 'R', 'A', ' '],
                [' ', ' ', 'A', ' ', 'E', 'R'],
                [' ', 'M', 'A', 'I', ' ', 'O'],
                [' ', ' ', 'C', ' ', ' ', 'R'],
                [' ', ' ', 'R', 'T', 'I', 'O'],
            ]
        },
        {
            'url': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=2000&fit=crop',
            'style': 'pink',
            'letters': ['C', 'I', 'A', 'O', 'M'],
            'grid': [
                [' ', ' ', 'C', 'I', 'A', 'O'],
                [' ', ' ', ' ', 'M', 'I', 'O'],
                ['M', 'A', 'I', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' '],
            ]
        },
    ]
    
    config = configs[(num - 1) % len(configs)]
    
    print(f"  Creating screenshot {num}...")
    
    # Download background
    bg = download_image(config['url'], width, height)
    
    # Enhance colors
    enhancer = ImageEnhance.Color(bg)
    bg = enhancer.enhance(1.15)
    enhancer = ImageEnhance.Brightness(bg)
    bg = enhancer.enhance(1.05)
    
    # Calculate grid size - BIGGER
    cell_size = 72  # Bigger cells
    grid_cols = max(len(row) for row in config['grid'])
    grid_rows = len(config['grid'])
    grid_width = grid_cols * cell_size
    grid_height = grid_rows * cell_size
    
    # Panel dimensions - takes more space
    panel_margin = 35
    panel_top = 100
    panel_bottom = panel_top + grid_height + 120
    
    # Create frosted panel
    img = draw_frosted_panel(
        bg, 
        (panel_margin, panel_top, width - panel_margin, panel_bottom),
        blur_strength=20
    )
    
    draw = ImageDraw.Draw(img)
    
    # Draw grid - CENTERED and BIG
    grid_x = (width - grid_width) // 2
    grid_y = panel_top + 60
    draw_crossword_grid(draw, grid_x, grid_y, cell_size, config['grid'], config['style'])
    
    # Letter wheel - BIGGER and lower
    wheel_y = height - 380
    wheel_radius = 180  # Bigger wheel
    draw_letter_wheel(draw, width // 2, wheel_y, wheel_radius, config['letters'])
    
    # Bottom buttons
    btn_y = height - 100
    btn_size = 35
    
    # Hint button (left)
    draw.ellipse(
        [width // 2 - 120 - btn_size, btn_y - btn_size, 
         width // 2 - 120 + btn_size, btn_y + btn_size],
        fill=(255, 255, 255, 220)
    )
    
    # Shuffle button (right)
    draw.ellipse(
        [width // 2 + 120 - btn_size, btn_y - btn_size,
         width // 2 + 120 + btn_size, btn_y + btn_size],
        fill=(255, 255, 255, 220)
    )
    
    # Convert and save
    img_rgb = Image.new('RGB', (width, height), (0, 0, 0))
    img_rgb.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
    
    img_rgb.save(f"{OUTPUT_DIR}/screenshot_{num}.png", "PNG", quality=95)
    print(f"    ✅ Screenshot {num} saved")

def create_tablet_screenshot(size_type, num, width, height):
    """Create tablet screenshot"""
    
    urls = [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&h=3000&fit=crop',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2000&h=3000&fit=crop',
    ]
    
    print(f"  Creating {size_type}-inch tablet {num}...")
    
    bg = download_image(urls[(num - 1) % len(urls)], width, height)
    
    # Enhance
    enhancer = ImageEnhance.Color(bg)
    bg = enhancer.enhance(1.15)
    
    # Scale factor
    scale = width / 1080
    
    # Panel
    panel_margin = int(40 * scale)
    panel_top = int(100 * scale)
    panel_bottom = int(height * 0.42)
    
    img = draw_frosted_panel(
        bg,
        (panel_margin, panel_top, width - panel_margin, panel_bottom),
        blur_strength=int(20 * scale)
    )
    
    draw = ImageDraw.Draw(img)
    
    # Grid
    grid = [
        ['W', 'O', 'R', 'D', 'S', ' '],
        ['_', '_', '_', '_', '_', ' '],
        ['_', '_', 'G', 'A', 'M', 'E'],
        ['_', '_', '_', '_', '_', '_'],
    ]
    
    cell_size = int(85 * scale)
    grid_cols = 6
    grid_width = grid_cols * cell_size
    grid_x = (width - grid_width) // 2
    grid_y = panel_top + int(60 * scale)
    
    style = 'pink' if num == 1 else 'blue'
    draw_crossword_grid(draw, grid_x, grid_y, cell_size, grid, style)
    
    # Letter wheel
    wheel_y = height - int(400 * scale)
    wheel_radius = int(200 * scale)
    letters = ['W', 'O', 'R', 'D', 'S', 'G']
    draw_letter_wheel(draw, width // 2, wheel_y, wheel_radius, letters)
    
    # Save
    img_rgb = Image.new('RGB', (width, height), (0, 0, 0))
    img_rgb.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
    
    filename = f"tablet_{size_type}inch_{num}.png"
    img_rgb.save(f"{OUTPUT_DIR}/{filename}", "PNG", quality=95)
    print(f"    ✅ {size_type}-inch tablet {num} saved")

def create_feature_graphic():
    """Create feature graphic"""
    width, height = 1024, 500
    
    print("  Creating feature graphic...")
    
    bg = download_image(
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=600&fit=crop',
        width, height
    )
    
    # Enhance
    enhancer = ImageEnhance.Color(bg)
    bg = enhancer.enhance(1.2)
    
    # Frosted left panel
    img = draw_frosted_panel(bg, (30, 30, 450, 470), blur_strength=15)
    draw = ImageDraw.Draw(img)
    
    # Grid
    grid = [
        ['W', 'O', 'R', 'D'],
        ['_', '_', '_', '_'],
        ['_', '_', 'S', '_'],
    ]
    
    cell_size = 70
    grid_x = 80
    grid_y = 90
    draw_crossword_grid(draw, grid_x, grid_y, cell_size, grid, 'pink')
    
    # Letter wheel on right
    wheel_x = width - 280
    wheel_y = height // 2
    letters = ['W', 'O', 'R', 'D', 'S']
    draw_letter_wheel(draw, wheel_x, wheel_y, 150, letters)
    
    # Save
    img_rgb = Image.new('RGB', (width, height), (0, 0, 0))
    img_rgb.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
    
    img_rgb.save(f"{OUTPUT_DIR}/feature_graphic.png", "PNG", quality=95)
    img_rgb.save(f"{OUTPUT_DIR}/feature_graphic_1024x500.png", "PNG", quality=95)
    print("    ✅ Feature graphic saved")

def create_app_icon():
    """Create app icon"""
    size = 512
    
    print("  Creating app icon...")
    
    bg = download_image(
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=600&fit=crop',
        size, size
    )
    
    # Enhance
    enhancer = ImageEnhance.Color(bg)
    bg = enhancer.enhance(1.3)
    
    img = bg.convert('RGBA')
    draw = ImageDraw.Draw(img)
    
    center = size // 2
    radius = 200
    
    # Letter wheel
    draw.ellipse(
        [center - radius, center - radius, center + radius, center + radius],
        outline=(255, 255, 255),
        width=10
    )
    
    inner_r = 160
    draw.ellipse(
        [center - inner_r, center - inner_r, center + inner_r, center + inner_r],
        outline=(255, 255, 255, 180),
        width=4
    )
    
    # Letters
    letters = ['W', 'O', 'W']
    letter_radius = 120
    button_size = 45
    font = get_font(40)
    
    for i, letter in enumerate(letters):
        angle = (i * 2 * math.pi / len(letters)) - math.pi / 2
        lx = center + int(letter_radius * math.cos(angle))
        ly = center + int(letter_radius * math.sin(angle))
        
        draw.ellipse(
            [lx - button_size, ly - button_size, lx + button_size, ly + button_size],
            fill=(255, 255, 255)
        )
        
        bbox = draw.textbbox((0, 0), letter, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((lx - tw // 2, ly - th // 2 - 2), letter, fill=(60, 80, 140), font=font)
    
    # Center
    draw.ellipse([center - 28, center - 28, center + 28, center + 28], fill=(255, 255, 255))
    
    # Save
    img_rgb = Image.new('RGB', (size, size), (0, 0, 0))
    img_rgb.paste(img, mask=img.split()[3])
    
    img_rgb.save(f"{OUTPUT_DIR}/app_icon_512.png", "PNG", quality=95)
    print("    ✅ App icon saved")

def main():
    print("=" * 70)
    print("🎨 PROFESSIONAL PLAY STORE SCREENSHOTS V6")
    print("   BIG • BOLD • BEAUTIFUL")
    print("=" * 70)
    
    print("\n📱 Phone Screenshots...")
    for i in range(1, 5):
        create_phone_screenshot(i)
    
    print("\n📱 Tablet Screenshots...")
    for i in range(1, 3):
        create_tablet_screenshot(7, i, 1200, 1920)
    for i in range(1, 3):
        create_tablet_screenshot(10, i, 1600, 2560)
    
    print("\n🖼️ Feature Graphic...")
    create_feature_graphic()
    
    print("\n🎯 App Icon...")
    create_app_icon()
    
    print("\n" + "=" * 70)
    print("✅ ALL PROFESSIONAL SCREENSHOTS CREATED!")
    print("=" * 70)
    
    # Show files
    print("\nFiles:")
    for f in sorted(os.listdir(OUTPUT_DIR)):
        if f.endswith('.png'):
            size = os.path.getsize(os.path.join(OUTPUT_DIR, f)) / 1024
            print(f"  📄 {f} ({size:.0f} KB)")

if __name__ == "__main__":
    main()
