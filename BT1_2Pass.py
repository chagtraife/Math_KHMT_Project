import numpy as np
import glob
import matplotlib.pyplot as plt
import cv2 as cv


def hoshen_Kopelman(binaryImg):
    # Raster Scan and Labeling on the Grid
    largest_label = 0
    n_rows = len(binaryImg)
    n_columns = len(binaryImg[0])

    label = np.zeros((n_rows, n_columns), dtype=int)
    # print(n_columns*n_rows)
    # print(n_columns)
    # print(n_rows)
    labels = list(range(0, n_columns * n_rows))  # Array containing integers from 0 to the size of the image.

    # Find
    def find(x):
        y = x
        while (labels[y] != y):
            y = labels[y]
        while (labels[x] != x):
            z = labels[x]
            labels[x] = y
            x = z
        return y

    # Union
    def union(x, y):
        labels[find(x)] = find(y)

    for x in range(0, n_rows):
        for y in range(0, n_columns):
            if (binaryImg[x, y] > 0):
                left = label[x - 1, y]
                above = label[x, y - 1]
                if ((left == 0) and (above == 0)):  # Neither a label above nor to the left.
                    largest_label = largest_label + 1  # Make a new, as-yet-unused cluster label.
                    label[x, y] = largest_label
                elif ((left != 0) and (above == 0)):  # One neighbor, to the left.
                    label[x, y] = find(left)
                elif ((left == 0) and (above != 0)):  # One neighbor, above.
                    label[x, y] = find(above)
                else:  # Neighbors BOTH to the left and above.
                    union(left, above)  # Link the left and above clusters.
                    label[x, y] = find(left)

    # print("largest_label: ")
    # print(largest_label)
    index_arr = [0]
    index_arr[0] = find(0)
    print(index_arr[0])
    for i in range(largest_label + 1):
        if find(i) not in index_arr:
            index_arr.append(labels[i])

    print(index_arr)

    idxImg = np.zeros((n_rows, n_columns), dtype=int)
    for x in range(0, n_rows):
        for y in range(0, n_columns):
            if (label[x, y] > 0):
                idxImg[x, y] = index_arr.index(find(label[x, y]))

    return idxImg, index_arr


def FindPosition(label_img, index_arr):
    position = []
    index_arr.remove(0)
    n_rows = len(label_img)
    n_columns = len(label_img[0])
    for x in range(0, n_rows):
        for y in range(0, n_columns):
            if label_img[x, y] in index_arr:
                index_arr.remove(label_img[x, y])
                position.append([y+10, x+30])
    print(position)
    return position


def addTextImage(resPosition, img):
    imageText = img.copy()
    for i in range(len(resPosition)):
        text = str(i)
        # org: Where you want to put the text
        org = resPosition[i]
        print(resPosition[i])
        # write the text on the input image
        cv.putText(imageText, text, org, fontFace=cv.FONT_HERSHEY_COMPLEX, fontScale=1, color=(0, 0, 0))


    return imageText


###############################################
# load img
binary_img = cv.imread("/Users/truongthinh/Downloads/shape2.png", 2)  # cv.IMREAD_GRAYSCALE
output = binary_img.copy()

for i, v1 in enumerate(binary_img):
    for j, v2 in enumerate(v1):
        if v2 == 255:
            binary_img[i, j] = 1

################################################

label_img, index_arr = hoshen_Kopelman(binary_img)
Position = FindPosition(label_img, index_arr)
resImage = addTextImage(Position, output)

plt.imshow(resImage, cmap="gray")
plt.axis("off")
plt.show()
