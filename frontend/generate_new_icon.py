#!/usr/bin/env python3
"""Generate a professional app icon for Wonder Words Quest"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

def create_gradient(width, height, color1, color2, direction='diagonal'):
    """Create a gradient background"""
    img = Image.new('RGBA', (width, height))
    draw = ImageDraw.Draw(img)
    
    for y in range(height):
        for x in range(width):
            if direction == 'diagonal':
                ratio = (x + y) / (width + height)
            else:
                ratio = y / height
            
            r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
            g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
            b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
            draw.point((x, y), fill=(r, g, b, 255))
    
    return img

def draw_rounded_rect(draw, coords, radius, fill, outline=None, width=0):
    """Draw a rounded rectangle"""
    x1, y1, x2, y2 = coords
    draw.rounded_rectangle(coords, radius=radius, fill=fill, outline=outline, width=width)

def create_app_icon(size=1024):
    """Create the main app icon"""
    # Create gradient background (deep purple to blue)
    color1 = (88, 28, 135)   # Deep purple
    color2 = (30, 58, 138)   # Deep blue
    
    img = create_gradient(size, size, color1, color2, 'diagonal')
    draw = ImageDraw.Draw(img)
    
    # Add subtle pattern overlay
    for i in range(0, size, 40):
        for j in range(0, size, 40):
            if (i + j) % 80 == 0:
                draw.ellipse([i-5, j-5, i+5, j+5], fill=(255, 255, 255, 15))
    
    # Draw letter tiles
    tile_size = size // 5
    tile_gap = 15
    start_x = size // 2 - tile_size - tile_gap // 2
    start_y = size // 4
    
    # Letters to display
    letters = [
        ['W', 'O'],
        ['R', 'D']
    ]
    
    # Gold/yellow colors for tiles
    tile_color = (251, 191, 36)  # Amber/gold
    tile_shadow = (180, 130, 20)
    text_color = (30, 30, 30)
    
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", tile_size // 2)
    except:
        font = ImageFont.load_default()
    
    for row_idx, row in enumerate(letters):
        for col_idx, letter in enumerate(row):
            x = start_x + col_idx * (tile_size + tile_gap)
            y = start_y + row_idx * (tile_size + tile_gap)
            
            # Shadow
            draw_rounded_rect(draw, 
                            [x + 8, y + 8, x + tile_size + 8, y + tile_size + 8],
                            20, fill=(0, 0, 0, 100))
            
            # Tile
            draw_rounded_rect(draw,
                            [x, y, x + tile_size, y + tile_size],
                            20, fill=tile_color)
            
            # 3D effect (darker bottom)
            draw_rounded_rect(draw,
                            [x, y + tile_size - 15, x + tile_size, y + tile_size],
                            20, fill=tile_shadow)
            
            # Letter
            bbox = draw.textbbox((0, 0), letter, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            text_x = x + (tile_size - text_width) // 2
            text_y = y + (tile_size - text_height) // 2 - 10
            
            draw.text((text_x, text_y), letter, fill=text_color, font=font)
    
    # Draw circular letter wheel at bottom
    wheel_center_x = size // 2
    wheel_center_y = size - size // 4
    wheel_radius = size // 5
    
    # Wheel background
    draw.ellipse([wheel_center_x - wheel_radius - 10, wheel_center_y - wheel_radius - 10,
                  wheel_center_x + wheel_radius + 10, wheel_center_y + wheel_radius + 10],
                 fill=(0, 0, 0, 80))
    
    draw.ellipse([wheel_center_x - wheel_radius, wheel_center_y - wheel_radius,
                  wheel_center_x + wheel_radius, wheel_center_y + wheel_radius],
                 fill=(255, 255, 255, 230))
    
    # Letters on wheel
    wheel_letters = ['S', 'Q', 'U', 'E', 'T']
    small_font_size = tile_size // 3
    try:
        small_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", small_font_size)
    except:
        small_font = ImageFont.load_default()
    
    for i, letter in enumerate(wheel_letters):
        angle = (i * 72 - 90) * math.pi / 180  # Distribute evenly
        lx = wheel_center_x + int((wheel_radius - 40) * math.cos(angle))
        ly = wheel_center_y + int((wheel_radius - 40) * math.sin(angle))
        
        bbox = draw.textbbox((0, 0), letter, font=small_font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        
        # Small tile for each letter
        draw_rounded_rect(draw,
                        [lx - 25, ly - 25, lx + 25, ly + 25],
                        8, fill=tile_color)
        
        draw.text((lx - tw//2, ly - th//2 - 5), letter, fill=text_color, font=small_font)
    
    # Add sparkle effects
    sparkle_positions = [(150, 100), (900, 150), (100, 800), (850, 750)]
    for sx, sy in sparkle_positions:
        for angle in range(0, 360, 45):
            rad = angle * math.pi / 180
            length = 20
            x1 = sx + int(5 * math.cos(rad))
            y1 = sy + int(5 * math.sin(rad))
            x2 = sx + int(length * math.cos(rad))
            y2 = sy + int(length * math.sin(rad))
            draw.line([(x1, y1), (x2, y2)], fill=(255, 255, 255, 200), width=3)
    
    return img

def create_adaptive_icon(size=1024):
    """Create adaptive icon for Android (foreground layer)"""
    # Create with transparent background for adaptive icon
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    
    # Create the main content centered (for safe zone)
    main_icon = create_app_icon(size)
    
    return main_icon

# Generate icons
print("Generating app icons...")

# Main icon
icon = create_app_icon(1024)
icon_rgb = icon.convert('RGB')
icon_rgb.save('/app/frontend/assets/images/icon.png', 'PNG')
print("Created: icon.png")

# Adaptive icon
adaptive = create_adaptive_icon(1024)
adaptive.save('/app/frontend/assets/images/adaptive-icon.png', 'PNG')
print("Created: adaptive-icon.png")

# Favicon (smaller)
favicon = create_app_icon(192)
favicon.save('/app/frontend/assets/images/favicon.png', 'PNG')
print("Created: favicon.png")

# Splash icon
splash = create_app_icon(512)
splash.save('/app/frontend/assets/images/splash-icon.png', 'PNG')
print("Created: splash-icon.png")

print("\nAll icons generated successfully!")
