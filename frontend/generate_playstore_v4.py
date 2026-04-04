#!/usr/bin/env python3
"""
Professional Play Store Screenshots Generator V4
Authentic Words of Wonders Style with Scenic Backgrounds
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os
import math
import random

OUTPUT_DIR = "/app/frontend/assets/playstore"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def get_font(size):
    """Get a font"""
    try:
        return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", size)
    except:
        return ImageFont.load_default()

def create_mountain_scene(width, height):
    """Create a purple/pink mountain sunset scene"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    # Sky gradient - purple to pink
    for y in range(height // 2):
        ratio = y / (height // 2)
        r = int(80 + (180 - 80) * ratio)
        g = int(50 + (100 - 50) * ratio)
        b = int(120 + (160 - 120) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Lower part - darker purple
    for y in range(height // 2, height):
        ratio = (y - height // 2) / (height // 2)
        r = int(180 - (180 - 60) * ratio)
        g = int(100 - (100 - 40) * ratio)
        b = int(160 - (160 - 100) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Draw mountains
    # Back mountain (darker)
    mountain1 = [
        (0, height * 0.7),
        (width * 0.15, height * 0.45),
        (width * 0.3, height * 0.55),
        (width * 0.5, height * 0.35),
        (width * 0.7, height * 0.5),
        (width * 0.85, height * 0.4),
        (width, height * 0.6),
        (width, height),
        (0, height)
    ]
    draw.polygon(mountain1, fill=(60, 40, 80))
    
    # Front mountain (slightly lighter)
    mountain2 = [
        (0, height * 0.85),
        (width * 0.2, height * 0.6),
        (width * 0.4, height * 0.75),
        (width * 0.6, height * 0.55),
        (width * 0.8, height * 0.7),
        (width, height * 0.65),
        (width, height),
        (0, height)
    ]
    draw.polygon(mountain2, fill=(45, 30, 60))
    
    # Snow caps
    snow_points = [(width * 0.5, height * 0.35), (width * 0.45, height * 0.42), (width * 0.55, height * 0.42)]
    draw.polygon(snow_points, fill=(220, 200, 220))
    
    return img

def create_desert_scene(width, height):
    """Create a pink/orange desert scene"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    # Sky gradient - pink to orange
    for y in range(int(height * 0.6)):
        ratio = y / (height * 0.6)
        r = int(255 - (255 - 220) * ratio)
        g = int(180 - (180 - 140) * ratio)
        b = int(200 - (200 - 150) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Sand dunes - gradient
    for y in range(int(height * 0.6), height):
        ratio = (y - height * 0.6) / (height * 0.4)
        r = int(200 + (180 - 200) * ratio)
        g = int(130 + (100 - 130) * ratio)
        b = int(120 + (90 - 120) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Draw sand dunes curves
    dune1 = [
        (0, height * 0.7),
        (width * 0.3, height * 0.6),
        (width * 0.6, height * 0.65),
        (width, height * 0.55),
        (width, height),
        (0, height)
    ]
    draw.polygon(dune1, fill=(190, 120, 100))
    
    dune2 = [
        (0, height * 0.85),
        (width * 0.4, height * 0.7),
        (width * 0.7, height * 0.8),
        (width, height * 0.75),
        (width, height),
        (0, height)
    ]
    draw.polygon(dune2, fill=(170, 100, 80))
    
    return img

def create_lake_scene(width, height):
    """Create a blue lake with mountains scene"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    # Sky gradient - light blue to white
    for y in range(int(height * 0.35)):
        ratio = y / (height * 0.35)
        r = int(135 + (200 - 135) * ratio)
        g = int(180 + (220 - 180) * ratio)
        b = int(220 + (240 - 220) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Mountains
    mountain = [
        (0, height * 0.5),
        (width * 0.2, height * 0.3),
        (width * 0.35, height * 0.4),
        (width * 0.5, height * 0.25),
        (width * 0.65, height * 0.35),
        (width * 0.8, height * 0.28),
        (width, height * 0.45),
        (width, height * 0.55),
        (0, height * 0.55)
    ]
    draw.polygon(mountain, fill=(80, 100, 120))
    
    # Snow on peaks
    snow = [(width * 0.5, height * 0.25), (width * 0.45, height * 0.32), (width * 0.55, height * 0.32)]
    draw.polygon(snow, fill=(240, 245, 250))
    
    # Lake - gradient blue
    for y in range(int(height * 0.55), height):
        ratio = (y - height * 0.55) / (height * 0.45)
        r = int(50 + (30 - 50) * ratio)
        g = int(120 + (80 - 120) * ratio)
        b = int(180 + (140 - 180) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Lake reflections
    for i in range(10):
        y = int(height * 0.6 + i * 20)
        x1 = random.randint(0, width // 2)
        x2 = x1 + random.randint(50, 150)
        draw.line([(x1, y), (x2, y)], fill=(100, 150, 200), width=2)
    
    return img

def create_tropical_scene(width, height):
    """Create a tropical beach/mountain scene"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    # Sky - bright blue gradient
    for y in range(int(height * 0.4)):
        ratio = y / (height * 0.4)
        r = int(100 + (150 - 100) * ratio)
        g = int(180 + (210 - 180) * ratio)
        b = int(230 + (240 - 230) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Green mountains
    mountain = [
        (0, height * 0.55),
        (width * 0.25, height * 0.35),
        (width * 0.5, height * 0.45),
        (width * 0.75, height * 0.3),
        (width, height * 0.5),
        (width, height * 0.6),
        (0, height * 0.6)
    ]
    draw.polygon(mountain, fill=(50, 100, 70))
    
    # Water - turquoise
    for y in range(int(height * 0.6), height):
        ratio = (y - height * 0.6) / (height * 0.4)
        r = int(40 + (30 - 40) * ratio)
        g = int(180 + (140 - 180) * ratio)
        b = int(200 + (170 - 200) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    return img

def create_frosted_overlay(width, height, top_height):
    """Create a frosted glass effect overlay for crossword area"""
    overlay = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Semi-transparent frosted area at top
    margin = 30
    corner = 25
    
    # Main frosted rectangle
    draw.rounded_rectangle(
        [margin, margin, width - margin, top_height],
        radius=corner,
        fill=(255, 255, 255, 60)
    )
    
    # Add subtle border
    draw.rounded_rectangle(
        [margin, margin, width - margin, top_height],
        radius=corner,
        outline=(255, 255, 255, 100),
        width=2
    )
    
    return overlay

def draw_crossword_grid_authentic(draw, x, y, cell_size, grid_data, style='pink'):
    """Draw authentic crossword grid with colored/white cells"""
    colors = {
        'pink': {'filled': (230, 150, 180), 'empty': (255, 255, 255), 'text': (80, 40, 60)},
        'white': {'filled': (255, 255, 255), 'empty': (240, 240, 245), 'text': (50, 50, 80)},
        'blue': {'filled': (100, 150, 220), 'empty': (255, 255, 255), 'text': (30, 50, 100)},
    }
    c = colors.get(style, colors['white'])
    
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
                    radius=4,
                    fill=c['empty'],
                    outline=(200, 200, 210)
                )
            else:
                # Filled cell with letter
                draw.rounded_rectangle(
                    [cx + 2, cy + 2, cx + cell_size - 2, cy + cell_size - 2],
                    radius=4,
                    fill=c['filled']
                )
                
                # Letter
                font = get_font(int(cell_size * 0.55))
                bbox = draw.textbbox((0, 0), cell, font=font)
                tw = bbox[2] - bbox[0]
                th = bbox[3] - bbox[1]
                draw.text(
                    (cx + cell_size // 2 - tw // 2, cy + cell_size // 2 - th // 2 - 2),
                    cell, fill=c['text'], font=font
                )

def draw_letter_wheel_authentic(img, center_x, center_y, radius, letters, bg_visible=True):
    """Draw authentic letter wheel with background showing through"""
    draw = ImageDraw.Draw(img)
    
    # Outer circle - white with transparency effect
    # Draw multiple rings for glow effect
    for i in range(3):
        r = radius + 10 - i * 3
        draw.ellipse(
            [center_x - r, center_y - r, center_x + r, center_y + r],
            outline=(255, 255, 255, 150 - i * 30),
            width=2
        )
    
    # Main circle outline
    draw.ellipse(
        [center_x - radius, center_y - radius, center_x + radius, center_y + radius],
        outline=(255, 255, 255, 200),
        width=4
    )
    
    # Inner decorative circle
    inner_r = radius - 25
    draw.ellipse(
        [center_x - inner_r, center_y - inner_r, center_x + inner_r, center_y + inner_r],
        outline=(255, 255, 255, 80),
        width=2
    )
    
    # Letter positions
    letter_radius = radius - 55
    button_size = 32
    font = get_font(26)
    
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
        draw.text((lx - tw // 2, ly - th // 2 - 2), letter, fill=(60, 60, 80), font=font)

def create_phone_screenshot_v4(num, width=1080, height=1920):
    """Create authentic Words of Wonders style screenshot"""
    
    # Create scenic background based on number
    if num == 1:
        bg = create_mountain_scene(width, height)
        grid_style = 'pink'
        letters = ['V', 'I', 'R', 'E', 'N', 'C']
        grid = [
            ['N', 'O', 'R', 'G', ' ', ' '],
            ['E', ' ', 'P', 'R', 'R', ' '],
            ['A', ' ', '2', '0', ' ', ' '],
            ['R', 'A', 'A', 'R', 'P', ' '],
            ['I', ' ', 'F', 'R', 'N', ' '],
        ]
    elif num == 2:
        bg = create_desert_scene(width, height)
        grid_style = 'pink'
        letters = ['C', 'A', 'Z', 'D', 'N', 'E']
        grid = [
            [' ', 'T', 'H', ' ', 'H', 'T'],
            [' ', 'C', ' ', 'R', 'T', ' '],
            [' ', 'R', ' ', 'T', 'E', 'T', 'E'],
            [' ', 'T', 'E', 'T', ' ', 'E'],
            [' ', 'E', ' ', 'H', 'C', ' ', 'E'],
        ]
    elif num == 3:
        bg = create_lake_scene(width, height)
        grid_style = 'blue'
        letters = ['I', 'T', 'R', 'A', 'O', 'P', 'S']
        grid = [
            [' ', ' ', 'T', 'R', 'A', ' ', ' '],
            [' ', ' ', 'A', ' ', 'E', 'R', 'O'],
            [' ', 'M', 'A', 'I', ' ', ' ', 'R'],
            [' ', ' ', 'C', ' ', ' ', ' ', 'O'],
            [' ', ' ', 'R', 'T', 'I', ' ', 'A'],
        ]
    else:
        bg = create_tropical_scene(width, height)
        grid_style = 'white'
        letters = ['M', 'I', 'A', 'C', 'O']
        grid = [
            [' ', ' ', 'C', 'I', 'A', 'O', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['M', 'A', 'I', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ]
    
    # Convert to RGBA
    img = bg.convert('RGBA')
    draw = ImageDraw.Draw(img)
    
    # Calculate grid dimensions
    cell_size = 55
    grid_cols = max(len(row) for row in grid)
    grid_rows = len(grid)
    grid_width = grid_cols * cell_size
    grid_height = grid_rows * cell_size
    
    # Frosted overlay area
    frosted_top = 80
    frosted_bottom = frosted_top + grid_height + 100
    
    # Create and apply frosted overlay
    frosted = create_frosted_overlay(width, height, frosted_bottom)
    img = Image.alpha_composite(img, frosted)
    draw = ImageDraw.Draw(img)
    
    # Draw crossword grid
    grid_x = (width - grid_width) // 2
    grid_y = frosted_top + 50
    draw_crossword_grid_authentic(draw, grid_x, grid_y, cell_size, grid, grid_style)
    
    # Letter wheel at bottom (background shows through)
    wheel_y = height - 350
    wheel_radius = 150
    draw_letter_wheel_authentic(img, width // 2, wheel_y, wheel_radius, letters)
    
    # Add hint and shuffle buttons
    btn_y = height - 100
    # Hint button (left)
    draw.ellipse([width // 2 - 120, btn_y - 25, width // 2 - 70, btn_y + 25], 
                 fill=(255, 255, 255, 180))
    # Shuffle button (right)
    draw.ellipse([width // 2 + 70, btn_y - 25, width // 2 + 120, btn_y + 25],
                 fill=(255, 255, 255, 180))
    
    # Convert and save
    img_rgb = Image.new('RGB', (width, height), (0, 0, 0))
    img_rgb.paste(img, mask=img.split()[3])
    
    img_rgb.save(f"{OUTPUT_DIR}/screenshot_{num}.png", "PNG")
    print(f"✅ Screenshot {num} created: {width}x{height}")

def create_tablet_screenshot_v4(size_type, num, width, height):
    """Create tablet screenshot with scenic background"""
    
    if num == 1:
        bg = create_mountain_scene(width, height)
        grid_style = 'pink'
    else:
        bg = create_lake_scene(width, height)
        grid_style = 'blue'
    
    img = bg.convert('RGBA')
    draw = ImageDraw.Draw(img)
    
    # Scale factors
    scale = width / 1080
    
    # Frosted area
    margin = int(40 * scale)
    frosted_height = int(height * 0.45)
    
    draw.rounded_rectangle(
        [margin, margin, width - margin, frosted_height],
        radius=int(30 * scale),
        fill=(255, 255, 255, 60)
    )
    
    # Grid
    grid = [
        ['W', 'O', 'R', 'D', 'S', ' '],
        ['_', '_', '_', '_', '_', ' '],
        ['_', '_', 'G', 'A', 'M', 'E'],
        ['_', '_', '_', '_', '_', '_'],
    ]
    
    cell_size = int(70 * scale)
    grid_cols = 6
    grid_rows = 4
    grid_width = grid_cols * cell_size
    grid_x = (width - grid_width) // 2
    grid_y = int(100 * scale)
    
    draw_crossword_grid_authentic(draw, grid_x, grid_y, cell_size, grid, grid_style)
    
    # Letter wheel
    wheel_y = height - int(350 * scale)
    wheel_radius = int(180 * scale)
    letters = ['W', 'O', 'R', 'D', 'S', 'G']
    draw_letter_wheel_authentic(img, width // 2, wheel_y, wheel_radius, letters)
    
    # Convert and save
    img_rgb = Image.new('RGB', (width, height), (0, 0, 0))
    img_rgb.paste(img, mask=img.split()[3])
    
    filename = f"tablet_{size_type}inch_{num}.png"
    img_rgb.save(f"{OUTPUT_DIR}/{filename}", "PNG")
    print(f"✅ {size_type}-inch tablet {num} created: {width}x{height}")

def create_feature_graphic_v4():
    """Create feature graphic with scenic split design"""
    width, height = 1024, 500
    
    # Create a combined scenic background
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    # Left half - mountain scene colors
    for y in range(height):
        ratio = y / height
        r = int(100 + (60 - 100) * ratio)
        g = int(80 + (40 - 80) * ratio)
        b = int(140 + (100 - 140) * ratio)
        draw.line([(0, y), (width // 2, y)], fill=(r, g, b))
    
    # Right half - lake scene colors
    for y in range(height):
        ratio = y / height
        r = int(80 + (50 - 80) * ratio)
        g = int(150 + (120 - 150) * ratio)
        b = int(200 + (180 - 200) * ratio)
        draw.line([(width // 2, y), (width, y)], fill=(r, g, b))
    
    # Mountains silhouette
    mountain = [
        (0, height * 0.7),
        (width * 0.2, height * 0.4),
        (width * 0.4, height * 0.55),
        (width * 0.5, height * 0.35),
        (width * 0.5, height),
        (0, height)
    ]
    draw.polygon(mountain, fill=(50, 40, 70))
    
    img = img.convert('RGBA')
    draw = ImageDraw.Draw(img)
    
    # Left side - frosted crossword area
    draw.rounded_rectangle(
        [40, 60, 400, 440],
        radius=20,
        fill=(255, 255, 255, 50)
    )
    
    # Mini crossword grid
    grid = [
        ['W', 'O', 'R', 'D'],
        ['_', '_', '_', '_'],
        ['_', '_', 'N', '_'],
    ]
    cell_size = 60
    grid_x = 100
    grid_y = 120
    draw_crossword_grid_authentic(draw, grid_x, grid_y, cell_size, grid, 'pink')
    
    # Right side - letter wheel
    wheel_x = width - 280
    wheel_y = height // 2
    letters = ['W', 'O', 'R', 'D', 'S']
    draw_letter_wheel_authentic(img, wheel_x, wheel_y, 140, letters)
    
    # Save
    img_rgb = Image.new('RGB', (width, height), (0, 0, 0))
    img_rgb.paste(img, mask=img.split()[3])
    
    img_rgb.save(f"{OUTPUT_DIR}/feature_graphic.png", "PNG")
    img_rgb.save(f"{OUTPUT_DIR}/feature_graphic_1024x500.png", "PNG")
    print(f"✅ Feature graphic created: {width}x{height}")

def create_app_icon_v4():
    """Create app icon with scenic background"""
    size = 512
    
    # Create scenic background
    img = Image.new('RGB', (size, size))
    draw = ImageDraw.Draw(img)
    
    # Gradient background - purple/blue
    for y in range(size):
        ratio = y / size
        r = int(80 + (40 - 80) * ratio)
        g = int(100 + (80 - 100) * ratio)
        b = int(180 + (150 - 180) * ratio)
        draw.line([(0, y), (size, y)], fill=(r, g, b))
    
    img = img.convert('RGBA')
    draw = ImageDraw.Draw(img)
    
    center = size // 2
    
    # Letter wheel
    radius = 200
    draw.ellipse(
        [center - radius, center - radius, center + radius, center + radius],
        outline=(255, 255, 255),
        width=8
    )
    
    # Inner circle
    inner_r = 160
    draw.ellipse(
        [center - inner_r, center - inner_r, center + inner_r, center + inner_r],
        outline=(255, 255, 255, 100),
        width=3
    )
    
    # Letters
    letters = ['W', 'O', 'W']
    letter_radius = 120
    button_size = 40
    font = get_font(36)
    
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
    
    # Center dot
    draw.ellipse([center - 25, center - 25, center + 25, center + 25], fill=(255, 255, 255))
    
    # Save
    img_rgb = Image.new('RGB', (size, size), (0, 0, 0))
    img_rgb.paste(img, mask=img.split()[3])
    
    img_rgb.save(f"{OUTPUT_DIR}/app_icon_512.png", "PNG")
    print(f"✅ App icon created: {size}x{size}")

def main():
    print("=" * 70)
    print("🌄 AUTHENTIC PLAY STORE SCREENSHOTS V4")
    print("    Words of Wonders Style with Scenic Backgrounds")
    print("=" * 70)
    
    # Phone screenshots
    print("\n📱 Creating Phone Screenshots...")
    for i in range(1, 5):
        create_phone_screenshot_v4(i)
    
    # Tablet screenshots
    print("\n📱 Creating Tablet Screenshots...")
    for i in range(1, 3):
        create_tablet_screenshot_v4(7, i, 1200, 1920)
    for i in range(1, 3):
        create_tablet_screenshot_v4(10, i, 1600, 2560)
    
    # Feature graphic
    print("\n🖼️ Creating Feature Graphic...")
    create_feature_graphic_v4()
    
    # App icon
    print("\n🎯 Creating App Icon...")
    create_app_icon_v4()
    
    print("\n" + "=" * 70)
    print("✅ All authentic screenshots created!")
    print("🌄 Styles: Mountain sunset, Desert, Lake, Tropical")
    print(f"📁 Location: {OUTPUT_DIR}/")
    print("=" * 70)

if __name__ == "__main__":
    main()
