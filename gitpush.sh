#!/bin/bash

# Author: Yang Sujin(sujin22). 
# URL: https://github.com/sujin22/singpost-route.git
# Contact: aoghksj@naver.com

# push할 경로
input_data_path = 'input-data'

# git add, commit, push
git fetch
git add $input_data_path/* # input_data 하위 csv/json 파일 push
git commit -m "file is uploaded(auto)" 
git push 

#github pages 배포
npm run deploy
sleep 15
