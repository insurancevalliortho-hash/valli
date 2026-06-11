import sys
import os
from PIL import Image

def resize_cover(img, target_width, target_height):
    """Resizes and crops an image to fill target dimensions (cover behavior)."""
    orig_width, orig_height = img.size
    aspect_orig = orig_width / orig_height
    aspect_target = target_width / target_height

    if aspect_orig > aspect_target:
        # Image is wider than target
        new_height = target_height
        new_width = int(aspect_orig * new_height)
        img_resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        # Crop horizontally
        left = (new_width - target_width) // 2
        img_cropped = img_resized.crop((left, 0, left + target_width, target_height))
    else:
        # Image is taller than target
        new_width = target_width
        new_height = int(new_width / aspect_orig)
        img_resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        # Crop vertically
        top = (new_height - target_height) // 2
        img_cropped = img_resized.crop((0, top, target_width, top + target_height))

    return img_cropped

def remove_background_floodfill(img, threshold=240):
    """Flood fills from edges to remove white background, keeping internal whites."""
    img = img.convert("RGBA")
    width, height = img.size
    data = img.load()
    
    visited = set()
    queue = []
    
    # Initialize queue with all edge pixels that meet the threshold
    for x in range(width):
        for y in [0, height - 1]:
            r, g, b, a = data[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                queue.append((x, y))
                visited.add((x, y))
    for y in range(height):
        for x in [0, width - 1]:
            r, g, b, a = data[x, y]
            if r >= threshold and g >= threshold and b >= threshold and (x, y) not in visited:
                queue.append((x, y))
                visited.add((x, y))
                
    # Breadth First Search (BFS) to flood fill
    head = 0
    while head < len(queue):
        cx, cy = queue[head]
        head += 1
        
        # Make transparent
        data[cx, cy] = (0, 0, 0, 0)
        
        # Check neighbors
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < width and 0 <= ny < height:
                if (nx, ny) not in visited:
                    r, g, b, a = data[nx, ny]
                    if r >= threshold and g >= threshold and b >= threshold:
                        visited.add((nx, ny))
                        queue.append((nx, ny))
                        
    # For any remaining pixels that are extremely close to pure white, let's also soften them
    # or make them transparent if they are on the outer edge.
    return img

def main():
    if len(sys.argv) < 5:
        print("Usage: python3 process_images.py <action> <input_path> <output_path> <params...>")
        sys.exit(1)
        
    action = sys.argv[1]
    input_path = sys.argv[2]
    output_path = sys.argv[3]
    
    if not os.path.exists(input_path):
        print(f"Error: Input file {input_path} does not exist.")
        sys.exit(1)
        
    img = Image.open(input_path)
    
    if action == "resize_cover":
        w = int(sys.argv[4])
        h = int(sys.argv[5])
        out_img = resize_cover(img, w, h)
        out_img.save(output_path, "PNG")
        print(f"Successfully resized cover and saved to {output_path}")
        
    elif action == "runner_overlay":
        w = int(sys.argv[4])
        h = int(sys.argv[5])
        # First remove white background
        transparent_img = remove_background_floodfill(img, threshold=240)
        # Then resize to cover or fit
        out_img = resize_cover(transparent_img, w, h)
        out_img.save(output_path, "PNG")
        print(f"Successfully processed runner overlay and saved to {output_path}")
        
    elif action == "icon":
        # Icons are square, resize to w x h and optionally make white background transparent
        w = int(sys.argv[4])
        h = int(sys.argv[5])
        # For the icons, they should be transparent background with the teal art.
        # Since they are generated as teal on white style, we should make all white transparent.
        # Because icons are simple, any white pixel can be made transparent.
        img = img.convert("RGBA")
        data = img.load()
        for x in range(img.width):
            for y in range(img.height):
                r, g, b, a = data[x, y]
                # If it's near white, make it transparent
                if r >= 230 and g >= 230 and b >= 230:
                    data[x, y] = (0, 0, 0, 0)
        
        # Resize to square
        out_img = img.resize((w, h), Image.Resampling.LANCZOS)
        out_img.save(output_path, "PNG")
        print(f"Successfully processed icon and saved to {output_path}")

if __name__ == "__main__":
    main()
