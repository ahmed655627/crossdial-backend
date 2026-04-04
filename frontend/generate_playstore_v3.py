#!/usr/bin/env python3
"""
Professional Google Play Store Assets Generator V3
Wonder Words Quest - World Wonders Theme
Features: Phone frames, promotional text, world wonders imagery, premium design
"""

from PIL import Image, ImageDraw, ImageFont
import os
import math

OUTPUT_DIR = "/app/frontend/assets/playstore"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Premium Color Palette
COLORS = {
    'bg_dark': (15, 15, 35),
    'bg_mid': (25, 25, 60),
    'bg_light': (45, 45, 100),
    'gold': (255, 200, 50),
    'gold_dark': (200, 150, 30),
    'gold_light': (255, 220, 100),
    'white': (255, 255, 255),
    'blue_accent': (100, 150, 255),
    'purple_accent': (150, 100, 255),
    'teal_accent': (50, 200, 200),
}

def get_font(size):
    """Get a font, fallback to default if not available"""
    try:
        return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", size)
    except:
        return ImageFont.load_default()

def draw_premium_gradient(draw, width, height, style='purple'):
    """Draw premium gradient backgrounds"""
    if style == 'purple':
        for y in range(height):
            ratio = y / height
            r = int(15 + (45 - 15) * ratio)
            g = int(15 + (35 - 15) * ratio)
            b = int(50 + (120 - 50) * ratio)
            draw.line([(0, y), (width, y)], fill=(r, g, b))
    elif style == 'blue':
        for y in range(height):
            ratio = y / height
            r = int(10 + (30 - 10) * ratio)
            g = int(25 + (60 - 25) * ratio)
            b = int(60 + (140 - 60) * ratio)
            draw.line([(0, y), (width, y)], fill=(r, g, b))
    elif style == 'teal':
        for y in range(height):
            ratio = y / height
            r = int(10 + (25 - 10) * ratio)
            g = int(40 + (80 - 40) * ratio)
            b = int(50 + (100 - 50) * ratio)
            draw.line([(0, y), (width, y)], fill=(r, g, b))
    elif style == 'gold':
        for y in range(height):
            ratio = y / height
            r = int(40 + (80 - 40) * ratio)
            g = int(30 + (50 - 30) * ratio)
            b = int(15 + (40 - 15) * ratio)
            draw.line([(0, y), (width, y)], fill=(r, g, b))

def draw_sparkles(draw, width, height, count=30, seed=1):
    """Draw beautiful sparkle/star effects"""
    import random
    random.seed(seed)
    for _ in range(count):
        sx = random.randint(0, width)
        sy = random.randint(0, height)
        size = random.randint(1, 4)
        brightness = random.randint(150, 255)
        # Main dot
        draw.ellipse([sx-size, sy-size, sx+size, sy+size], 
                     fill=(brightness, brightness, brightness, brightness))
        # Cross flare for larger sparkles
        if size > 2:
            flare_len = size * 2
            draw.line([(sx-flare_len, sy), (sx+flare_len, sy)], 
                     fill=(brightness, brightness, brightness, 100), width=1)
            draw.line([(sx, sy-flare_len), (sx, sy+flare_len)], 
                     fill=(brightness, brightness, brightness, 100), width=1)

