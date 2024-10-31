from pathlib import Path
import os

# Walk through all the files in the dataset
def walk_dataset(input_folder: Path):
    for root, dirs, files in os.walk(input_folder):
        # Get the root folder we walk, relative to the input folder
        # to help create the output folder structure.
        relative_root = Path(root).relative_to(input_folder)
        files = map(lambda p: Path(relative_root, p), files)
        files = filter(lambda f: f.suffix == ".plt", files)
        for file in files:
            user = (input_folder / file).parent.parent.name
            path = file
            yield path, user

if __name__ == "__main__":
    import sys
    for f, u in walk_dataset(sys.argv[1]):
        print(f, u)