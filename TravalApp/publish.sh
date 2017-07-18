#!/bin/bash

bundlePath="./bundle"
prebundlePath="./prebundle"


rm -rf ./prebundle
mkdir -p prebundle
cp -r -f ./bundle ./prebundle
rm -rf ./bundle
mkdir -p bundle

echo "----------------- 开始打包jsbundle ----------- "
react-native bundle --entry-file index.ios.js --bundle-output ./bundle/index.ios.jsbundle --platform ios --assets-dest ./bundle --dev false
echo "----------------- 打包jsbundle 完成 ----------- "

echo "----------------- bsdiff 开始 ----------- "
bsdiff ./prebundle/bundle/index.ios.jsbundle ./bundle/index.ios.jsbundle ./bundle/update.patch
#删除jsbundle文件
# rm -f ./bundle/index.ios.jsbundle
# rm -f ./bundle/index.ios.jsbundle.meta
echo "----------------- bsdiff 结束 ----------- "

cd ./bundle
zip -q -r assets.zip ./assets/
zip -q -r bundle.zip ./update.patch ./assets.zip

echo "----------------- 开始上传 ----------- "
cd ..
cd ..
git add .
git commit -m'react-native'
git push
echo "----------------- 上传成功 ----------- "