import os
from pathlib import Path

def rename_files():
    # Get absolute path to images folder
    base_dir = Path(__file__).parent
    image_dir = base_dir / "images"
    video_dir = image_dir / "Videos"
    
    print(f"Looking for images in: {image_dir}")
    print(f"Looking for videos in: {video_dir}")

    # Verify directories exist
    if not image_dir.exists():
        print(f"Error: Images directory not found at {image_dir}")
        return
    
    # Supported formats
    image_extensions = ('.png', '.jpg', '.jpeg', '.gif', '.JPG', '.PNG')
    video_extensions = ('.mp4', '.mkv')
    
    # Create backup of original names
    with open(base_dir / 'original_filenames.txt', 'w') as f:
        f.write("Original filenames:\n")
        for file in image_dir.rglob('*'):
            if file.is_file():
                f.write(f"{file.name}\n")
    
    # Rename images
    print("\nRenaming images...")
    image_files = [f for f in image_dir.glob('*') if f.suffix.lower() in image_extensions]
    for index, file in enumerate(sorted(image_files), start=1):
        if file.is_file():
            extension = file.suffix
            new_name = file.parent / f"image_{index}{extension}"
            try:
                print(f"Renaming: {file.name} -> {new_name.name}")
                file.rename(new_name)
            except Exception as e:
                print(f"Error renaming {file.name}: {e}")
    
    # Rename videos
    if video_dir.exists():
        print("\nRenaming videos...")
        video_files = [f for f in video_dir.glob('*') if f.suffix.lower() in video_extensions]
        for index, file in enumerate(sorted(video_files), start=1):
            if file.is_file():
                extension = file.suffix
                new_name = file.parent / f"video_{index}{extension}"
                try:
                    print(f"Renaming: {file.name} -> {new_name.name}")
                    file.rename(new_name)
                except Exception as e:
                    print(f"Error renaming {file.name}: {e}")

if __name__ == "__main__":
    print("Starting file rename process...")
    rename_files()
    print("\nDone! Check original_filenames.txt for the original names.")
