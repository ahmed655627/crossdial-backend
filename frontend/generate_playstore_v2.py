#!/usr/bin/env python3
"""
Professional Google Play Store Assets Generator for CrossDial Puzzles
Creates realistic crossword/word puzzle game screenshots
"""

from PIL import Image, ImageDraw, ImageFont
import os
import math

OUTPUT_DIR = "/app/frontend/assets/playstore"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def get_font(size):
    """Get a font, fallback to default if not available"""
    try:
        return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", size)
    except:
        return ImageFont.load_default()

def draw_gradient_bg(draw, width, height):
    """Draw beautiful purple-blue gradient background"""
    for y in range(height):
        ratio = y / height
        r = int(40 + (80 - 40) * ratio)
        g = int(30 + (50 - 30) * ratio)
        b = int(100 + (150 - 100) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

def draw_crossword_grid(draw, x, y, cell_size, grid_data):
    """Draw a realistic crossword grid"""
    for row_idx, row in enumerate(grid_data):
        for col_idx, cell in enumerate(row):
            cx = x + col_idx * cell_size
            cy = y + row_idx * cell_size
            
            if cell == ' ':
                continue  # Empty space
            elif cell == '_':
                # Empty cell (unfound)
                draw.rounded_rectangle(
                    [cx, cy, cx + cell_size - 4, cy + cell_size - 4],
                    radius=6,
                    fill=(255, 255, 255, 40),
                    outline=(255, 255, 255, 100)
                )
            else:
                # Found letter - golden gradient effect
                draw.rounded_rectangle(
                    [cx, cy, cx + cell_size - 4, cy + cell_size - 4],
                    radius=6,
                    fill=(255, 200, 50)
                )
                # Draw letter
                font = get_font(int(cell_size * 0.6))
                bbox = draw.textbbox((0, 0), cell, font=font)
                tw = bbox[2] - bbox[0]
                th = bbox[3] - bbox[1]
                draw.text(
                    (cx + (cell_size - 4) // 2 - tw // 2, cy + (cell_size - 4) // 2 - th // 2 - 3),
                    cell, fill=(40, 30, 60), font=font
                )

def draw_letter_wheel(draw, center_x, center_y, radius, letters, selected=[]):
    """Draw the circular letter wheel"""
    # Outer ring
    draw.ellipse(
        [center_x - radius, center_y - radius, center_x + radius, center_y + radius],
        outline=(255, 255, 255, 150), width=4
    )
    
    # Inner decorative ring
    inner_r = radius - 30
    draw.ellipse(
        [center_x - inner_r, center_y - inner_r, center_x + inner_r, center_y + inner_r],
        outline=(255, 255, 255, 80), width=2
    )
    
    # Center circle
    center_r = 35
    draw.ellipse(
        [center_x - center_r, center_y - center_r, center_x + center_r, center_y + center_r],
        fill=(255, 255, 255, 50)
    )
    
    # Letter buttons
    letter_radius = radius - 60
    button_size = 40
    font = get_font(28)
    
    for i, letter in enumerate(letters):
        angle = (i * 2 * math.pi / len(letters)) - math.pi / 2
        lx = center_x + int(letter_radius * math.cos(angle))
        ly = center_y + int(letter_radius * math.sin(angle))
        
        # Check if selected
        is_selected = i in selected
        
        if is_selected:
            # Golden selected button
            draw.ellipse(
                [lx - button_size, ly - button_size, lx + button_size, ly + button_size],
                fill=(255, 200, 50)
            )
            text_color = (40, 30, 60)
        else:
            # White button
            draw.ellipse(
                [lx - button_size, ly - button_size, lx + button_size, ly + button_size],
                fill=(255, 255, 255)
            )
            text_color = (40, 40, 60)
        
        # Draw letter
        bbox = draw.textbbox((0, 0), letter, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((lx - tw // 2, ly - th // 2 - 3), letter, fill=text_color, font=font)

def draw_top_bar(draw, width, coins=500, hints=5, level=1):
    """Draw the game's top bar"""
    # Semi-transparent bar
    draw.rectangle([0, 0, width, 80], fill=(0, 0, 0, 100))
    
    font = get_font(24)
    small_font = get_font(18)
    
    # Level indicator (left)
    draw.rounded_rectangle([20, 20, 120, 60], radius=20, fill=(102, 126, 234))
    draw.text((35, 28), f"Lv {level}", fill=(255, 255, 255), font=font)
    
    # Coins (center-right)
    draw.rounded_rectangle([width - 200, 20, width - 100, 60], radius=20, fill=(255, 200, 50, 200))
    draw.text((width - 185, 28), f"🪙 {coins}", fill=(40, 30, 60), font=font)
    
    # Hints (right)
    draw.rounded_rectangle([width - 90, 20, width - 20, 60], radius=20, fill=(255, 255, 255, 150))
    draw.text((width - 75, 28), f"💡{hints}", fill=(40, 30, 60), font=font)

def draw_word_display(draw, center_x, y, word):
    """Draw the current word being formed"""
    font = get_font(36)
    bbox = draw.textbbox((0, 0), word, font=font)
    tw = bbox[2] - bbox[0]
    
    # Background pill
    padding = 30
    draw.rounded_rectangle(
        [center_x - tw // 2 - padding, y - 10, center_x + tw // 2 + padding, y + 50],
        radius=25,
        fill=(255, 255, 255, 30),
        outline=(255, 255, 255, 100)
    )
    
    draw.text((center_x - tw // 2, y), word, fill=(255, 255, 255), font=font)

def draw_action_buttons(draw, center_x, y, button_size=50):
    """Draw hint and shuffle buttons"""
    # Hint button
    draw.ellipse(
        [center_x - 80 - button_size, y - button_size, center_x - 80 + button_size, y + button_size],
        fill=(255, 200, 50, 180)
    )
    font = get_font(30)
    draw.text((center_x - 95, y - 15), "💡", font=font)
    
    # Shuffle button
    draw.ellipse(
        [center_x + 80 - button_size, y - button_size, center_x + 80 + button_size, y + button_size],
        fill=(100, 150, 255, 180)
    )
    draw.text((center_x + 65, y - 15), "🔄", font=font)

def create_phone_screenshot(num, width=1080, height=1920):
    """Create a phone screenshot with actual game UI"""
    img = Image.new('RGBA', (width, height), (0, 0, 0, 255))
    draw = ImageDraw.Draw(img)
    
    # Background gradient
    draw_gradient_bg(draw, width, height)
    
    # Add sparkle effects
    import random
    random.seed(num)
    for _ in range(30):
        sx = random.randint(0, width)
        sy = random.randint(0, height)
        size = random.randint(2, 5)
        alpha = random.randint(100, 200)
        draw.ellipse([sx, sy, sx + size, sy + size], fill=(255, 255, 255, alpha))
    
    # Top bar
    draw_top_bar(draw, width, coins=500 + num * 100, hints=5 - num + 1, level=num)
    
    # Different grid patterns for each screenshot
    grids = [
        # Screenshot 1 - WORD found
        [
            [' ', 'W', 'O', 'R', 'D', ' '],
            [' ', '_', '_', '_', '_', ' '],
            [' ', '_', '_', '_', '_', ' '],
            [' ', '_', '_', '_', '_', ' '],
        ],
        # Screenshot 2 - More words
        [
            ['P', 'U', 'Z', 'Z', 'L', 'E'],
            ['_', '_', '_', '_', '_', '_'],
            ['_', '_', '_', '_', '_', '_'],
            ['_', '_', '_', '_', '_', '_'],
        ],
        # Screenshot 3 - Complex grid
        [
            ['C', 'R', 'O', 'S', 'S', ' '],
            ['_', '_', '_', '_', 'W', ' '],
            ['_', '_', '_', '_', 'O', ' '],
            ['_', '_', '_', '_', 'R', ' '],
            ['_', '_', '_', '_', 'D', ' '],
        ],
        # Screenshot 4 - Almost complete
        [
            ['G', 'A', 'M', 'E', 'S', ' '],
            ['_', 'R', '_', '_', 'T', ' '],
            ['_', 'T', '_', '_', 'A', ' '],
            ['_', '_', '_', '_', 'R', ' '],
        ],
    ]
    
    grid = grids[(num - 1) % len(grids)]
    cell_size = 70
    grid_width = len(grid[0]) * cell_size
    grid_height = len(grid) * cell_size
    grid_x = (width - grid_width) // 2
    grid_y = 150
    
    draw_crossword_grid(draw, grid_x, grid_y, cell_size, grid)
    
    # Progress bar
    progress_y = grid_y + grid_height + 40
    bar_width = 400
    draw.rounded_rectangle(
        [(width - bar_width) // 2, progress_y, (width + bar_width) // 2, progress_y + 12],
        radius=6,
        fill=(255, 255, 255, 50)
    )
    fill_width = int(bar_width * (num / 4))
    draw.rounded_rectangle(
        [(width - bar_width) // 2, progress_y, (width - bar_width) // 2 + fill_width, progress_y + 12],
        radius=6,
        fill=(255, 200, 50)
    )
    
    font = get_font(20)
    draw.text(((width + bar_width) // 2 + 15, progress_y - 5), f"{num}/4", fill=(255, 255, 255), font=font)
    
    # Word display
    words = ["WORD", "PUZZLE", "CROSS", "GAMES"]
    draw_word_display(draw, width // 2, progress_y + 60, words[(num - 1) % len(words)])
    
    # Letter wheel
    wheel_y = height - 450
    letters_options = [
        ['W', 'O', 'R', 'D', 'S', 'P'],
        ['P', 'U', 'Z', 'L', 'E', 'S'],
        ['C', 'R', 'O', 'S', 'W', 'D'],
        ['G', 'A', 'M', 'E', 'S', 'T'],
    ]
    selected_options = [
        [0, 1, 2, 3],
        [0, 1, 2, 4, 3],
        [0, 1, 2, 3, 3],
        [0, 1, 2, 3, 4],
    ]
    
    draw_letter_wheel(
        draw, width // 2, wheel_y, 180,
        letters_options[(num - 1) % len(letters_options)],
        selected_options[(num - 1) % len(selected_options)]
    )
    
    # Action buttons
    draw_action_buttons(draw, width // 2, height - 120)
    
    # Convert to RGB for saving
    img_rgb = Image.new('RGB', (width, height), (40, 30, 100))
    img_rgb.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
    
    img_rgb.save(f"{OUTPUT_DIR}/phone_screenshot_{num}.png", "PNG")
    print(f"✅ Phone screenshot {num}: {width}x{height}")

def create_tablet_screenshot(size_type, num, width, height):
    """Create tablet screenshot"""
    img = Image.new('RGBA', (width, height), (0, 0, 0, 255))
    draw = ImageDraw.Draw(img)
    
    # Background
    draw_gradient_bg(draw, width, height)
    
    # Sparkles
    import random
    random.seed(num + size_type)
    for _ in range(50):
        sx = random.randint(0, width)
        sy = random.randint(0, height)
        size = random.randint(2, 6)
        draw.ellipse([sx, sy, sx + size, sy + size], fill=(255, 255, 255, 150))
    
    # Scale UI elements for tablet
    scale = width / 1080
    
    # Top bar (scaled)
    draw.rectangle([0, 0, width, int(100 * scale)], fill=(0, 0, 0, 100))
    font = get_font(int(32 * scale))
    draw.text((30, 30), f"Level {num}", fill=(255, 255, 255), font=font)
    draw.text((width - 200, 30), f"🪙 {500 + num * 100}", fill=(255, 200, 50), font=font)
    
    # Grid (larger for tablet)
    grids = [
        [
            ['W', 'O', 'R', 'D', ' ', ' '],
            ['_', '_', 'A', '_', ' ', ' '],
            ['_', '_', 'I', '_', ' ', ' '],
            ['_', '_', 'N', '_', ' ', ' '],
        ],
        [
            ['P', 'L', 'A', 'Y', ' ', ' '],
            ['_', '_', '_', '_', ' ', ' '],
            ['G', 'A', 'M', 'E', 'S', ' '],
            ['_', '_', '_', '_', '_', ' '],
        ],
    ]
    
    grid = grids[(num - 1) % len(grids)]
    cell_size = int(90 * scale)
    grid_width = len(grid[0]) * cell_size
    grid_height = len(grid) * cell_size
    grid_x = (width - grid_width) // 2
    grid_y = int(150 * scale)
    
    draw_crossword_grid(draw, grid_x, grid_y, cell_size, grid)
    
    # Letter wheel (scaled)
    wheel_radius = int(220 * scale)
    wheel_y = height - int(400 * scale)
    
    letters = ['W', 'O', 'R', 'D', 'S', 'P', 'L', 'A'][:6]
    draw_letter_wheel(draw, width // 2, wheel_y, wheel_radius, letters, [0, 1, 2, 3])
    
    # Convert to RGB
    img_rgb = Image.new('RGB', (width, height), (40, 30, 100))
    img_rgb.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
    
    filename = f"tablet_{size_type}inch_{num}.png"
    img_rgb.save(f"{OUTPUT_DIR}/{filename}", "PNG")
    print(f"✅ {size_type}-inch tablet screenshot {num}: {width}x{height}")

def create_feature_graphic():
    """Create feature graphic (1024x500) - NO TEXT as per guidelines"""
    width, height = 1024, 500
    img = Image.new('RGBA', (width, height))
    draw = ImageDraw.Draw(img)
    
    # Beautiful gradient background
    for y in range(height):
        ratio = y / height
        r = int(60 + (100 - 60) * ratio)
        g = int(40 + (60 - 40) * ratio)
        b = int(120 + (180 - 120) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Sparkle effects
    import random
    random.seed(42)
    for _ in range(40):
        sx = random.randint(0, width)
        sy = random.randint(0, height)
        size = random.randint(2, 6)
        draw.ellipse([sx, sy, sx + size, sy + size], fill=(255, 255, 255, 180))
    
    # Draw crossword grid on left side
    grid = [
        ['C', 'R', 'O', 'S', 'S'],
        ['_', '_', 'P', '_', '_'],
        ['_', '_', 'E', '_', '_'],
        ['_', '_', 'N', '_', '_'],
    ]
    cell_size = 55
    grid_x = 80
    grid_y = (height - len(grid) * cell_size) // 2
    draw_crossword_grid(draw, grid_x, grid_y, cell_size, grid)
    
    # Draw letter wheel on right side
    wheel_center_x = width - 250
    wheel_center_y = height // 2
    draw_letter_wheel(draw, wheel_center_x, wheel_center_y, 150, ['W', 'O', 'R', 'D', 'S'], [0, 1, 2, 3])
    
    # Decorative connection line between grid and wheel
    draw.line([(grid_x + len(grid[0]) * cell_size + 50, height // 2),
               (wheel_center_x - 160, height // 2)],
              fill=(255, 200, 50, 150), width=3)
    
    img_rgb = Image.new('RGB', (width, height), (60, 40, 120))
    img_rgb.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
    
    img_rgb.save(f"{OUTPUT_DIR}/feature_graphic.png", "PNG")
    print(f"✅ Feature graphic: {width}x{height}")

def create_logo():
    """Create logo (600x400 transparent PNG)"""
    width, height = 600, 400
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw stylized "CD" logo with letter wheel concept
    center_x, center_y = width // 2, height // 2
    
    # Outer ring
    radius = 150
    draw.ellipse(
        [center_x - radius, center_y - radius, center_x + radius, center_y + radius],
        outline=(255, 200, 50), width=8
    )
    
    # Inner ring
    inner_r = 120
    draw.ellipse(
        [center_x - inner_r, center_y - inner_r, center_x + inner_r, center_y + inner_r],
        outline=(255, 255, 255), width=3
    )
    
    # Letter buttons around
    letters = ['C', 'R', 'O', 'S', 'S']
    letter_radius = 90
    button_size = 30
    font = get_font(28)
    
    for i, letter in enumerate(letters):
        angle = (i * 2 * math.pi / len(letters)) - math.pi / 2
        lx = center_x + int(letter_radius * math.cos(angle))
        ly = center_y + int(letter_radius * math.sin(angle))
        
        draw.ellipse(
            [lx - button_size, ly - button_size, lx + button_size, ly + button_size],
            fill=(255, 200, 50)
        )
        
        bbox = draw.textbbox((0, 0), letter, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((lx - tw // 2, ly - th // 2 - 3), letter, fill=(40, 30, 60), font=font)
    
    # Center icon
    draw.ellipse(
        [center_x - 25, center_y - 25, center_x + 25, center_y + 25],
        fill=(255, 255, 255)
    )
    
    img.save(f"{OUTPUT_DIR}/logo_600x400.png", "PNG")
    print(f"✅ Logo: {width}x{height}")

def main():
    print("🎮 Generating Professional CrossDial Puzzles Assets...")
    print("=" * 60)
    
    # Phone screenshots (1080x1920) - 4 screenshots
    for i in range(1, 5):
        create_phone_screenshot(i)
    
    # 7-inch tablet screenshots (1200x1920) - 2 screenshots
    for i in range(1, 3):
        create_tablet_screenshot(7, i, 1200, 1920)
    
    # 10-inch tablet screenshots (1600x2560) - 2 screenshots
    for i in range(1, 3):
        create_tablet_screenshot(10, i, 1600, 2560)
    
    # Feature graphic (1024x500 - NO TEXT)
    create_feature_graphic()
    
    # Logo (600x400 transparent)
    create_logo()
    
    print("=" * 60)
    print(f"\n📁 All assets saved to: {OUTPUT_DIR}/")
    print("\nFiles created:")
    for f in sorted(os.listdir(OUTPUT_DIR)):
        filepath = os.path.join(OUTPUT_DIR, f)
        size = os.path.getsize(filepath)
        print(f"  📄 {f} ({size/1024:.1f} KB)")

if __name__ == "__main__":
    main()
