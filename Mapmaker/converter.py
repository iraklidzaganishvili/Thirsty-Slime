from PIL import Image
import numpy as np
import os

width = 80
height = 40

script_dir = os.path.dirname(os.path.realpath(__file__))
image_path = os.path.join(script_dir, 'lvl2.png')
out_path = os.path.join(script_dir, 'lvl2.txt')
img = Image.open(image_path).convert('L')  # Convert image to grayscale
array = np.array(img).astype(np.int32) # Convert image data to a numpy array

print (array.flatten()) 
array = array.flatten()
for i in range (width*height):
    if array[i] == 255:
        array[i] = 0
    elif array[i] == 0:
        array[i] = 1
    elif array[i] == 76:
        array[i] = -1
    elif array[i] == 29:
        array[i] = -2
np.savetxt(out_path, array[None], fmt='%d', delimiter=',')
print('Array saved to array.txt')
