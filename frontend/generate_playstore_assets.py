#!/usr/bin/env python3
"""
Google Play Store Assets Generator for CrossDial Puzzles
Generates: App Icon (512x512), Feature Graphic (1024x500), Screenshots (1080x1920)
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os
import math

# Output directory
OUTPUT_DIR = "/app/frontend/assets/playstore"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def create_gradient(draw, width, height, colors):
    """Create a vertical gradient"""
    for y in range(height):
        ratio = y / height
        r = int(colors[0][0] + (colors[1][0] - colors[0][0]) * ratio)
        g = int(colors[0][1] + (colors[1][1] - colors[0][1]) * ratio)
        b = int(colors[0][2] + (colors[1][2] - colors[0][2]) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

def create_app_icon():
    """Create 512x512 app icon"""
    size = 512
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Background gradient (purple to blue)
    for y in range(size):
        ratio = y / size
        r = int(102 + (118 - 102) * ratio)
        g = int(126 + (75 - 126) * ratio)
        b = int(234 + (162 - 234) * ratio)
        draw.line([(0, y), (size, y)], fill=(r, g, b))
    
    # Draw outer circle (letter wheel)
    margin = 40
    draw.ellipse([margin, margin, size-margin, size-margin], 
                 outline=(255, 255, 255), width=8)
    
    # Draw inner decorative circle
    inner_margin = 80
    draw.ellipse([inner_margin, inner_margin, size-inner_margin, size-inner_margin], 
                 outline=(255, 255, 255, 150), width=3)
    
    # Draw letter positions around the wheel
    letters = ['C', 'R', 'O', 'S', 'S']
    center = size // 2
    radius = 160
    
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 60)
    except:
        font = ImageFont.load_default()
    
    for i, letter in enumerate(letters):
        angle = (i * 2 * math.pi / len(letters)) - math.pi / 2
        x = center + int(radius * math.cos(angle))
        y = center + int(radius * math.sin(angle))
        
        # Draw letter circle
        circle_size = 45
        draw.ellipse([x-circle_size, y-circle_size, x+circle_size, y+circle_size], 
                     fill=(255, 215, 0))  # Gold
        
        # Draw letter
        bbox = draw.textbbox((0, 0), letter, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        draw.text((x - text_width//2, y - text_height//2 - 5), letter, 
                  fill=(30, 30, 60), font=font)
    
    # Center decoration
    draw.ellipse([center-30, center-30, center+30, center+30], 
                 fill=(255, 255, 255, 100))
    
    # Add sparkle effect
    sparkle_positions = [(100, 100), (400, 120), (420, 400), (90, 380)]
    for x, y in sparkle_positions:
        draw.ellipse([x-5, y-5, x+5, y+5], fill=(255, 255, 255))
    
    img.save(f"{OUTPUT_DIR}/app_icon_512.png", "PNG")
    print(f"✅ Created: {OUTPUT_DIR}/app_icon_512.png")

def create_feature_graphic():
    """Create 1024x500 feature graphic"""
    width, height = 1024, 500
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    # Gradient background
    for y in range(height):
        ratio = y / height
        r = int(30 + (60 - 30) * ratio)
        g = int(30 + (30 - 30) * ratio)
        b = int(80 + (120 - 80) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Add some decorative elements
    for i in range(20):
        x = (i * 60) % width
        y = (i * 30) % height
        size = 3 + (i % 3)
        alpha = 100 + (i * 5) % 100
        draw.ellipse([x, y, x+size, y+size], fill=(255, 255, 255))
    
    try:
        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 72)
        subtitle_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 32)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    # Draw title
    title = "CrossDial Puzzles"
    bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = bbox[2] - bbox[0]
    draw.text((width//2 - title_width//2, 150), title, fill=(255, 215, 0), font=title_font)
    
    # Draw subtitle
    subtitle = "Swipe • Connect • Discover Words"
    bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = bbox[2] - bbox[0]
    draw.text((width//2 - subtitle_width//2, 250), subtitle, fill=(255, 255, 255), font=subtitle_font)
    
    # Draw letter wheel illustration on left
    wheel_center = (200, 280)
    wheel_radius = 100
    draw.ellipse([wheel_center[0]-wheel_radius, wheel_center[1]-wheel_radius,
                  wheel_center[0]+wheel_radius, wheel_center[1]+wheel_radius],
                 outline=(255, 255, 255), width=4)
    
    # Letters around wheel
    letters = ['W', 'O', 'R', 'D', 'S']
    for i, letter in enumerate(letters):
        angle = (i * 2 * math.pi / len(letters)) - math.pi / 2
        x = wheel_center[0] + int(70 * math.cos(angle))
        y = wheel_center[1] + int(70 * math.sin(angle))
        draw.ellipse([x-20, y-20, x+20, y+20], fill=(255, 215, 0))
    
    # Draw grid illustration on right
    grid_start = (750, 180)
    cell_size = 40
    for row in range(4):
        for col in range(4):
            x = grid_start[0] + col * cell_size
            y = grid_start[1] + row * cell_size
            if (row + col) % 2 == 0:
                draw.rectangle([x, y, x+cell_size-2, y+cell_size-2], fill=(255, 215, 0))
            else:
                draw.rectangle([x, y, x+cell_size-2, y+cell_size-2], 
                             outline=(255, 255, 255), width=2)
    
    # Bottom tagline
    tagline = "150 Levels • 7 World Wonders • Free to Play"
    bbox = draw.textbbox((0, 0), tagline, font=subtitle_font)
    tagline_width = bbox[2] - bbox[0]
    draw.text((width//2 - tagline_width//2, 400), tagline, fill=(200, 200, 200), font=subtitle_font)
    
    img.save(f"{OUTPUT_DIR}/feature_graphic_1024x500.png", "PNG")
    print(f"✅ Created: {OUTPUT_DIR}/feature_graphic_1024x500.png")

def create_screenshot(num, title, subtitle, highlight_color):
    """Create a phone screenshot 1080x1920"""
    width, height = 1080, 1920
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    # Gradient background
    for y in range(height):
        ratio = y / height
        r = int(102 + (60 - 102) * ratio)
        g = int(126 + (30 - 126) * ratio)
        b = int(234 + (120 - 234) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    try:
        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 64)
        subtitle_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 36)
        feature_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 48)
    except:
        title_font = subtitle_font = feature_font = ImageFont.load_default()
    
    # Title at top
    bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = bbox[2] - bbox[0]
    draw.text((width//2 - title_width//2, 150), title, fill=highlight_color, font=title_font)
    
    # Subtitle
    bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = bbox[2] - bbox[0]
    draw.text((width//2 - subtitle_width//2, 240), subtitle, fill=(255, 255, 255), font=subtitle_font)
    
    # Main content area (simulated phone screen)
    screen_margin = 80
    screen_top = 350
    screen_height = 1200
    
    # Draw phone frame
    draw.rounded_rectangle([screen_margin, screen_top, 
                           width-screen_margin, screen_top+screen_height],
                          radius=30, outline=(255, 255, 255), width=4)
    
    # Inner content based on screenshot type
    center_x = width // 2
    center_y = screen_top + screen_height // 2
    
    if num == 1:  # Letter Wheel
        # Draw wheel
        wheel_radius = 250
        draw.ellipse([center_x-wheel_radius, center_y-wheel_radius,
                     center_x+wheel_radius, center_y+wheel_radius],
                    outline=(255, 255, 255), width=6)
        
        letters = ['P', 'U', 'Z', 'Z', 'L', 'E']
        for i, letter in enumerate(letters):
            angle = (i * 2 * math.pi / len(letters)) - math.pi / 2
            x = center_x + int(180 * math.cos(angle))
            y = center_y + int(180 * math.sin(angle))
            draw.ellipse([x-40, y-40, x+40, y+40], fill=(255, 215, 0))
            draw.text((x-15, y-25), letter, fill=(30, 30, 60), font=feature_font)
            
    elif num == 2:  # Crossword Grid
        cell_size = 80
        grid_size = 5
        start_x = center_x - (grid_size * cell_size) // 2
        start_y = center_y - (grid_size * cell_size) // 2
        
        for row in range(grid_size):
            for col in range(grid_size):
                x = start_x + col * cell_size
                y = start_y + row * cell_size
                if (row + col) % 3 != 0:
                    draw.rectangle([x, y, x+cell_size-4, y+cell_size-4], fill=(255, 215, 0))
                else:
                    draw.rectangle([x, y, x+cell_size-4, y+cell_size-4], 
                                 fill=(255, 255, 255, 50), outline=(255, 255, 255), width=2)
                    
    elif num == 3:  # Daily Rewards
        # Draw wheel segments
        for i in range(8):
            angle_start = i * 45
            color = (255, 215, 0) if i % 2 == 0 else (102, 126, 234)
            # Simplified pie chart
            
        # Center circle
        draw.ellipse([center_x-200, center_y-200, center_x+200, center_y+200],
                    outline=(255, 215, 0), width=8)
        draw.ellipse([center_x-50, center_y-50, center_x+50, center_y+50],
                    fill=(255, 215, 0))
                    
    elif num == 4:  # Achievements
        # Draw achievement badges
        badge_positions = [(center_x-150, center_y-200), (center_x+150, center_y-200),
                          (center_x-150, center_y+50), (center_x+150, center_y+50)]
        for x, y in badge_positions:
            draw.ellipse([x-70, y-70, x+70, y+70], fill=(255, 215, 0), outline=(255, 255, 255), width=4)
            draw.ellipse([x-40, y-40, x+40, y+40], fill=(255, 255, 255))
    
    # Bottom badge
    badge_text = f"Screenshot {num}"
    bbox = draw.textbbox((0, 0), badge_text, font=subtitle_font)
    badge_width = bbox[2] - bbox[0]
    draw.rounded_rectangle([width//2 - badge_width//2 - 30, 1700,
                           width//2 + badge_width//2 + 30, 1780],
                          radius=20, fill=highlight_color)
    draw.text((width//2 - badge_width//2, 1720), badge_text, fill=(30, 30, 60), font=subtitle_font)
    
    img.save(f"{OUTPUT_DIR}/screenshot_{num}.png", "PNG")
    print(f"✅ Created: {OUTPUT_DIR}/screenshot_{num}.png")

def main():
    print("🎨 Generating Google Play Store Assets...")
    print("=" * 50)
    
    # Create App Icon
    create_app_icon()
    
    # Create Feature Graphic
    create_feature_graphic()
    
    # Create Screenshots
    screenshots = [
        (1, "Swipe to Connect", "Form words with the letter wheel", (255, 215, 0)),
        (2, "Find Hidden Words", "Complete the crossword grid", (0, 255, 200)),
        (3, "Daily Rewards", "Spin to win coins & prizes", (255, 100, 100)),
        (4, "Earn Achievements", "Track your progress", (100, 200, 255)),
    ]
    
    for num, title, subtitle, color in screenshots:
        create_screenshot(num, title, subtitle, color)
    
    print("=" * 50)
    print(f"✅ All assets saved to: {OUTPUT_DIR}/")
    print("\nFiles created:")
    for f in os.listdir(OUTPUT_DIR):
        filepath = os.path.join(OUTPUT_DIR, f)
        size = os.path.getsize(filepath)
        print(f"  📄 {f} ({size/1024:.1f} KB)")

if __name__ == "__main__":
    main()
