import numpy as np


ex_arr=np.zeros((10, 10))

ex_arr[5][3]=1
ex_arr[5][4]=1
ex_arr[5][5]=1
ex_arr[5][6]=1
ex_arr[5][7]=1

front_x=5 #행렬의 행(가로)
front_y=5#행렬의 열(세로)
len_max=5
left_arr=[0,0]
right_arr=[0,0]


#left_arr,right_arr(왼/오 양방향으로 손 검출이 끝나는 부분을 구하는 코드)

for i in range(0,front_y):
    print(front_y-i)
    print(ex_arr[front_x][front_y-i])
    if ex_arr[front_x][front_y-i]==0:
        left_arr[0]=front_x
        left_arr[1]=front_y-i+1
        break

for j in range(front_y,10):
    print(j)
    print(ex_arr[front_x][j])
    if ex_arr[front_x][j]==0:
        right_arr[0]=front_x
        right_arr[1]=j-1
        break

print("new 손가락 양 끝값")
print(left_arr)
print(right_arr)
print("손가락 길이 측정 결과")
print(right_arr[1]-left_arr[1]+1)
