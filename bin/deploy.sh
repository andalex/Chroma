##simple deploy opts for the cloud stack MLAB -> Gomix -> Surge.sh

npm run build:dev;
cd dist/;
echo chroma.surge.sh >> CNAME;
surge .;