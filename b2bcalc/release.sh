#!/bin/bash    
# 
# Creates a signed and zipaligned APK from your Ionic project
#
# Place your keystore in the root of your project and name it <company>.keystore
# Use this script as following :
# $ ./release.sh [company] [version]
#
# Don't forget to gitignore your key and your compiled apks.
# 
# Original at https://gist.github.com/th3m4ri0/acc2003adc7dffdbbad6
# Author : Erwan d'Orgeville<info@erwandorgeville.com>

# Abort if any command returns something else than 0
set -e

company="$1"
version="$2"
appname_dirty=${PWD##*/}
appname=${appname_dirty//[^a-zA-Z]} # Keeps only a-z letters

if [[ -z "$1" ]]; then
    echo "No company name provided, aborting..."
    exit 1
fi
if [[ -z "$2" ]]; then
    echo "No version provided, aborting..."
    exit 1
fi

echo "---> Starting build v$version"

ionic build --release android

echo ""
echo ""
echo "---> Input the password for the key"
jarsigner -sigalg SHA1withRSA -digestalg SHA1 -keystore $company.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk $company
cp platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/com.$company.$appname.v$version-unaligned.apk

echo ""
echo ""
echo "---> Zipaligning"

mkdir -p releases/

zipalign -v 4 platforms/android/build/outputs/apk/com.$company.$appname.v$version-unaligned.apk releases/com.$company.$appname.v$version.apk

echo ""
echo ""
echo "---> App released ! Look for com.$company.$appname.v$version.apk"

open releases/