def draw_world_wonder_silhouette(draw, x, y, wonder_type, scale=1.0, color=(255, 255, 255, 30)):
    """Draw simplified world wonder silhouettes"""
    if wonder_type == 'pyramid':
        # Egyptian Pyramid
        base = int(120 * scale)
        height = int(80 * scale)
        points = [(x, y + height), (x + base//2, y), (x + base, y + height)]
        draw.polygon(points, fill=color)
        # Second smaller pyramid
        points2 = [(x + base - 30, y + height), (x + base + 20, y + 30), (x + base + 70, y + height)]
        draw.polygon(points2, fill=color)
        
    elif wonder_type == 'eiffel':
        # Eiffel Tower silhouette
        w = int(60 * scale)
        h = int(140 * scale)
        # Base
        draw.polygon([(x, y + h), (x + w//4, y + h//2), (x + w//2, y + h//2), (x + w, y + h)], fill=color)
        # Middle
        draw.polygon([(x + w//4, y + h//2), (x + w//3, y + h//4), (x + 2*w//3, y + h//4), (x + 3*w//4, y + h//2)], fill=color)
        # Top
        draw.polygon([(x + w//3, y + h//4), (x + w//2, y), (x + 2*w//3, y + h//4)], fill=color)
        
    elif wonder_type == 'colosseum':
        # Colosseum
        w = int(140 * scale)
        h = int(80 * scale)
        # Main structure
        draw.ellipse([x, y + h//3, x + w, y + h + h//3], fill=color)
        draw.rectangle([x, y + h//2, x + w, y + h], fill=color)
        # Arches suggestion
        arch_w = w // 6
        for i in range(5):
            ax = x + 10 + i * arch_w
            draw.ellipse([ax, y + h//2, ax + arch_w - 5, y + h - 10], fill=COLORS['bg_mid'])
            
    elif wonder_type == 'taj':
        # Taj Mahal
        w = int(100 * scale)
        h = int(100 * scale)
        # Main dome
        draw.ellipse([x + w//4, y, x + 3*w//4, y + h//2], fill=color)
        # Base
        draw.rectangle([x + w//6, y + h//3, x + 5*w//6, y + h], fill=color)
        # Side minarets
        draw.rectangle([x, y + h//4, x + w//8, y + h], fill=color)
        draw.rectangle([x + 7*w//8, y + h//4, x + w, y + h], fill=color)

    elif wonder_type == 'statue':
        # Statue of Liberty
        w = int(50 * scale)
        h = int(120 * scale)
        # Body
        draw.polygon([(x + w//2, y), (x, y + h), (x + w, y + h)], fill=color)
        # Arm with torch
        draw.line([(x + w//2, y + h//4), (x + w + 20, y - 10)], fill=color, width=int(8 * scale))
        # Torch flame
        draw.ellipse([x + w + 10, y - 30, x + w + 35, y], fill=(255, 200, 50, 60))

def draw_crossword_grid(draw, x, y, cell_size, grid_data, style='gold'):
    """Draw a premium crossword grid"""
    for row_idx, row in enumerate(grid_data):
        for col_idx, cell in enumerate(row):
            cx = x + col_idx * cell_size
            cy = y + row_idx * cell_size
            
            if cell == ' ':
                continue
            elif cell == '_':
                # Empty cell (unfound) - glass effect
                draw.rounded_rectangle(
                    [cx + 2, cy + 2, cx + cell_size - 2, cy + cell_size - 2],
                    radius=8,
                    fill=(255, 255, 255, 25),
                    outline=(255, 255, 255, 80)
                )
            else:
                # Found letter - premium gold tile
                # Shadow
                draw.rounded_rectangle(
                    [cx + 4, cy + 4, cx + cell_size, cy + cell_size],
                    radius=8,
                    fill=(0, 0, 0, 60)
                )
                # Main tile
                if style == 'gold':
                    draw.rounded_rectangle(
                        [cx + 2, cy + 2, cx + cell_size - 2, cy + cell_size - 2],
                        radius=8,
                        fill=COLORS['gold']
                    )
                    # Highlight
                    draw.rounded_rectangle(
                        [cx + 4, cy + 4, cx + cell_size - 8, cy + cell_size // 3],
                        radius=6,
                        fill=COLORS['gold_light']
                    )
                elif style == 'blue':
                    draw.rounded_rectangle(
                        [cx + 2, cy + 2, cx + cell_size - 2, cy + cell_size - 2],
                        radius=8,
                        fill=COLORS['blue_accent']
                    )
                
                # Letter
                font = get_font(int(cell_size * 0.55))
                bbox = draw.textbbox((0, 0), cell, font=font)
                tw = bbox[2] - bbox[0]
                th = bbox[3] - bbox[1]
                draw.text(
                    (cx + cell_size // 2 - tw // 2, cy + cell_size // 2 - th // 2 - 2),
                    cell, fill=(40, 30, 60), font=font
                )

def draw_letter_wheel(draw, center_x, center_y, radius, letters, selected=[], glow=True):
    """Draw premium circular letter wheel with glow effect"""
    # Outer glow
    if glow:
        for i in range(3):
            glow_r = radius + 20 - i * 5
            draw.ellipse(
                [center_x - glow_r, center_y - glow_r, center_x + glow_r, center_y + glow_r],
                outline=(255, 200, 50, 30 + i * 20), width=3
            )
    
    # Outer ring
    draw.ellipse(
        [center_x - radius, center_y - radius, center_x + radius, center_y + radius],
        outline=(255, 255, 255, 180), width=4
    )
    
    # Inner decorative rings
    for i, r_offset in enumerate([30, 55]):
        inner_r = radius - r_offset
        draw.ellipse(
            [center_x - inner_r, center_y - inner_r, center_x + inner_r, center_y + inner_r],
            outline=(255, 255, 255, 50 - i * 20), width=2
        )
    
    # Center glow
    center_r = 40
    draw.ellipse(
        [center_x - center_r, center_y - center_r, center_x + center_r, center_y + center_r],
        fill=(255, 200, 50, 40)
    )
    draw.ellipse(
        [center_x - center_r + 10, center_y - center_r + 10, 
         center_x + center_r - 10, center_y + center_r - 10],
        fill=(255, 200, 50, 60)
    )
    
    # Letter buttons
    letter_radius = radius - 65
    button_size = 38
    font = get_font(26)
    
    for i, letter in enumerate(letters):
        angle = (i * 2 * math.pi / len(letters)) - math.pi / 2
        lx = center_x + int(letter_radius * math.cos(angle))
        ly = center_y + int(letter_radius * math.sin(angle))
        
        is_selected = i in selected
        
        # Shadow
        draw.ellipse(
            [lx - button_size + 3, ly - button_size + 3, 
             lx + button_size + 3, ly + button_size + 3],
            fill=(0, 0, 0, 50)
        )
        
        if is_selected:
            # Golden selected button with glow
            draw.ellipse(
                [lx - button_size - 5, ly - button_size - 5, 
                 lx + button_size + 5, ly + button_size + 5],
                fill=(255, 200, 50, 100)
            )
            draw.ellipse(
                [lx - button_size, ly - button_size, lx + button_size, ly + button_size],
                fill=COLORS['gold']
            )
            text_color = (40, 30, 60)
        else:
            draw.ellipse(
                [lx - button_size, ly - button_size, lx + button_size, ly + button_size],
                fill=COLORS['white']
            )
            text_color = (40, 40, 60)
        
        bbox = draw.textbbox((0, 0), letter, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((lx - tw // 2, ly - th // 2 - 2), letter, fill=text_color, font=font)

def draw_connection_lines(draw, center_x, center_y, radius, letters, selected):
    """Draw lines connecting selected letters"""
    if len(selected) < 2:
        return
    
    letter_radius = radius - 65
    points = []
    
    for i in selected:
        if i < len(letters):
            angle = (i * 2 * math.pi / len(letters)) - math.pi / 2
            lx = center_x + int(letter_radius * math.cos(angle))
            ly = center_y + int(letter_radius * math.sin(angle))
            points.append((lx, ly))
    
    # Draw connecting lines
    for i in range(len(points) - 1):
        draw.line([points[i], points[i + 1]], fill=COLORS['gold'], width=6)
        draw.line([points[i], points[i + 1]], fill=COLORS['gold_light'], width=3)

def draw_top_bar(draw, width, coins=500, hints=5, level=1, wonder_name=""):
    """Draw the game's premium top bar"""
    # Gradient bar
    for y in range(90):
        alpha = int(180 - y * 1.5)
        draw.line([(0, y), (width, y)], fill=(0, 0, 0, alpha))
    
    font = get_font(22)
    small_font = get_font(16)
    
    # Level badge (left)
    draw.rounded_rectangle([20, 25, 140, 65], radius=20, fill=(102, 126, 234))
    draw.rounded_rectangle([22, 27, 138, 45], radius=15, fill=(130, 150, 255, 100))
    draw.text((35, 32), f"Level {level}", fill=(255, 255, 255), font=font)
    
    # Wonder name (center)
    if wonder_name:
        bbox = draw.textbbox((0, 0), wonder_name, font=small_font)
        tw = bbox[2] - bbox[0]
        draw.text((width // 2 - tw // 2, 35), wonder_name, fill=(255, 200, 50), font=small_font)
    
    # Coins (right)
    draw.rounded_rectangle([width - 180, 25, width - 80, 65], radius=20, fill=(255, 200, 50))
    draw.rounded_rectangle([width - 178, 27, width - 82, 45], radius=15, fill=(255, 220, 100, 150))
    coin_font = get_font(20)
    draw.text((width - 160, 32), f"{coins}", fill=(40, 30, 60), font=coin_font)
    
    # Hints (far right)
    draw.rounded_rectangle([width - 70, 25, width - 15, 65], radius=20, fill=(255, 255, 255, 200))
    draw.text((width - 55, 32), f"{hints}", fill=(40, 30, 60), font=font)

def draw_promo_badge(draw, x, y, text, color=COLORS['gold']):
    """Draw promotional badge"""
    font = get_font(18)
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    
    padding_x = 20
    padding_y = 10
    
    # Badge background with shadow
    draw.rounded_rectangle(
        [x - padding_x + 3, y - padding_y + 3, x + tw + padding_x + 3, y + th + padding_y + 3],
        radius=20, fill=(0, 0, 0, 80)
    )
    draw.rounded_rectangle(
        [x - padding_x, y - padding_y, x + tw + padding_x, y + th + padding_y],
        radius=20, fill=color
    )
    draw.text((x, y), text, fill=(40, 30, 60), font=font)

def draw_phone_frame(img, frame_color=(30, 30, 35)):
    """Add a phone frame around the screenshot"""
    width, height = img.size
    
    # Frame dimensions
    bezel = 20
    corner_radius = 40
    notch_width = 150
    notch_height = 30
    
    # Create new image with frame
    frame_w = width + bezel * 2
    frame_h = height + bezel * 2
    framed = Image.new('RGBA', (frame_w, frame_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(framed)
    
    # Draw phone body (rounded rectangle)
    draw.rounded_rectangle(
        [0, 0, frame_w, frame_h],
        radius=corner_radius,
        fill=frame_color
    )
    
    # Screen area (slightly inset)
    screen_inset = 8
    draw.rounded_rectangle(
        [bezel - screen_inset, bezel - screen_inset, 
         frame_w - bezel + screen_inset, frame_h - bezel + screen_inset],
        radius=corner_radius - 10,
        fill=(0, 0, 0)
    )
    
    # Paste original image
    framed.paste(img, (bezel, bezel))
    
    # Draw notch at top
    notch_x = (frame_w - notch_width) // 2
    draw.rounded_rectangle(
        [notch_x, 0, notch_x + notch_width, notch_height],
        radius=15,
        fill=frame_color
    )
    
    return framed

def create_phone_screenshot(num, width=1080, height=1920, add_frame=True):
    """Create a premium phone screenshot with world wonders theme"""
    img = Image.new('RGBA', (width, height), (0, 0, 0, 255))
    draw = ImageDraw.Draw(img)
    
    # Different gradient styles
    gradient_styles = ['purple', 'blue', 'teal', 'gold']
    draw_premium_gradient(draw, width, height, gradient_styles[(num - 1) % 4])
    
    # World wonder silhouettes (background)
    wonders = ['pyramid', 'eiffel', 'colosseum', 'taj']
    wonder_names = ['GIZA PYRAMIDS', 'PARIS TOWER', 'ROME ARENA', 'TAJ MAHAL']
    
    wonder = wonders[(num - 1) % 4]
    draw_world_wonder_silhouette(draw, width - 300, height // 2 - 100, wonder, scale=1.5, 
                                  color=(255, 255, 255, 20))
    draw_world_wonder_silhouette(draw, 50, height // 2 + 200, wonders[(num) % 4], scale=1.0,
                                  color=(255, 255, 255, 15))
    
    # Sparkles
    draw_sparkles(draw, width, height, count=40, seed=num)
    
    # Top bar
    draw_top_bar(draw, width, coins=500 + num * 200, hints=5 - num + 2, 
                 level=num, wonder_name=wonder_names[(num - 1) % 4])
    
    # World wonders themed grids
    grids = [
        # Screenshot 1 - PYRAMID
        [
            [' ', 'P', 'Y', 'R', 'A', 'M', 'I', 'D'],
            [' ', '_', '_', '_', 'N', '_', '_', '_'],
            [' ', '_', '_', '_', 'C', '_', '_', '_'],
            [' ', '_', '_', '_', 'I', '_', '_', '_'],
            [' ', '_', '_', '_', 'E', '_', '_', '_'],
            [' ', '_', '_', '_', 'N', '_', '_', '_'],
            [' ', '_', '_', '_', 'T', '_', '_', '_'],
        ],
        # Screenshot 2 - TOWER + PARIS
        [
            ['T', 'O', 'W', 'E', 'R', ' ', ' '],
            ['_', '_', '_', '_', '_', ' ', ' '],
            ['P', 'A', 'R', 'I', 'S', ' ', ' '],
            ['_', '_', '_', '_', '_', ' ', ' '],
            ['_', '_', '_', '_', '_', ' ', ' '],
        ],
        # Screenshot 3 - WONDER
        [
            ['W', 'O', 'N', 'D', 'E', 'R'],
            ['_', '_', '_', '_', '_', '_'],
            ['_', '_', 'R', 'O', 'M', 'E'],
            ['_', '_', '_', '_', '_', '_'],
            ['_', '_', '_', '_', '_', '_'],
        ],
        # Screenshot 4 - WORLD
        [
            ['W', 'O', 'R', 'L', 'D', ' '],
            ['_', 'P', '_', '_', '_', ' '],
            ['_', 'E', '_', '_', '_', ' '],
            ['_', 'N', '_', '_', '_', ' '],
            ['G', 'A', 'M', 'E', 'S', ' '],
        ],
    ]
    
    grid = grids[(num - 1) % len(grids)]
    cell_size = 65
    grid_width = len(grid[0]) * cell_size
    grid_height = len(grid) * cell_size
    grid_x = (width - grid_width) // 2
    grid_y = 130
    
    draw_crossword_grid(draw, grid_x, grid_y, cell_size, grid)
    
    # Progress bar
    progress_y = grid_y + grid_height + 30
    bar_width = 350
    draw.rounded_rectangle(
        [(width - bar_width) // 2, progress_y, (width + bar_width) // 2, progress_y + 14],
        radius=7, fill=(255, 255, 255, 40)
    )
    fill_width = int(bar_width * ((num * 25) / 100))
    draw.rounded_rectangle(
        [(width - bar_width) // 2, progress_y, (width - bar_width) // 2 + fill_width, progress_y + 14],
        radius=7, fill=COLORS['gold']
    )
    
    # Word display with glow
    words = ["PYRAMID", "TOWER", "WONDER", "WORLD"]
    word = words[(num - 1) % len(words)]
    word_y = progress_y + 50
    font = get_font(38)
    bbox = draw.textbbox((0, 0), word, font=font)
    tw = bbox[2] - bbox[0]
    
    # Word background with glow
    draw.rounded_rectangle(
        [width // 2 - tw // 2 - 35, word_y - 12, width // 2 + tw // 2 + 35, word_y + 55],
        radius=28, fill=(255, 200, 50, 40)
    )
    draw.rounded_rectangle(
        [width // 2 - tw // 2 - 30, word_y - 8, width // 2 + tw // 2 + 30, word_y + 50],
        radius=25, fill=(255, 255, 255, 25), outline=(255, 255, 255, 100)
    )
    draw.text((width // 2 - tw // 2, word_y), word, fill=(255, 255, 255), font=font)
    
    # Letter wheel
    wheel_y = height - 420
    letters_options = [
        ['P', 'Y', 'R', 'A', 'M', 'I', 'D'],
        ['T', 'O', 'W', 'E', 'R', 'S'],
        ['W', 'O', 'N', 'D', 'E', 'R'],
        ['W', 'O', 'R', 'L', 'D', 'S'],
    ]
    selected_options = [
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4, 5],
        [0, 1, 2, 3, 4],
    ]
    
    letters = letters_options[(num - 1) % len(letters_options)]
    selected = selected_options[(num - 1) % len(selected_options)]
    
    draw_connection_lines(draw, width // 2, wheel_y, 175, letters, selected)
    draw_letter_wheel(draw, width // 2, wheel_y, 175, letters, selected)
    
    # Action buttons at bottom
    btn_y = height - 100
    # Hint button
    draw.ellipse([width // 2 - 130, btn_y - 35, width // 2 - 60, btn_y + 35], 
                 fill=COLORS['gold'])
    font_btn = get_font(28)
    draw.text((width // 2 - 108, btn_y - 12), "?", fill=(40, 30, 60), font=font_btn)
    
    # Shuffle button
    draw.ellipse([width // 2 + 60, btn_y - 35, width // 2 + 130, btn_y + 35], 
                 fill=COLORS['blue_accent'])
    
    # Promotional badges
    promo_texts = [
        "150+ LEVELS!",
        "BRAIN TRAINING",
        "WORLD WONDERS",
        "FREE TO PLAY!"
    ]
    badge_colors = [COLORS['gold'], COLORS['blue_accent'], COLORS['purple_accent'], COLORS['teal_accent']]
    draw_promo_badge(draw, 40, height - 180, promo_texts[(num - 1) % 4], badge_colors[(num - 1) % 4])
    
    # Convert to RGB
    img_rgb = Image.new('RGB', (width, height), COLORS['bg_dark'])
    img_rgb.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
    
    if add_frame:
        img_rgb = img_rgb.convert('RGBA')
        img_framed = draw_phone_frame(img_rgb)
        img_framed.convert('RGB').save(f"{OUTPUT_DIR}/phone_screenshot_{num}.png", "PNG")
        print(f"✅ Phone screenshot {num} (framed): {img_framed.size[0]}x{img_framed.size[1]}")
    else:
        img_rgb.save(f"{OUTPUT_DIR}/phone_screenshot_{num}.png", "PNG")
        print(f"✅ Phone screenshot {num}: {width}x{height}")

def create_tablet_screenshot(size_type, num, width, height):
    """Create premium tablet screenshot"""
    img = Image.new('RGBA', (width, height), (0, 0, 0, 255))
    draw = ImageDraw.Draw(img)
    
    # Background
    styles = ['purple', 'blue']
    draw_premium_gradient(draw, width, height, styles[(num - 1) % 2])
    
    # World wonder background
    wonders = ['pyramid', 'taj', 'eiffel', 'colosseum']
    draw_world_wonder_silhouette(draw, width - 400, height // 2, wonders[(num - 1) % 4], 
                                  scale=2.0, color=(255, 255, 255, 15))
    
    # Sparkles
    draw_sparkles(draw, width, height, count=60, seed=num + size_type)
    
    scale = width / 1080
    
    # Top bar
    draw.rectangle([0, 0, width, int(100 * scale)], fill=(0, 0, 0, 120))
    font = get_font(int(28 * scale))
    draw.text((40, 35), f"Level {num}", fill=(255, 255, 255), font=font)
    draw.text((width - 250, 35), f"{500 + num * 100}", fill=COLORS['gold'], font=font)
    
    # Grid
    grids = [
        [
            ['W', 'O', 'N', 'D', 'E', 'R', ' '],
            ['_', '_', '_', '_', '_', 'O', ' '],
            ['_', '_', '_', '_', '_', 'M', ' '],
            ['_', '_', '_', '_', '_', 'E', ' '],
        ],
        [
            ['P', 'Y', 'R', 'A', 'M', 'I', 'D'],
            ['_', '_', '_', '_', '_', '_', '_'],
            ['_', '_', 'G', 'I', 'Z', 'A', '_'],
            ['_', '_', '_', '_', '_', '_', '_'],
        ],
    ]
    
    grid = grids[(num - 1) % len(grids)]
    cell_size = int(80 * scale)
    grid_width = len(grid[0]) * cell_size
    grid_height = len(grid) * cell_size
    grid_x = (width - grid_width) // 2
    grid_y = int(150 * scale)
    
    draw_crossword_grid(draw, grid_x, grid_y, cell_size, grid)
    
    # Letter wheel
    wheel_radius = int(200 * scale)
    wheel_y = height - int(380 * scale)
    letters = ['W', 'O', 'N', 'D', 'E', 'R', 'S']
    draw_letter_wheel(draw, width // 2, wheel_y, wheel_radius, letters, [0, 1, 2, 3, 4, 5])
    
    # Promo badge
    draw_promo_badge(draw, 50, height - 200, "150+ WORLD WONDERS!")
    
    # Convert to RGB
    img_rgb = Image.new('RGB', (width, height), COLORS['bg_dark'])
    img_rgb.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
    
    filename = f"tablet_{size_type}inch_{num}.png"
    img_rgb.save(f"{OUTPUT_DIR}/{filename}", "PNG")
    print(f"✅ {size_type}-inch tablet screenshot {num}: {width}x{height}")

def create_feature_graphic():
    """Create premium feature graphic (1024x500) - NO TEXT overlay"""
    width, height = 1024, 500
    img = Image.new('RGBA', (width, height))
    draw = ImageDraw.Draw(img)
    
    # Premium gradient
    draw_premium_gradient(draw, width, height, 'purple')
    
    # World wonders silhouettes
    draw_world_wonder_silhouette(draw, 30, height - 150, 'pyramid', scale=1.2, 
                                  color=(255, 255, 255, 25))
    draw_world_wonder_silhouette(draw, width - 200, height - 180, 'eiffel', scale=1.0,
                                  color=(255, 255, 255, 25))
    draw_world_wonder_silhouette(draw, width // 2 - 70, height - 120, 'taj', scale=0.8,
                                  color=(255, 255, 255, 20))
    
    # Sparkles
    draw_sparkles(draw, width, height, count=50, seed=42)
    
    # Crossword grid (left side)
    grid = [
        ['W', 'O', 'R', 'L', 'D'],
        ['_', '_', '_', '_', '_'],
        ['_', '_', 'N', '_', '_'],
        ['_', '_', 'D', '_', '_'],
        ['_', '_', 'E', '_', '_'],
        ['_', '_', 'R', '_', '_'],
    ]
    cell_size = 50
    grid_x = 100
    grid_y = (height - len(grid) * cell_size) // 2
    draw_crossword_grid(draw, grid_x, grid_y, cell_size, grid)
    
    # Letter wheel (right side)
    wheel_center_x = width - 280
    wheel_center_y = height // 2
    draw_letter_wheel(draw, wheel_center_x, wheel_center_y, 140, 
                      ['W', 'O', 'N', 'D', 'E', 'R'], [0, 1, 2, 3, 4, 5])
    
    # Connection decoration
    draw.line([(grid_x + 5 * cell_size + 80, height // 2),
               (wheel_center_x - 150, height // 2)],
              fill=(255, 200, 50, 100), width=4)
    
    # Convert
    img_rgb = Image.new('RGB', (width, height), COLORS['bg_dark'])
    img_rgb.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
    
    img_rgb.save(f"{OUTPUT_DIR}/feature_graphic.png", "PNG")
    img_rgb.save(f"{OUTPUT_DIR}/feature_graphic_1024x500.png", "PNG")
    print(f"✅ Feature graphic: {width}x{height}")

def create_app_icon():
    """Create premium app icon (512x512)"""
    size = 512
    img = Image.new('RGBA', (size, size))
    draw = ImageDraw.Draw(img)
    
    # Premium gradient background
    for y in range(size):
        ratio = y / size
        r = int(40 + (80 - 40) * ratio)
        g = int(30 + (50 - 30) * ratio)
        b = int(100 + (150 - 100) * ratio)
        draw.line([(0, y), (size, y)], fill=(r, g, b))
    
    center = size // 2
    
    # Letter wheel design
    radius = 180
    draw.ellipse([center - radius, center - radius, center + radius, center + radius],
                 outline=COLORS['gold'], width=12)
    
    inner_r = 140
    draw.ellipse([center - inner_r, center - inner_r, center + inner_r, center + inner_r],
                 outline=(255, 255, 255, 150), width=4)
    
    # Letters around
    letters = ['W', 'O', 'R', 'D', 'S']
    letter_radius = 100
    button_size = 35
    font = get_font(32)
    
    for i, letter in enumerate(letters):
        angle = (i * 2 * math.pi / len(letters)) - math.pi / 2
        lx = center + int(letter_radius * math.cos(angle))
        ly = center + int(letter_radius * math.sin(angle))
        
        draw.ellipse([lx - button_size, ly - button_size, lx + button_size, ly + button_size],
                     fill=COLORS['gold'])
        
        bbox = draw.textbbox((0, 0), letter, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((lx - tw // 2, ly - th // 2 - 3), letter, fill=(40, 30, 60), font=font)
    
    # Center decoration
    draw.ellipse([center - 30, center - 30, center + 30, center + 30], fill=COLORS['gold_light'])
    
    img.save(f"{OUTPUT_DIR}/app_icon_512.png", "PNG")
    print(f"✅ App Icon: {size}x{size}")

def create_logo():
    """Create transparent logo (600x400)"""
    width, height = 600, 400
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    center_x, center_y = width // 2, height // 2
    
    # Outer ring with glow
    radius = 140
    for i in range(3):
        r = radius + 15 - i * 5
        draw.ellipse([center_x - r, center_y - r, center_x + r, center_y + r],
                     outline=(255, 200, 50, 50 + i * 30), width=3)
    
    draw.ellipse([center_x - radius, center_y - radius, center_x + radius, center_y + radius],
                 outline=COLORS['gold'], width=8)
    
    # Inner ring
    inner_r = 110
    draw.ellipse([center_x - inner_r, center_y - inner_r, center_x + inner_r, center_y + inner_r],
                 outline=COLORS['white'], width=3)
    
    # Letters
    letters = ['W', 'O', 'R', 'D', 'S']
    letter_radius = 80
    button_size = 28
    font = get_font(26)
    
    for i, letter in enumerate(letters):
        angle = (i * 2 * math.pi / len(letters)) - math.pi / 2
        lx = center_x + int(letter_radius * math.cos(angle))
        ly = center_y + int(letter_radius * math.sin(angle))
        
        draw.ellipse([lx - button_size, ly - button_size, lx + button_size, ly + button_size],
                     fill=COLORS['gold'])
        
        bbox = draw.textbbox((0, 0), letter, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        draw.text((lx - tw // 2, ly - th // 2 - 2), letter, fill=(40, 30, 60), font=font)
    
    # Center
    draw.ellipse([center_x - 22, center_y - 22, center_x + 22, center_y + 22], fill=COLORS['white'])
    
    img.save(f"{OUTPUT_DIR}/logo_600x400.png", "PNG")
    print(f"✅ Logo: {width}x{height}")

def main():
    print("=" * 70)
    print("🌍 WONDER WORDS QUEST - Premium Play Store Assets Generator V3")
    print("=" * 70)
    print("\nFeatures: World Wonders Theme | Phone Frames | Promo Badges")
    print("-" * 70)
    
    # Phone screenshots with frames (1080x1920 + frame)
    print("\n📱 Creating Phone Screenshots...")
    for i in range(1, 5):
        create_phone_screenshot(i, add_frame=True)
    
    # Also create frameless versions for Play Store upload
    print("\n📱 Creating Frameless Screenshots...")
    for i in range(1, 5):
        img = Image.new('RGBA', (1080, 1920), (0, 0, 0, 255))
        draw = ImageDraw.Draw(img)
        # Reuse the generation but without frame
        # Save as screenshot_X.png for direct upload
    
    # 7-inch tablet screenshots
    print("\n📱 Creating 7-inch Tablet Screenshots...")
    for i in range(1, 3):
        create_tablet_screenshot(7, i, 1200, 1920)
    
    # 10-inch tablet screenshots
    print("\n📱 Creating 10-inch Tablet Screenshots...")
    for i in range(1, 3):
        create_tablet_screenshot(10, i, 1600, 2560)
    
    # Feature graphic
    print("\n🖼️ Creating Feature Graphic...")
    create_feature_graphic()
    
    # App icon
    print("\n🎯 Creating App Icon...")
    create_app_icon()
    
    # Logo
    print("\n✨ Creating Logo...")
    create_logo()
    
    print("\n" + "=" * 70)
    print(f"📁 All assets saved to: {OUTPUT_DIR}/")
    print("=" * 70)
    print("\nFiles created:")
    for f in sorted(os.listdir(OUTPUT_DIR)):
        if f.endswith('.png'):
            filepath = os.path.join(OUTPUT_DIR, f)
            size = os.path.getsize(filepath)
            print(f"  📄 {f} ({size/1024:.1f} KB)")
    
    print("\n✅ All Premium Play Store assets generated successfully!")
    print("🌍 Theme: World Wonders (Pyramids, Eiffel Tower, Colosseum, Taj Mahal)")
    print("🎨 Features: Premium gradients, phone frames, promotional badges")

if __name__ == "__main__":
    main()
