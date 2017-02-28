npm run build:prod;
cd dist/;
echo chroma.surge.sh >> CNAME;
surge .;