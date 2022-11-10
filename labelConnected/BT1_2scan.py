import numpy as np
import matplotlib.pyplot as plt
import cv2 as cv
import os


def hoshen_Kopelman(binaryImg):
    # Raster Scan and Labeling on the Grid
    largest_label = 0
    n_rows = len(binaryImg)
    n_columns = len(binaryImg[0])

    label = np.zeros((n_rows, n_columns), dtype=int)
    # print(n_columns*n_rows)
    # print(n_columns)
    # print(n_rows, binary_img[n_rows - 1, n_columns - 1])
    labels = list(range(0, n_columns * n_rows))  # Array containing integers from 0 to the size of the image.

    # Find
    def find(x):
        root = x
        if (root != labels[root]):
            root = labels[root]
        while (x != root):
            newx = labels[x]
            labels[x] = root
            x = newx
        return root

    # Union x to y
    def union(x, y):
        labels[find(x)] = find(y)

    def min_2(x,y):
        if find(x) < find(y):
            union(y, x)
        else:
            union(x, y)

    def min_3(x ,y, z):
        # print(x, y, z)
        list_min = []
        list_min.extend([find(x), find(y), find(z)])
        if min(list_min) == find(x):
            union(y,x)
            union(z,x)
        elif min(list_min) == find(y):
            union(x,y)
            union(z,y)
        else:
            union(x, z)
            union(y, z)

    def min_4(x, y, z, k):
        list_min = []
        list_min.extend([find(x), find(y), find(z), find(k)])
        if min(list_min) == find(x):
            union(y,x)
            union(z,x)
            union(k, x)
        elif min(list_min) == find(y):
            union(x,y)
            union(z,y)
            union(k, y)
        elif min(list_min) == find(z):
            union(x, z)
            union(y, z)
            union(k, z)
        else:
            union(x, k)
            union(y, k)
            union(z, k)

    for y in range(0, n_rows):
        for x in range(0, n_columns):
            if (binaryImg[y, x] > 0):
                #mask
                # array representation [row, column]
                first = label[y-1, x]
                second = label[y-1, x+1]
                three = label[y-1,x-1]
                four = label[y, x-1]
                if ((first == 0) and (second == 0) and (three == 0) and (four == 0)):
                    largest_label = largest_label + 1
                    label[y, x] = largest_label
                #only 1 neighbor
                ##first
                elif ((first != 0) and (second == 0) and (three == 0) and (four == 0)):  # One neighbor, to the left.
                    label[y, x] = find(first)
                elif ((first == 0) and (second != 0) and (three == 0) and (four == 0)):
                    label[y, x] = find(second)
                elif ((first == 0) and (second == 0) and (three != 0) and (four == 0)):
                    label[y, x] = find(three)
                elif ((first == 0) and (second == 0) and (three == 0) and (four != 0)):
                    label[y, x] = find(four)
                #2 neighbor
                ##first
                elif ((first != 0) and (second != 0) and (three == 0) and (four == 0)):
                    min_2(first, second)
                    label[y, x] = find(first)
                elif ((first != 0) and (second == 0) and (three != 0) and (four == 0)):
                    min_2(first, three)
                    label[y, x] = find(first)
                elif ((first != 0) and (second == 0) and (three == 0) and (four != 0)):
                    min_2(first, four)
                    label[y, x] = find(first)
                ##second
                elif ((first == 0) and (second != 0) and (three != 0) and (four == 0)):
                    min_2(second, three)
                    label[y, x] = find(second)
                elif ((first == 0) and (second != 0) and (three == 0) and (four != 0)):
                    min_2(second, four)
                    label[y, x] = find(second)
                ##three
                elif ((first == 0) and (second == 0) and (three != 0) and (four != 0)):
                    min_2(three, four)
                    label[y, x] = find(three)
                #3 neighbor
                ##first
                elif ((first != 0) and (second != 0) and (three != 0) and (four == 0)):
                    min_3(first,second,three)
                    label[y, x] = find(first)
                elif ((first != 0) and (second != 0) and (three == 0) and (four != 0)):
                    min_3(first,second,four)
                    label[y, x] = find(first)
                elif ((first != 0) and (second == 0) and (three != 0) and (four != 0)):
                    min_3(first,three,four)
                    label[y, x] = find(first)
                ##second
                elif ((first == 0) and (second != 0) and (three != 0) and (four != 0)):
                    min_3(second,three,four)
                    label[y, x] = find(second)
                else:
                    min_4(first,second,three,four)
                    label[y, x] = find(first)

    # print("largest_label: ")
    # print(largest_label)
    index_arr = [0]
    index_arr[0] = find(0)
    # print(index_arr[0])
    for i in range(largest_label+1):
        if find(i) not in index_arr:
            index_arr.append(labels[i])


    idxImg = np.zeros((n_rows, n_columns), dtype=int)
    for y in range(0, n_rows):
        for x in range(0, n_columns):
            if (label[y, x] > 0):
                idxImg[y, x] = index_arr.index(find(label[y, x]))

    return idxImg


###############################################
# load img
img = cv.imread(os.path.dirname(os.path.abspath(__file__)) + "/shape.jpeg", 2)  # cv.IMREAD_GRAYSCALE
# cv.imshow('image1bmp', img)
# print(img.shape)
# cv2_imshow(img)
###############################################

###############################################
# filter noise
img_blur = cv.blur(img, (20, 20))
# cv.imshow('img_blur', img_blur)
###############################################

###############################################
# crop img
img_blur_c = cv.resize(img_blur, (1022, 819))
# cv.imshow('img_blur_c', img_blur_c)
###############################################


###############################################
# convert rgb img to binary img 0 1"
binary_img = cv.inRange(img_blur_c, 0, 220)
# cv.imshow("binary_img", binary_img)
# cv.waitKey(0)
# cv.destroyAllWindows()
for i, v1 in enumerate(binary_img):
    for j, v2 in enumerate(v1):
        if v2 == 255:
            binary_img[i, j] = 1
# print(binary_img)
# np.savetxt(os.path.dirname(os.path.abspath(__file__)) + "/array.txt", binary_img, fmt='%d')
################################################

label_img = hoshen_Kopelman(binary_img)

plt.imshow(label_img, cmap="gray")
plt.axis("off")
plt.show()
