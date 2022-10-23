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

    # Union x to y
    def union(x, y):
        labels[find(x)] = find(y)

    def min_2(x,y):
        if find(x) < find(y):
            union(y, x)
        else:
            union(x, y)

    def min_3(x ,y, z):
        print(x, y, z)
        list_min = []
        list_min.extend([find(x), find(y), find(z)])
        if min(list_min) == find(x):
            print(x, y, z)
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
            uinon(y, k)
            union(z, k)

    for x in range(0, n_rows):
        for y in range(0, n_columns):
            if (binaryImg[x, y] > 0):
                #mask
                first = label[x, y-1]
                second = label[x+1, y - 1]
                three = label[x-1, y - 1]
                four = label[x-1, y]
                if ((first == 0) and (second == 0) and (three == 0) and (four == 0)):
                    largest_label = largest_label + 1
                    label[x, y] = largest_label
                #only 1 neighbor
                ##first
                elif ((first != 0) and (second == 0) and (three == 0) and (four == 0)):  # One neighbor, to the left.
                    label[x, y] = find(first)
                elif ((first == 0) and (second != 0) and (three == 0) and (four == 0)):
                    label[x, y] = find(second)
                elif ((first == 0) and (second == 0) and (three != 0) and (four == 0)):
                    label[x, y] = find(three)
                elif ((first == 0) and (second == 0) and (three == 0) and (four != 0)):
                    label[x, y] = find(four)
                #2 neighbor
                ##first
                elif ((first != 0) and (second != 0) and (three == 0) and (four == 0)):
                    min_2(first, second)
                    label[x, y] = find(first)
                elif ((first != 0) and (second == 0) and (three != 0) and (four == 0)):
                    min_2(first, three)
                    label[x, y] = find(first)
                elif ((first != 0) and (second == 0) and (three == 0) and (four != 0)):
                    min_2(first, four)
                    label[x, y] = find(first)
                ##second
                elif ((first == 0) and (second != 0) and (three != 0) and (four == 0)):
                    min_2(second, three)
                    label[x, y] = find(second)
                elif ((first == 0) and (second != 0) and (three == 0) and (four != 0)):
                    min_2(first, four)
                    label[x, y] = find(second)
                ##three
                elif ((first == 0) and (second == 0) and (three != 0) and (four != 0)):
                    min_2(three, four)
                    label[x, y] = find(three)
                #3 neighbor
                ##first
                elif ((first != 0) and (second != 0) and (three != 0) and (four == 0)):
                    min_3(first,second,three)
                    label[x,y] = find(first)
                elif ((first != 0) and (second != 0) and (three == 0) and (four != 0)):
                    min_3(first,second,four)
                    label[x,y] = find(first)
                ##second
                elif ((first == 0) and (second != 0) and (three != 0) and (four != 0)):
                    min_3(second,three,four)
                    label[x,y] = find(second)
                else:
                    min_4(first,second,three,four)
                    label[x, y] = find(first)

    # print("largest_label: ")
    # print(largest_label)
    index_arr = [0]
    index_arr[0] = find(0)
    print(index_arr[0])
    for i in range(largest_label+1):
        if find(i) not in index_arr:
            index_arr.append(labels[i])


    idxImg = np.zeros((n_rows, n_columns), dtype=int)
    for x in range(0, n_rows):
        for y in range(0, n_columns):
            if (label[x, y] > 0):
                idxImg[x, y] = index_arr.index(find(label[x, y]))

    return idxImg


###############################################
# load img
img = cv.imread("/Users/truongthinh/Downloads/shape.jpeg", 2)  # cv.IMREAD_GRAYSCALE
# print(img)
# cv2_imshow(img)
###############################################

###############################################
# filter noise
img_blur = cv.blur(img, (20, 20))
###############################################

###############################################
# crop img
img_blur_c = cv.resize(img_blur, (1022, 819))
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
################################################

label_img = hoshen_Kopelman(binary_img)

plt.imshow(label_img, cmap="gray")
plt.axis("off")
plt.show()

