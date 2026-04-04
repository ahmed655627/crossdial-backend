#!/usr/bin/env python3
"""
Professional Play Store Screenshots Generator V5
Uses REAL scenic photos for authentic Words of Wonders style
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import os
import math
import requests
from io import BytesIO

OUTPUT_DIR = "/app/frontend/assets/playstore"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Real scenic image URLs
SCENIC_IMAGES = {
    'mountain_purple': 'https://images.unsplash.com/photo-1645130322946-ab2b0f00df26?w=1200&h=1800&fit=crop',
    'mountain_sunset': 'https://images.pexels.com/photos/13214245/pexels-photo-13214245.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1800&fit=crop',
    'desert': 'https://images.unsplash.com/photo-1511860810434-a92f84c6f01e?w=1200&h=1800&fit=crop',
    'lake': 'https://images.unsplash.com/photo-1683487602681-b1502dbbd823?w=1200&h=1800&fit=crop',
    'tropical': 'https://images.unsplash.com/photo-1535262412227-85541e910204?w=1200&h=1800&fit=crop',
}

def get_font(size):
    """Get a font"""
    try:
        return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", size)
    except:
        return ImageFont.load_default()

def download_image(url, target_width, target_height):
    """Download and resize an image from URL"""
    try:
        print(f"  Downloading: {url[:60]}...")
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers, timeout=30)
        img = Image.open(BytesIO(response.content))
        
        # Convert to RGB if needed
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Calculate crop to fill target dimensions
        img_ratio = img.width / img.height
        target_ratio = target_width / target_height
        
        if img_ratio > target_ratio:
            # Image is wider, crop sides
            new_width = int(img.height * target_ratio)
            left = (img.width - new_width) // 2
            img = img.crop((left, 0, left + new_width, img.height))
        else:
            # Image is taller, crop top/bottom
            new_height = int(img.width / target_ratio)
            top = (img.height - new_height) // 2
            img = img.crop((0, top, img.width, top + new_height))
        
        # Resize to target
        img = img.resize((target_width, target_height), Image.LANCZOS)
        
        return img
    except Exception as e:
        print(f"  Failed to download: {e}")
        return create_fallback_scenic(target_width, target_height)

def create_fallback_scenic(width, height):
    """Create a beautiful fallback gradient if download fails"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    # Purple-pink gradient
    for y in range(height):
        ratio = y / height
        r = int(120 + (80 - 120) * ratio)
        g = int(80 + (50 - 80) * ratio)
        b = int(160 + (120 - 160) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Add mountain silhouette
    mountain = [
        (0, height * 0.6),
        (width * 0.2, height * 0.4),
        (width * 0.5, height * 0.3),
        (width * 0.8, height * 0.45),
        (width, height * 0.5),
        (width, height),
        (0, height)
    ]
    draw.polygon(mountain, fill=(40, 30, 60))
    
    return img

def create_frosted_glass_panel(width, height, panel_top, panel_bottom, blur_radius=10):
    """Create a frosted glass effect panel"""
    # Create mask for the panel area
    mask = Image.new('L', (width, height), 0)
    mask_draw = ImageDraw.Draw(mask)
    
    margin = 25
    corner_radius = 20
    
    # Draw rounded rectangle on mask
    mask_draw.rounded_rectangle(
        [margin, panel_top, width - margin, panel_bottom],
        radius=corner_radius,
        fill=255
    )
    
    return mask

def draw_crossword_grid(draw, x, y, cell_size, grid_data, style='pink'):
    """Draw crossword grid with colored cells"""
    colors = {
        'pink': {'filled': (235, 130, 180), 'empty': (255, 255, 255, 230), 'text': (60, 30, 50)},
        'white': {'filled': (255, 255, 255), 'empty': (245, 245, 250, 230), 'text': (50, 50, 80)},
        'blue': {'filled': (80, 130, 200), 'empty': (255, 255, 255, 230), 'text': (255, 255, 255)},
    }
    c = colors.get(style, colors['pink'])
    
    for row_idx, row in enumerate(grid_data):
        for col_idx, cell in enumerate(row):
            cx = x + col_idx * cell_size
            cy = y + row_idx * cell_size
            
            if cell == ' ':
                continue
            elif cell == '_':
                # Empty cell
                draw.rounded_rectangle(
                    [cx + 2, cy + 2, cx + cell_size - 2, cy + cell_size - 2],
                    radius=5,
                    fill=(255, 255, 255, 200),
                    outline=(220, 220, 230)
                )
            else:
                # Filled cell with letter
                draw.rounded_rectangle(
                    [cx + 2, cy + 2, cx + cell_size - 2, cy + cell_size - 2],
                    radius=5,
                    fill=c['filled']
                )
                
                # Letter
                font = get_font(int(cell_size * 0.5))
                bbox = draw.textbbox((0, 0), cell, font=font)
                tw = bbox[2] - bbox[0]
                th = bbox[3] - bbox[1]
                text_color = c['text'] if style != 'blue' else (255, 255, 255)
                draw.text(
                    (cx + cell_size // 2 - tw // 2, cy + cell_size // 2 - th // 2 - 2),
                    cell, fill=text_color, font=font
                )

def draw_letter_wheel(draw, center_x, center_y, radius, letters):
    """Draw letter wheel with white circle and letters"""
    # Outer glow rings
    for i in range(4):
        r = radius + 15 - i * 4
        draw.ellipse(
            [center_x - r, center_y - r, center_x + r, center_y + r],
            outline=(255, 255, 255, 60 + i * 20),
            width=2
        )
    
    # Main white circle outline
    draw.ellipse(
        [center_x - radius, center_y - radius, center_x + radius, center_y + radius],
        outline=(255, 255, 255, 220),
        width=4
    )
    
    # Inner decorative circle
    inner_r = radius - 20
    draw.ellipse(
        [center_x - inner_r, center_y - inner_r, center_x + inner_r, center_y + inner_r],
        outline=(255, 255, 255, 100),
        width=2
    )
    
    # Letter positions
    letter_radius = radius - 50
    button_size = 30
    font = get_font(24)
    
    for i, letter in enumerate(letters):
        angle = (i * 2 * math.pi / len(letters)) - math.pi / 2
        lx = center_x + int(letter_radius * math.cos(angle))
        ly = center_y + int(letter_radius * math.sin(angle))
        
        # White letter button
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
    """Create professional phone screenshot with real scenic background"""
    
    # Scene configurations
    configs = [
        {
            'url': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=2000&fit=crop',
            'style': 'pink',
            'letters': ['V', 'I', 'R', 'N', 'E', 'C'],
            'grid': [
                ['N', 'O', 'R', 'G', ' '],
                ['E', ' ', 'P', 'R', 'R'],
                ['A', ' ', 'A', '0', ' '],
                ['R', 'A', 'A', 'R', 'P'],
                ['I', ' ', 'F', 'R', 'N'],
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
            'style': 'white',
            'letters': ['M', 'I', 'A', 'C', 'O'],
            'grid': [
                [' ', ' ', 'C', 'I', 'A', 'O'],
                [' ', ' ', ' ', 'M', 'I', 'O'],
                ['M', 'A', 'I', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' '],
            ]
        },
    ]
    
    config = configs[(num - 1) % len(configs)]
    
    # Download scenic background
    print(f"Creating screenshot {num}...")
    bg = download_image(config['url'], width, height)
    
    # Enhance the image slightly
    enhancer = ImageEnhance.Color(bg)
    bg = enhancer.enhance(1.1)
    enhancer = ImageEnhance.Contrast(bg)
    bg = enhancer.enhance(1.05)
    
    # Convert to RGBA
    img = bg.convert('RGBA')
    
    # Create frosted glass panel for crossword area
    cell_size = 52
    grid_cols = max(len(row) for row in config['grid'])
    grid_rows = len(config['grid'])
    grid_width = grid_cols * cell_size
    grid_height = grid_rows * cell_size
    
    panel_top = 80
    panel_bottom = panel_top + grid_height + 80
    panel_margin = 25
    
    # Create blurred version for frosted glass
    blurred = bg.filter(ImageFilter.GaussianBlur(radius=15))
    blurred = blurred.convert('RGBA')
    
    # Create panel mask
    panel_mask = Image.new('L', (width, height), 0)
    mask_draw = ImageDraw.Draw(panel_mask)
    mask_draw.rounded_rectangle(
        [panel_margin, panel_top, width - panel_margin, panel_bottom],
        radius=20,
        fill=255
    )
    
    # Create frosted panel layer
    frosted_panel = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    
    # Apply blurred background to panel area
    for y in range(height):
        for x in range(width):
            if panel_mask.getpixel((x, y)) > 0:
                pixel = blurred.getpixel((x, y))
                # Add white tint for frosted effect
                frosted_pixel = (
                    min(255, pixel[0] + 40),
                    min(255, pixel[1] + 40),
                    min(255, pixel[2] + 40),
                    180
                )
                frosted_panel.putpixel((x, y), frosted_pixel)
    
    # Composite frosted panel onto image
    img = Image.alpha_composite(img, frosted_panel)
    
    # Draw on the composited image
    draw = ImageDraw.Draw(img)
    
    # Draw panel border
    draw.rounded_rectangle(
        [panel_margin, panel_top, width - panel_margin, panel_bottom],
        radius=20,
        outline=(255, 255, 255, 150),
        width=2
    )
    
    # Draw crossword grid
    grid_x = (width - grid_width) // 2
    grid_y = panel_top + 40
    draw_crossword_grid(draw, grid_x, grid_y, cell_size, config['grid'], config['style'])
    
    # Draw letter wheel at bottom
    wheel_y = height - 320
    wheel_radius = 140
    draw_letter_wheel(draw, width // 2, wheel_y, wheel_radius, config['letters'])
    
    # Add action buttons at very bottom
    btn_y = height - 90
    # Hint button
    draw.ellipse([width // 2 - 100, btn_y - 22, width // 2 - 56, btn_y + 22], 
                 fill=(255, 255, 255, 200))
    # Shuffle button
    draw.ellipse([width // 2 + 56, btn_y - 22, width // 2 + 100, btn_y + 22],
                 fill=(255, 255, 255, 200))
    
    # Convert and save
    img_rgb = Image.new('RGB', (width, height), (0, 0, 0))
    img_rgb.paste(img, mask=img.split()[3])
    
    img_rgb.save(f"{OUTPUT_DIR}/screenshot_{num}.png", "PNG", quality=95)
    print(f"  ✅ Screenshot {num} saved: {width}x{height}")

def create_tablet_screenshot(size_type, num, width, height):
    """Create tablet screenshot"""
    
    urls = [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000&h=3000&fit=crop',
        'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=2000&h=3000&fit=crop',
    ]
    
    print(f"Creating {size_type}-inch tablet screenshot {num}...")
    bg = download_image(urls[(num - 1) % len(urls)], width, height)
    
    # Convert to RGBA
    img = bg.convert('RGBA')
    draw = ImageDraw.Draw(img)
    
    # Scale
    scale = width / 1080
    
    # Frosted panel
    panel_margin = int(30 * scale)
    panel_top = int(80 * scale)
    panel_bottom = int(height * 0.45)
    
    # Draw semi-transparent panel
    draw.rounded_rectangle(
        [panel_margin, panel_top, width - panel_margin, panel_bottom],
        radius=int(25 * scale),
        fill=(255, 255, 255, 100)
    )
    draw.rounded_rectangle(
        [panel_margin, panel_top, width - panel_margin, panel_bottom],
        radius=int(25 * scale),
        outline=(255, 255, 255, 180),
        width=2
    )
    
    # Grid
    grid = [
        ['W', 'O', 'R', 'D', 'S', ' '],
        ['_', '_', '_', '_', '_', ' '],
        ['_', '_', 'G', 'A', 'M', 'E'],
        ['_', '_', '_', '_', '_', '_'],
    ]
    style = 'pink' if num == 1 else 'blue'
    
    cell_size = int(65 * scale)
    grid_cols = 6
    grid_width = grid_cols * cell_size
    grid_x = (width - grid_width) // 2
    grid_y = panel_top + int(50 * scale)
    
    draw_crossword_grid(draw, grid_x, grid_y, cell_size, grid, style)
    
    # Letter wheel
    wheel_y = height - int(350 * scale)
    wheel_radius = int(170 * scale)
    letters = ['W', 'O', 'R', 'D', 'S', 'G']
    draw_letter_wheel(draw, width // 2, wheel_y, wheel_radius, letters)
    
    # Convert and save
    img_rgb = Image.new('RGB', (width, height), (0, 0, 0))
    img_rgb.paste(img, mask=img.split()[3])
    
    filename = f"tablet_{size_type}inch_{num}.png"
    img_rgb.save(f"{OUTPUT_DIR}/{filename}", "PNG", quality=95)
    print(f"  ✅ {size_type}-inch tablet {num} saved: {width}x{height}")

def create_feature_graphic():
    """Create feature graphic"""
    width, height = 1024, 500
    
    print("Creating feature graphic...")
    bg = download_image(
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=600&fit=crop',
        width, height
    )
    
    img = bg.convert('RGBA')
    draw = ImageDraw.Draw(img)
    
    # Left frosted panel
    draw.rounded_rectangle(
        [30, 40, 420, 460],
        radius=20,
        fill=(255, 255, 255, 100)
    )
    
    # Mini crossword
    grid = [
        ['W', 'O', 'R', 'D'],
        ['_', '_', '_', '_'],
        ['_', '_', 'S', '_'],
    ]
    cell_size = 55
    grid_x = 90
    grid_y = 100
    draw_crossword_grid(draw, grid_x, grid_y, cell_size, grid, 'pink')
    
    # Right letter wheel
    wheel_x = width - 250
    wheel_y = height // 2
    letters = ['W', 'O', 'R', 'D', 'S']
    draw_letter_wheel(draw, wheel_x, wheel_y, 130, letters)
    
    # Save
    img_rgb = Image.new('RGB', (width, height), (0, 0, 0))
    img_rgb.paste(img, mask=img.split()[3])
    
    img_rgb.save(f"{OUTPUT_DIR}/feature_graphic.png", "PNG", quality=95)
    img_rgb.save(f"{OUTPUT_DIR}/feature_graphic_1024x500.png", "PNG", quality=95)
    print(f"  ✅ Feature graphic saved: {width}x{height}")

def create_app_icon():
    """Create app icon"""
    size = 512
    
    print("Creating app icon...")
    bg = download_image(
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=600&fit=crop',
        size, size
    )
    
    img = bg.convert('RGBA')
    draw = ImageDraw.Draw(img)
    
    center = size // 2
    radius = 190
    
    # Letter wheel
    draw.ellipse(
        [center - radius, center - radius, center + radius, center + radius],
        outline=(255, 255, 255),
        width=8
    )
    
    # Inner circle
    inner_r = 150
    draw.ellipse(
        [center - inner_r, center - inner_r, center + inner_r, center + inner_r],
        outline=(255, 255, 255, 150),
        width=3
    )
    
    # Letters
    letters = ['W', 'O', 'W']
    letter_radius = 110
    button_size = 38
    font = get_font(32)
    
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
    draw.ellipse([center - 22, center - 22, center + 22, center + 22], fill=(255, 255, 255))
    
    # Save
    img_rgb = Image.new('RGB', (size, size), (0, 0, 0))
    img_rgb.paste(img, mask=img.split()[3])
    
    img_rgb.save(f"{OUTPUT_DIR}/app_icon_512.png", "PNG", quality=95)
    print(f"  ✅ App icon saved: {size}x{size}")

def main():
    print("=" * 70)
    print("🏔️  HIGH QUALITY PLAY STORE SCREENSHOTS V5")
    print("    Using Real Scenic Photos - Words of Wonders Style")
    print("=" * 70)
    
    # Phone screenshots
    print("\n📱 Creating Phone Screenshots with Real Photos...")
    for i in range(1, 5):
        create_phone_screenshot(i)
    
    # Tablet screenshots
    print("\n📱 Creating Tablet Screenshots...")
    for i in range(1, 3):
        create_tablet_screenshot(7, i, 1200, 1920)
    for i in range(1, 3):
        create_tablet_screenshot(10, i, 1600, 2560)
    
    # Feature graphic
    print("\n🖼️  Creating Feature Graphic...")
    create_feature_graphic()
    
    # App icon
    print("\n🎯 Creating App Icon...")
    create_app_icon()
    
    print("\n" + "=" * 70)
    print("✅ All high-quality screenshots created!")
    print(f"📁 Location: {OUTPUT_DIR}/")
    
    # Show file sizes
    print("\nFiles created:")
    for f in sorted(os.listdir(OUTPUT_DIR)):
        if f.endswith('.png'):
            filepath = os.path.join(OUTPUT_DIR, f)
            size = os.path.getsize(filepath) / 1024
            print(f"  📄 {f} ({size:.1f} KB)")
    
    print("=" * 70)

if __name__ == "__main__":
    main()
