'''
install numpy - version: latest
install scikit-image - version: latest
instal matplotlib - version: 3.3.0
'''

import numpy as np
import glob
import matplotlib.pyplot as plt
import skimage.io
import skimage.color
import skimage.filters
import skimage.measure

def connected_components(filename, sigma=1.0, t=0.5, connectivity=2):
    # load the image
    image = skimage.io.imread(filename)
    # convert the image to grayscale
    gray_image = skimage.color.rgb2gray(image)
    # filter by Gaussian
    blurred_image = skimage.filters.gaussian(gray_image, sigma=sigma)
    # mask the image according to threshold
    binary_mask = blurred_image < t
    # perform connected component analysis
    labeled_image, count = skimage.measure.label(binary_mask, connectivity=connectivity, return_num=True)
    return labeled_image, count

labeled_image, count = connected_components(filename="shape.jpeg", sigma=2.0, t=0.9, connectivity=2)


fig, ax = plt.subplots()
plt.imshow(labeled_image, cmap="gray")
plt.axis("off")
plt.show()

