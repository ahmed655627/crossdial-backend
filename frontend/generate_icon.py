#!/usr/bin/env python3
"""
Generate a beautiful app icon for Wonder Words Quest
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import os

def create_gradient(size, color1, color2, direction='diagonal'):
    """Create a gradient background"""
    img = Image.new('RGBA', size)
    draw = ImageDraw.Draw(img)
    
    for y in range(size[1]):
        for x in range(size[0]):
            if direction == 'diagonal':
                ratio = (x + y) / (size[0] + size[1])
            elif direction == 'vertical':
                ratio = y / size[1]
            else:
                ratio = x / size[0]
            
            r = int(color1[0] + (color2[0] - color1[0]) * ratio)
            g = int(color1[1] + (color2[1] - color1[1]) * ratio)
            b = int(color1[2] + (color2[2] - color1[2]) * ratio)
            draw.point((x, y), fill=(r, g, b, 255))
    
    return img

def draw_rounded_rect(draw, coords, radius, fill):
    """Draw a rounded rectangle"""
    x1, y1, x2, y2 = coords
    draw.rectangle([x1 + radius, y1, x2 - radius, y2], fill=fill)
    draw.rectangle([x1, y1 + radius, x2, y2 - radius], fill=fill)
    draw.ellipse([x1, y1, x1 + radius * 2, y1 + radius * 2], fill=fill)
    draw.ellipse([x2 - radius * 2, y1, x2, y1 + radius * 2], fill=fill)
    draw.ellipse([x1, y2 - radius * 2, x1 + radius * 2, y2], fill=fill)
    draw.ellipse([x2 - radius * 2, y2 - radius * 2, x2, y2], fill=fill)

def create_app_icon(size=1024):
    """Create the main app icon"""
    # Create gradient background (deep purple to blue)
    color1 = (26, 26, 46)      # Dark purple #1a1a2e
    color2 = (15, 52, 96)      # Deep blue #0f3460
    
    img = create_gradient((size, size), color1, color2, 'diagonal')
    draw = ImageDraw.Draw(img)
    
    # Add subtle pattern overlay
    for i in range(0, size, 40):
        draw.line([(i, 0), (0, i)], fill=(255, 255, 255, 10), width=1)
        draw.line([(size, i), (i, size)], fill=(255, 255, 255, 10), width=1)
    
    # Draw globe circle
    globe_center = (size // 2, size // 2 - 40)
    globe_radius = size // 3
    
    # Globe background (lighter blue)
    draw.ellipse([
        globe_center[0] - globe_radius,
        globe_center[1] - globe_radius,
        globe_center[0] + globe_radius,
        globe_center[1] + globe_radius
    ], fill=(52, 152, 219, 200))
    
    # Globe lines (latitude/longitude)
    for i in range(-2, 3):
        y_offset = i * (globe_radius // 3)
        # Latitude lines
        left_x = globe_center[0] - int(math.sqrt(max(0, globe_radius**2 - y_offset**2)))
        right_x = globe_center[0] + int(math.sqrt(max(0, globe_radius**2 - y_offset**2)))
        draw.arc([left_x, globe_center[1] + y_offset - 20, right_x, globe_center[1] + y_offset + 20], 
                 0, 360, fill=(255, 255, 255, 100), width=3)
    
    # Vertical arc for longitude
    draw.arc([
        globe_center[0] - globe_radius // 2,
        globe_center[1] - globe_radius,
        globe_center[0] + globe_radius // 2,
        globe_center[1] + globe_radius
    ], 0, 360, fill=(255, 255, 255, 100), width=3)
    
    # Draw letter tiles around/on globe
    tile_size = size // 6
    letters = ['W', 'O', 'R', 'D']
    colors = [
        (255, 215, 0),    # Gold
        (231, 76, 60),    # Red
        (46, 204, 113),   # Green
        (155, 89, 182),   # Purple
    ]
    
    # Position tiles in a curved arrangement at the bottom
    tile_positions = [
        (size // 2 - tile_size * 2 + 20, size - tile_size - 80),
        (size // 2 - tile_size // 2 - 10, size - tile_size - 100),
        (size // 2 + tile_size // 2 + 10, size - tile_size - 100),
        (size // 2 + tile_size + 30, size - tile_size - 80),
    ]
    
    for i, (letter, color, pos) in enumerate(zip(letters, colors, tile_positions)):
        x, y = pos
        
        # Tile shadow
        draw_rounded_rect(draw, [x + 6, y + 6, x + tile_size + 6, y + tile_size + 6], 
                         15, (0, 0, 0, 80))
        
        # Tile background
        draw_rounded_rect(draw, [x, y, x + tile_size, y + tile_size], 
                         15, color)
        
        # Inner highlight
        draw_rounded_rect(draw, [x + 4, y + 4, x + tile_size - 4, y + tile_size - 4], 
                         12, (255, 255, 255, 50))
        
        # Letter
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", tile_size - 30)
        except:
            font = ImageFont.load_default()
        
        bbox = draw.textbbox((0, 0), letter, font=font)
        text_w = bbox[2] - bbox[0]
        text_h = bbox[3] - bbox[1]
        text_x = x + (tile_size - text_w) // 2
        text_y = y + (tile_size - text_h) // 2 - 5
        
        # Letter shadow
        draw.text((text_x + 2, text_y + 2), letter, fill=(0, 0, 0, 100), font=font)
        # Letter
        draw.text((text_x, text_y), letter, fill=(255, 255, 255), font=font)
    
    # Add sparkles/stars
    sparkle_positions = [
        (150, 150), (size - 150, 180), (200, size - 300),
        (size - 200, size - 350), (size // 2, 100)
    ]
    for sx, sy in sparkle_positions:
        draw_star(draw, sx, sy, 20, (255, 215, 0, 200))
    
    # Add subtle glow around globe
    glow_img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_img)
    for r in range(30, 0, -3):
        alpha = int(50 - r * 1.5)
        glow_draw.ellipse([
            globe_center[0] - globe_radius - r,
            globe_center[1] - globe_radius - r,
            globe_center[0] + globe_radius + r,
            globe_center[1] + globe_radius + r
        ], outline=(52, 152, 219, alpha), width=3)
    
    img = Image.alpha_composite(img, glow_img)
    
    return img

def draw_star(draw, x, y, size, color):
    """Draw a simple star/sparkle"""
    # Horizontal line
    draw.line([(x - size, y), (x + size, y)], fill=color, width=3)
    # Vertical line
    draw.line([(x, y - size), (x, y + size)], fill=color, width=3)
    # Diagonal lines
    s = size // 2
    draw.line([(x - s, y - s), (x + s, y + s)], fill=color, width=2)
    draw.line([(x + s, y - s), (x - s, y + s)], fill=color, width=2)

def main():
    # Create the main icon at 1024x1024
    print("Creating app icon...")
    icon = create_app_icon(1024)
    
    # Save the main icon
    assets_dir = "/app/frontend/assets/images"
    os.makedirs(assets_dir, exist_ok=True)
    
    icon_path = os.path.join(assets_dir, "icon.png")
    icon.save(icon_path, "PNG")
    print(f"Saved: {icon_path}")
    
    # Create adaptive icon (Android)
    adaptive_path = os.path.join(assets_dir, "adaptive-icon.png")
    icon.save(adaptive_path, "PNG")
    print(f"Saved: {adaptive_path}")
    
    # Create splash icon (smaller)
    splash = icon.resize((512, 512), Image.LANCZOS)
    splash_path = os.path.join(assets_dir, "splash-icon.png")
    splash.save(splash_path, "PNG")
    print(f"Saved: {splash_path}")
    
    # Create favicon
    favicon = icon.resize((48, 48), Image.LANCZOS)
    favicon_path = os.path.join(assets_dir, "favicon.png")
    favicon.save(favicon_path, "PNG")
    print(f"Saved: {favicon_path}")
    
    print("\n✅ All icons created successfully!")
    print("Icon features:")
    print("- Gradient background (purple to blue)")
    print("- Globe/world symbol")
    print("- Colorful letter tiles spelling 'WORD'")
    print("- Sparkle effects")
    print("- Modern rounded design")

if __name__ == "__main__":
    main()
